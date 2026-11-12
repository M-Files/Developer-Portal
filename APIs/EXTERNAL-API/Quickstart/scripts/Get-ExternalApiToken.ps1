<#
.SYNOPSIS
    Gets an access token for the M-Files External Storage API with a client application's
    client ID and secret (OAuth 2.0 client credentials). Nobody signs in.

.DESCRIPTION
    The client ID and secret are taken from, in this order:
      1. -ClientId and -ClientSecret
      2. Environment variables MFILES_CLIENT_ID and MFILES_CLIENT_SECRET
      3. The file saved by New-ExternalApiClient.ps1

    The script returns an object with the token and when it expires, and prints a short summary.
    It prints the token itself only with -Raw.

    Tokens are valid for about one hour. There is no refresh token: when a token is about to
    expire, run this again (Invoke-ExternalApiDemo.ps1 shows how a program does that).

.EXAMPLE
    .\Get-ExternalApiToken.ps1

.EXAMPLE
    $token = (.\Get-ExternalApiToken.ps1 -Quiet).AccessToken

.EXAMPLE
    $env:MFILES_CLIENT_ID = 'subapp,<guid>'; $env:MFILES_CLIENT_SECRET = '<secret>'
    .\Get-ExternalApiToken.ps1

.NOTES
    Provided as a sample, as-is, without warranty. Works on Windows, macOS and Linux (PowerShell 7).
#>
[CmdletBinding()]
param(
    [string] $ClientId,
    [securestring] $ClientSecret,
    [string] $CredentialFile = $(if ($env:LOCALAPPDATA) { Join-Path $env:LOCALAPPDATA 'M-Files\ExternalApi\client.xml' }),
    [string] $Authority = 'https://login.m-files.com',
    [string] $Scope = 'mfmasterstorage',
    # Keep retrying "invalid_client" for this long. Useful right after creating a client.
    [int]    $RetrySeconds = 0,
    # Print nothing; only return the object.
    [switch] $Quiet,
    # Return only the access token string.
    [switch] $Raw
)
$ErrorActionPreference = 'Stop'

if ($PSVersionTable.PSVersion.Major -lt 7) {
    $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
    if (-not $pwsh) { throw 'PowerShell 7 is required: https://aka.ms/powershell' }
    if ($ClientSecret) { throw 'Run this in PowerShell 7 (pwsh) when passing -ClientSecret.' }
    $fwd = @(); foreach ($kv in $PSBoundParameters.GetEnumerator()) {
        if ($kv.Value -is [System.Management.Automation.SwitchParameter]) { if ($kv.Value.IsPresent) { $fwd += "-$($kv.Key)" } }
        else { $fwd += "-$($kv.Key)"; $fwd += "$($kv.Value)" } }
    & $pwsh.Source -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath @fwd
    exit $LASTEXITCODE
}

# --- Client ID and secret ---------------------------------------------------------------------
$secret = $null
if ($ClientId -and $ClientSecret) {
    $secret = [Net.NetworkCredential]::new('', $ClientSecret).Password
}
elseif ($env:MFILES_CLIENT_ID -and $env:MFILES_CLIENT_SECRET) {
    $ClientId = $env:MFILES_CLIENT_ID; $secret = $env:MFILES_CLIENT_SECRET
}
elseif ($CredentialFile -and (Test-Path $CredentialFile)) {
    $saved = Import-Clixml $CredentialFile
    $ClientId = $saved.ClientId
    $secret = [Net.NetworkCredential]::new('', $saved.Secret).Password
}
else {
    throw 'No client ID and secret. Run New-ExternalApiClient.ps1, or set MFILES_CLIENT_ID and MFILES_CLIENT_SECRET.'
}
if ($ClientId -notmatch '^subapp,') { $ClientId = "subapp,$ClientId" }

# --- Token request ----------------------------------------------------------------------------
$tokenEndpoint = (Invoke-RestMethod "$($Authority.TrimEnd('/'))/.well-known/openid-configuration").token_endpoint
$form = @{ grant_type = 'client_credentials'; client_id = $ClientId; client_secret = $secret; scope = $Scope }
$giveUpAt = (Get-Date).AddSeconds($RetrySeconds)
try {
    while ($true) {
        try {
            $resp = Invoke-RestMethod -Method Post -Uri $tokenEndpoint -Body $form -ContentType 'application/x-www-form-urlencoded'
            break
        }
        catch {
            $err = $null; try { $err = ($_.ErrorDetails.Message | ConvertFrom-Json).error } catch {}
            if ($err -eq 'invalid_client' -and (Get-Date) -lt $giveUpAt) {
                if (-not $Quiet) { Write-Host '> Client not ready yet, retrying in 15 s ...' -ForegroundColor Yellow }
                Start-Sleep -Seconds 15; continue
            }
            $hint = switch ($err) {
                'invalid_client' { 'Wrong client ID or secret, the client was removed, or its secret has expired. A brand-new client can take up to a minute to start working.' }
                'invalid_scope'  { "The client is not allowed the scope '$Scope'." }
                default          { $_.Exception.Message }
            }
            throw "Token request failed ($err). $hint"
        }
    }
}
finally { $form.client_secret = $null; $secret = $null }

# --- Read the token's claims (no signature check; the API does that) --------------------------
function ConvertFrom-Base64Url([string]$s) {
    $s = $s.Replace('-', '+').Replace('_', '/'); switch ($s.Length % 4) { 2 { $s += '==' } 3 { $s += '=' } }
    [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($s))
}
$claims = ConvertFrom-Base64Url ($resp.access_token.Split('.')[1]) | ConvertFrom-Json
$rights = if ($claims.accessrights -is [string]) { $claims.accessrights | ConvertFrom-Json } else { $claims.accessrights }

$fullAccess = [int64]274808663551     # vault access bits required by the External Storage API
$vaults = [ordered]@{}
foreach ($p in @($rights.vault2.PSObject.Properties)) { $vaults[$p.Name] = [int64]$p.Value }

$result = [pscustomobject]@{
    AccessToken      = $resp.access_token
    ExpiresAtUtc     = [DateTimeOffset]::FromUnixTimeSeconds([int64]$claims.exp).UtcDateTime
    ClientId         = $claims.client_id
    VaultAccess      = $vaults
    FullAccessVaults = @($vaults.Keys | Where-Object { ($vaults[$_] -band $fullAccess) -eq $fullAccess })
}
# Show everything except the token itself when the object is printed.
$display = [Management.Automation.PSPropertySet]::new('DefaultDisplayPropertySet', [string[]]@('ClientId', 'ExpiresAtUtc', 'FullAccessVaults'))
$result | Add-Member MemberSet PSStandardMembers ([Management.Automation.PSMemberInfo[]]@($display))

if ($Raw) { return $result.AccessToken }
if (-not $Quiet) {
    Write-Host "> Token for $($result.ClientId), valid until $($result.ExpiresAtUtc.ToLocalTime())" -ForegroundColor Green
    if ($vaults.Count -eq 0) {
        Write-Host '> Warning: the token gives access to no vaults. Check the client''s vault roles (they must include log in).' -ForegroundColor Yellow
    }
    foreach ($v in $vaults.Keys) {
        $ok = $result.FullAccessVaults -contains $v
        Write-Host ("  Vault {0}: {1}" -f $v, $(if ($ok) { 'full access (External Storage API allowed)' } else { 'limited access (External Storage API will refuse)' })) `
            -ForegroundColor $(if ($ok) { 'Green' } else { 'Yellow' })
    }
}
$result
