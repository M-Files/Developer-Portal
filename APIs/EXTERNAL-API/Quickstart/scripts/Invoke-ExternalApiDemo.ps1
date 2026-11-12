<#
.SYNOPSIS
    Read-only demo of the M-Files External Storage API using a client application's token.
    Nothing is created, changed or deleted in the vault.

.DESCRIPTION
    Default run:
      1. Gets a token (Get-ExternalApiToken.ps1).
      2. Lists the first objects of one object type.
      3. Reads the first object.
      4. With -DownloadTo, downloads that object's first file.

    With -Watch it keeps running and shows what a long-running program must do:
      * renew the token before it expires (no refresh tokens; just ask for a new one),
      * on 401, get a new token once; if it is still refused, stop (configuration problem),
      * on 429 or 503, wait (honouring Retry-After) and try again.

.PARAMETER StorageUrl
    External Storage API address of the vault, for example
    https://<vault-name>.cloudvault.api.m-files.com/storage

.PARAMETER VaultUrl
    Instead of -StorageUrl: the vault's normal address, for example
    https://<vault-name>.cloudvault.m-files.com. The script works out the API address from it.

.EXAMPLE
    .\Invoke-ExternalApiDemo.ps1 -VaultUrl https://contoso.cloudvault.m-files.com

.EXAMPLE
    .\Invoke-ExternalApiDemo.ps1 -VaultUrl https://contoso.cloudvault.m-files.com -DownloadTo .\downloads

.EXAMPLE
    .\Invoke-ExternalApiDemo.ps1 -VaultUrl https://contoso.cloudvault.m-files.com -Watch -IntervalSeconds 300

.NOTES
    Provided as a sample, as-is, without warranty.
#>
[CmdletBinding(DefaultParameterSetName = 'VaultUrl')]
param(
    [Parameter(Mandatory, ParameterSetName = 'StorageUrl')]
    [string] $StorageUrl,

    [Parameter(Mandatory, ParameterSetName = 'VaultUrl')]
    [string] $VaultUrl,

    # Defaults to the first vault the token gives full access to.
    [string] $VaultGuid,

    # Object type ID. 0 = Document.
    [int] $TypeId = 0,

    # How many objects to list.
    [ValidateRange(1, 500)]
    [int] $Limit = 5,

    # Folder to download the first object's first file into.
    [string] $DownloadTo,

    [switch] $Watch,
    [int] $IntervalSeconds = 60,

    [string] $CredentialFile
)
$ErrorActionPreference = 'Stop'

if ($PSVersionTable.PSVersion.Major -lt 7) {
    $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
    if (-not $pwsh) { throw 'PowerShell 7 is required: https://aka.ms/powershell' }
    $fwd = @(); foreach ($kv in $PSBoundParameters.GetEnumerator()) {
        if ($kv.Value -is [System.Management.Automation.SwitchParameter]) { if ($kv.Value.IsPresent) { $fwd += "-$($kv.Key)" } }
        else { $fwd += "-$($kv.Key)"; $fwd += "$($kv.Value)" } }
    & $pwsh.Source -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath @fwd
    exit $LASTEXITCODE
}

function Say([string]$Message, [string]$Color = 'Cyan') { Write-Host "> $Message" -ForegroundColor $Color }

# --- API address -------------------------------------------------------------------------------
if ($VaultUrl) {
    $h = ([Uri]$VaultUrl).Host
    if ($h -notmatch '^(?<name>[^.]+)\.cloudvault\.m-files\.com$') { throw "Use -StorageUrl for this vault address: $VaultUrl" }
    $StorageUrl = "https://$($Matches.name).cloudvault.api.m-files.com/storage"
}
$StorageUrl = $StorageUrl.TrimEnd('/')

# --- Token handling: get one, renew it 5 minutes before it expires ----------------------------
$tokenScript = Join-Path $PSScriptRoot 'Get-ExternalApiToken.ps1'
$script:token = $null
function Get-Token([switch]$Force) {
    if ($Force -or -not $script:token -or $script:token.ExpiresAtUtc -lt (Get-Date).ToUniversalTime().AddMinutes(5)) {
        $tokenArgs = @{ Quiet = $true; RetrySeconds = 60 }
        if ($CredentialFile) { $tokenArgs.CredentialFile = $CredentialFile }
        $script:token = & $tokenScript @tokenArgs
        Say "New token, valid until $($script:token.ExpiresAtUtc.ToLocalTime())" DarkGray
    }
    $script:token.AccessToken
}

# --- One API call with the retry rules a long-running program needs ---------------------------
function Invoke-Api([string]$Path, [string]$OutFile) {
    $url = "$StorageUrl/external/v1/vaults/$VaultGuid/$Path"
    $renewed = $false
    for ($attempt = 1; $attempt -le 6; $attempt++) {
        $req = @{ Uri = $url; Headers = @{ Authorization = "Bearer $(Get-Token)" }; SkipHttpErrorCheck = $true; TimeoutSec = 300 }
        if ($OutFile) { $req.OutFile = $OutFile; $req.PassThru = $true }
        $r = Invoke-WebRequest @req
        $code = [int]$r.StatusCode

        if ($code -lt 300) { return $r }
        if ($code -eq 401 -and -not $renewed) {
            Say 'HTTP 401: getting a new token and trying once more.' Yellow
            $null = Get-Token -Force; $renewed = $true; continue
        }
        if ($code -eq 401) {
            throw 'HTTP 401 with a fresh token: this is a configuration problem, not an expired token. Check that the client has full access (roles 1027) to this vault and that the vault GUID and address match.'
        }
        if ($code -in 429, 502, 503, 504) {
            $wait = 5 * [Math]::Pow(2, $attempt - 1)
            $ra = $r.Headers['Retry-After']; if ($ra) { $wait = [int]("$ra" -replace '\D', '') }
            Say "HTTP $code (server busy). Waiting $wait s before retrying." Yellow
            Start-Sleep -Seconds $wait; continue
        }
        throw "HTTP $code from $url`n$($r.Content | Select-Object -First 1)"
    }
    throw "Gave up after several retries: $url"
}

# Field names in object JSON: pick the first title / GUID found anywhere in one object.
function Get-Field($obj, [string]$pattern) {
    $txt = $obj | ConvertTo-Json -Depth 40 -Compress
    [regex]::Match($txt, $pattern).Groups[1].Value
}

# --- Start -------------------------------------------------------------------------------------
$null = Get-Token
if (-not $VaultGuid) {
    $VaultGuid = $script:token.FullAccessVaults | Select-Object -First 1
    if (-not $VaultGuid) { throw 'The token gives full access to no vault. Check the client application''s vault roles.' }
}
Say "API: $StorageUrl   Vault: $VaultGuid   Object type: $TypeId"

if ($Watch) {
    Say "Watching every $IntervalSeconds s. Press Ctrl+C to stop." Yellow
    while ($true) {
        $sw = [Diagnostics.Stopwatch]::StartNew()
        $r = Invoke-Api "objects/$($TypeId)?limit=1"
        Say ("{0:HH:mm:ss}  HTTP {1}  {2} ms  token valid until {3:HH:mm}" -f (Get-Date), [int]$r.StatusCode, $sw.ElapsedMilliseconds, $script:token.ExpiresAtUtc.ToLocalTime()) Green
        Start-Sleep -Seconds $IntervalSeconds
    }
}

# 1. List
$sw = [Diagnostics.Stopwatch]::StartNew()
$list = (Invoke-Api "objects/$($TypeId)?limit=$Limit").Content | ConvertFrom-Json -Depth 60
$objects = @($list.objects)
Say "Listed $($objects.Count) object(s) in $($sw.ElapsedMilliseconds) ms$(if ($list.continuationToken) { '; more pages are available (use the ct parameter)' })." Green
$rows = foreach ($o in $objects) {
    [pscustomobject]@{
        Title      = Get-Field $o '"title"\s*:\s*"([^"]*)"'
        ObjectGuid = (Get-Field $o '"objectGuid"\s*:\s*"\{?([0-9A-Fa-f-]{36})')
        Files      = @($o.object.version.files).Count
    }
}
$rows | Format-Table -AutoSize | Out-String | Write-Host
if (-not $objects) { Say 'No objects of this type. Try another -TypeId.' Yellow; return }

# 2. Read one object
$first = $rows[0]
if ($first.ObjectGuid) {
    $one = (Invoke-Api "objects/$TypeId/$($first.ObjectGuid)").Content | ConvertFrom-Json -Depth 60
    Say "Read object '$($first.Title)' ($($first.ObjectGuid))." Green
}

# 3. Download its first file
if ($DownloadTo) {
    $withFile = $objects | Where-Object { @($_.object.version.files).Count -gt 0 } | Select-Object -First 1
    if (-not $withFile) { Say 'None of the listed objects has files.' Yellow; return }
    $objGuid = Get-Field $withFile '"objectGuid"\s*:\s*"\{?([0-9A-Fa-f-]{36})'
    $file = @($withFile.object.version.files)[0]
    $fileGuid = "$($file.fileGuid)".Trim('{', '}')
    $fileName = ("$($file.title).$($file.extension)" -replace '[\\/:*?"<>|]', '_')
    if (-not (Test-Path $DownloadTo)) { New-Item -ItemType Directory -Force $DownloadTo | Out-Null }
    $target = Join-Path (Resolve-Path $DownloadTo) $fileName
    $null = Invoke-Api "objects/$TypeId/$objGuid/files/$fileGuid/content" -OutFile $target
    Say "Downloaded $fileName ($((Get-Item $target).Length) bytes) to $target" Green
}
