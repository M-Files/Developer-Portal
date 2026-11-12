<#
.SYNOPSIS
    Creates, rotates or removes a client application for the M-Files External Storage API.

.DESCRIPTION
    A client application is a login for a program, not for a person. It has a client ID and a
    secret, and access only to the vaults you choose. Your program uses it to get access tokens
    without anyone signing in.

    You only sign in to M-Files Manage. The script:
      1. Opens a separate Microsoft Edge window with a temporary, empty profile.
      2. Waits until you have signed in to M-Files Manage in that window.
      3. Reads your Manage sign-in from that window's requests to the M-Files subscription API,
         then closes the window and deletes the temporary profile.
      4. Creates the client application (or rotates its secret, or removes it).
      5. Saves the client ID and secret to a file encrypted for your Windows user account.

    Your Manage sign-in is used only for this one operation and is not saved.

    Requirements: Windows, Microsoft Edge, PowerShell 7, and the subscription administrator role
    (permission to manage access rights) in the subscription.

.PARAMETER SubscriptionId
    Your subscription ID. It is the part after manage.m-files.com/ in the Manage address bar,
    for example 123-45678901 in https://manage.m-files.com/123-45678901/home.

.PARAMETER VaultGuid
    GUID of the vault (or vaults) the client may access.

.PARAMETER RotateSecret
    Gives the saved client application a new secret. The old secret stops working immediately.

.PARAMETER Remove
    Deletes the saved client application and its saved credentials.

.EXAMPLE
    .\New-ExternalApiClient.ps1 -SubscriptionId 123-45678901 -VaultGuid 2f0b7c4e-0000-0000-0000-000000000000

.EXAMPLE
    .\New-ExternalApiClient.ps1 -SubscriptionId 123-45678901 -RotateSecret

.EXAMPLE
    .\New-ExternalApiClient.ps1 -SubscriptionId 123-45678901 -Remove

.NOTES
    TEMPORARY SOLUTION: this way of creating client applications is temporary until a full
    solution is available. Getting tokens and calling the API will not change.
    Provided as a sample, as-is, without warranty.
#>
[CmdletBinding(DefaultParameterSetName = 'Create')]
param(
    [Parameter(Mandatory)]
    [string] $SubscriptionId,

    [Parameter(Mandatory, ParameterSetName = 'Create')]
    [string[]] $VaultGuid,

    [Parameter(ParameterSetName = 'Create')]
    [string] $Name = 'External API client',

    # Days until the secret expires. Rotate the secret before that.
    [Parameter(ParameterSetName = 'Create')]
    [ValidateRange(1, 3650)]
    [int] $ValidityDays = 90,

    # 1027 = full control + log in + internal user. The External Storage API requires full vault access.
    [Parameter(ParameterSetName = 'Create')]
    [int] $VaultRoles = 1027,

    [Parameter(Mandatory, ParameterSetName = 'Rotate')]
    [switch] $RotateSecret,

    [Parameter(Mandatory, ParameterSetName = 'Remove')]
    [switch] $Remove,

    # Checks that the Edge window can be opened and watched. Signs in to nothing, creates nothing.
    [Parameter(Mandatory, ParameterSetName = 'Check')]
    [switch] $CheckBrowser,

    # Where the encrypted client ID and secret are saved.
    [string] $CredentialFile = (Join-Path $env:LOCALAPPDATA 'M-Files\ExternalApi\client.xml'),

    # Overwrite an existing credential file when creating.
    [switch] $Force,

    # Also print the secret (for copying to a secret store such as Azure Key Vault).
    [switch] $ShowSecret,

    [int]    $SignInTimeoutMinutes = 5,
    [string] $ManageUrl = 'https://manage.m-files.com',
    [string] $SubscriptionApiUrl = 'https://subscriptions.api.m-files.com/api/public',
    [string] $EdgePath
)
$ErrorActionPreference = 'Stop'

# Needs PowerShell 7. If started from Windows PowerShell 5.1, run again in PowerShell 7.
if ($PSVersionTable.PSVersion.Major -lt 7) {
    $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
    if (-not $pwsh) { throw 'PowerShell 7 is required: https://aka.ms/powershell' }
    $fwd = @()
    foreach ($kv in $PSBoundParameters.GetEnumerator()) {
        if ($kv.Value -is [System.Management.Automation.SwitchParameter]) { if ($kv.Value.IsPresent) { $fwd += "-$($kv.Key)" } }
        elseif ($kv.Value -is [array]) { $fwd += "-$($kv.Key)"; $fwd += ($kv.Value -join ',') }
        else { $fwd += "-$($kv.Key)"; $fwd += "$($kv.Value)" }
    }
    & $pwsh.Source -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath @fwd
    exit $LASTEXITCODE
}
if (-not $IsWindows) { throw 'This script needs Windows and Microsoft Edge.' }

function Say([string]$Message, [string]$Color = 'Cyan') { Write-Host "> $Message" -ForegroundColor $Color }

# Accept "a,b" as well as a real array, and check that each value is a GUID.
if ($VaultGuid) {
    $VaultGuid = @($VaultGuid -split ',' | ForEach-Object { $_.Trim().Trim('{', '}') } | Where-Object { $_ })
    $parsed = [guid]::Empty
    foreach ($v in $VaultGuid) { if (-not [guid]::TryParse($v, [ref]$parsed)) { throw "Not a vault GUID: $v" } }
}

# ---------------------------------------------------------------------------------------------
# Sign-in capture. Starts Edge with a temporary profile and the DevTools protocol on a local port,
# then waits for a request to $ApiHost that carries a bearer token.
# ---------------------------------------------------------------------------------------------
function Get-ManageSignIn {
    param([string]$StartUrl, [string]$ApiHost, [bool]$RequireBearer, [int]$TimeoutMinutes)

    $edge = $EdgePath
    if (-not $edge) {
        $edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
                  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
                Where-Object { Test-Path $_ } | Select-Object -First 1
    }
    if (-not $edge) { throw 'Microsoft Edge was not found. Use -EdgePath.' }

    $profileDir = Join-Path ([IO.Path]::GetTempPath()) ('mfiles-signin-' + [guid]::NewGuid().ToString('N'))
    $listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, 0); $listener.Start()
    $port = $listener.LocalEndpoint.Port; $listener.Stop()

    $proc = Start-Process -FilePath $edge -PassThru -ArgumentList @(
        "--remote-debugging-port=$port", "--user-data-dir=`"$profileDir`"",
        '--no-first-run', '--no-default-browser-check', '--new-window', $StartUrl)

    $ws = $null
    try {
        $ver = $null
        for ($i = 0; $i -lt 60 -and -not $ver; $i++) {
            try { $ver = Invoke-RestMethod "http://127.0.0.1:$port/json/version" -TimeoutSec 2 } catch { Start-Sleep -Milliseconds 500 }
        }
        if (-not $ver) { throw 'Could not connect to the Edge window. Your organization may block Edge remote debugging (policy RemoteDebuggingAllowed).' }

        $ws = [Net.WebSockets.ClientWebSocket]::new()
        $ws.ConnectAsync([Uri]$ver.webSocketDebuggerUrl, [Threading.CancellationToken]::None).Wait()

        $state = @{ Id = 0; Pending = $null }
        $buf = [byte[]]::new(1MB); $ms = [IO.MemoryStream]::new()
        $send = {
            param($method, $params, $sessionId)
            $o = [ordered]@{ id = ++$state.Id; method = $method; params = $(if ($params) { $params } else { @{} }) }
            if ($sessionId) { $o.sessionId = $sessionId }
            $bytes = [Text.Encoding]::UTF8.GetBytes(($o | ConvertTo-Json -Depth 10 -Compress))
            $ws.SendAsync([ArraySegment[byte]]::new($bytes), 'Text', $true, [Threading.CancellationToken]::None).Wait()
        }
        $receive = {
            param([int]$timeoutMs)
            while ($true) {
                if (-not $state.Pending) { $state.Pending = $ws.ReceiveAsync([ArraySegment[byte]]::new($buf), [Threading.CancellationToken]::None) }
                if (-not $state.Pending.Wait($timeoutMs)) { return $null }
                $r = $state.Pending.Result; $state.Pending = $null
                if ($r.MessageType -eq 'Close') { throw 'The Edge window was closed before sign-in finished.' }
                $ms.Write($buf, 0, $r.Count)
                if ($r.EndOfMessage) { $s = [Text.Encoding]::UTF8.GetString($ms.ToArray()); $ms.SetLength(0); return $s }
            }
        }

        & $send 'Target.setDiscoverTargets' @{ discover = $true } $null
        $attached = @{}; $urls = @{}; $hdrs = @{}
        $deadline = (Get-Date).AddMinutes($TimeoutMinutes)

        while ((Get-Date) -lt $deadline) {
            $raw = & $receive 1000
            if (-not $raw) { continue }
            if ($raw -notmatch '"method":"(Target\.targetCreated|Target\.targetInfoChanged|Target\.attachedToTarget|Network\.requestWillBeSent(ExtraInfo)?)"') { continue }
            $m = $raw | ConvertFrom-Json -Depth 30

            switch ($m.method) {
                { $_ -in 'Target.targetCreated', 'Target.targetInfoChanged' } {
                    $t = $m.params.targetInfo
                    if ($t.type -eq 'page' -and -not $attached.ContainsKey($t.targetId)) {
                        $attached[$t.targetId] = $true
                        & $send 'Target.attachToTarget' @{ targetId = $t.targetId; flatten = $true } $null
                    }
                }
                'Target.attachedToTarget' { & $send 'Network.enable' @{} $m.params.sessionId }
                { $_ -like 'Network.requestWillBeSent*' } {
                    $rid = $m.params.requestId
                    if ($m.params.request.url) { $urls[$rid] = $m.params.request.url }
                    $h = if ($m.params.request) { $m.params.request.headers } else { $m.params.headers }
                    if (-not $hdrs[$rid]) { $hdrs[$rid] = @{} }
                    foreach ($p in @($h.PSObject.Properties)) { $hdrs[$rid][$p.Name.ToLowerInvariant()] = [string]$p.Value }

                    $url = $urls[$rid]
                    if ($url -and ([Uri]$url).Host -eq $ApiHost) {
                        if (-not $RequireBearer -or $hdrs[$rid]['authorization'] -like 'Bearer *') {
                            $result = @{}
                            foreach ($k in 'authorization', 'x-functions-key', 'ocp-apim-subscription-key') {
                                if ($hdrs[$rid][$k]) { $result[$k] = $hdrs[$rid][$k] }
                            }
                            try { & $send 'Browser.close' @{} $null } catch {}
                            return $result
                        }
                    }
                }
            }
        }
        throw "No sign-in was seen within $TimeoutMinutes minutes. If you are signed in, refresh the Manage page and run the script again."
    }
    finally {
        if ($ws) { try { $ws.Dispose() } catch {} }
        Start-Sleep -Seconds 1
        if ($proc -and -not $proc.HasExited) { try { $proc.Kill($true) } catch {} }
        for ($i = 0; $i -lt 20; $i++) {
            $left = Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object CommandLine -like "*$profileDir*"
            if (-not $left) { break }
            $left | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
            Start-Sleep -Milliseconds 500
        }
        for ($i = 0; $i -lt 20 -and (Test-Path $profileDir); $i++) {
            Remove-Item $profileDir -Recurse -Force -ErrorAction SilentlyContinue
            if (Test-Path $profileDir) { Start-Sleep -Milliseconds 500 }
        }
    }
}

function Invoke-SubscriptionApi {
    param([string]$Method, [string]$Path, $Body, [hashtable]$Headers)
    $req = @{ Method = $Method; Uri = "$($SubscriptionApiUrl.TrimEnd('/'))/subscriptions/$SubscriptionId/$Path"; Headers = $Headers }
    if ($null -ne $Body) { $req.Body = ($Body | ConvertTo-Json -Depth 5); $req.ContentType = 'application/json' }
    try { Invoke-RestMethod @req }
    catch {
        $code = $_.Exception.Response.StatusCode.value__
        $why = switch ($code) {
            400 { 'the request was rejected (check vault GUIDs and roles)' }
            401 { 'your sign-in expired; run the script again' }
            403 { 'you lack the subscription administrator role, or the client was not created through this API' }
            404 { 'not found (wrong subscription ID, vault GUID or client)' }
            default { 'unexpected error' }
        }
        throw "M-Files Manage API: HTTP $code, $why. $($_.ErrorDetails.Message)"
    }
}

function Save-Client($ClientId, $Secret, $Expiration, $Vaults) {
    $dir = Split-Path $CredentialFile -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
    [pscustomobject]@{
        ClientId       = $ClientId                                                   # subapp,<guid>
        Secret         = (ConvertTo-SecureString $Secret -AsPlainText -Force)        # encrypted for your Windows user
        SubscriptionId = $SubscriptionId
        VaultGuids     = @($Vaults)
        ExpirationUtc  = $Expiration
        SavedUtc       = (Get-Date).ToUniversalTime().ToString('s')
    } | Export-Clixml -Path $CredentialFile
}

# ---------------------------------------------------------------------------------------------
if ($CheckBrowser) {
    Say 'Opening Edge to check that the script can watch it. You do not need to sign in.'
    $null = Get-ManageSignIn -StartUrl $ManageUrl -ApiHost ([Uri]$ManageUrl).Host -RequireBearer $false -TimeoutMinutes 1
    Say 'OK: Edge can be opened, watched and closed.' Green
    return
}

$saved = if (Test-Path $CredentialFile) { Import-Clixml $CredentialFile } else { $null }
if ($PSCmdlet.ParameterSetName -eq 'Create' -and $saved -and -not $Force) {
    throw "A client is already saved in $CredentialFile ($($saved.ClientId)). Use -RotateSecret, -Remove, or -Force to create another one."
}
if ($PSCmdlet.ParameterSetName -in 'Rotate', 'Remove' -and -not $saved) {
    throw "No saved client in $CredentialFile."
}

Say 'An Edge window opens. Sign in to M-Files Manage there; the rest happens by itself.' Yellow
$headers = Get-ManageSignIn -StartUrl "$ManageUrl/$SubscriptionId/home" -ApiHost ([Uri]$SubscriptionApiUrl).Host `
    -RequireBearer $true -TimeoutMinutes $SignInTimeoutMinutes
Say 'Signed in. The Edge window is closed.' Green

try {
    switch ($PSCmdlet.ParameterSetName) {
        'Create' {
            $body = @{
                name                 = $Name
                validityPeriodDays   = $ValidityDays
                subscriptionRoleBits = 0     # no subscription administration rights
                vaultAccesses        = @($VaultGuid | ForEach-Object { @{ vaultGuid = "$_"; vaultRoles = $VaultRoles } })
            }
            Say "Creating client application '$Name' ..."
            $app = Invoke-SubscriptionApi -Method Post -Path 'clientapp' -Body $body -Headers $headers
            $appId = @($app.id, $app.clientId, $app.appGuid) | Where-Object { $_ } | Select-Object -First 1
            Save-Client "subapp,$appId" $app.secret $app.expirationUtc ($VaultGuid | ForEach-Object { "$_" })
            Say 'Client application created.' Green
        }
        'Rotate' {
            $appId = ($saved.ClientId -split ',')[-1]
            Say "Giving $($saved.ClientId) a new secret. The old secret stops working now."
            $app = Invoke-SubscriptionApi -Method Patch -Path "clientapp/$appId" -Body @{ resetSecret = $true } -Headers $headers
            Save-Client $saved.ClientId $app.secret $app.expirationUtc $saved.VaultGuids
            Say 'New secret saved. Update every program that uses this client.' Green
        }
        'Remove' {
            $appId = ($saved.ClientId -split ',')[-1]
            Say "Removing $($saved.ClientId) ..."
            $null = Invoke-SubscriptionApi -Method Delete -Path "clientapp/$appId" -Headers $headers
            Remove-Item $CredentialFile
            Say 'Client application removed. Tokens already issued stay valid until they expire (at most 1 hour).' Green
            return
        }
    }
}
finally { $headers = $null }

$saved = Import-Clixml $CredentialFile
Write-Host ''
Write-Host "Client ID       : $($saved.ClientId)"
Write-Host "Vaults          : $($saved.VaultGuids -join ', ')"
Write-Host "Secret expires  : $($saved.ExpirationUtc) UTC"
Write-Host "Saved to        : $CredentialFile (readable only by your Windows user)"
if ($ShowSecret) {
    Write-Host "Secret          : $([Net.NetworkCredential]::new('', $saved.Secret).Password)" -ForegroundColor Yellow
    Write-Host 'Store the secret in a secret store. Do not put it in source code.' -ForegroundColor Yellow
}
Write-Host ''
Say 'Next: .\Get-ExternalApiToken.ps1   (a new client can take up to a minute before its first token works)'
