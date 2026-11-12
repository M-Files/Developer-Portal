---
layout: page
title: Quickstart — External Storage API
includeInSearch: true
breadcrumb: Quickstart
---

This quickstart takes you from nothing to reading objects from your vault through the External Storage API, in about five minutes. You sign in once; after that your program works on its own with a client application.

These scripts are samples, provided as-is without warranty. They only **read** from the vault: nothing is created, changed or deleted.
{:.note.warning}

## Before you start

* You are a **subscription administrator** in M-Files Manage.
* You know your **subscription ID**: the part after `manage.m-files.com/` in the Manage address bar, for example `123-45678901`.
* You know the **vault address** (`https://<vault-name>.cloudvault.m-files.com`) and **vault GUID**.
* You have **Windows**, **Microsoft Edge** and **[PowerShell 7](https://aka.ms/powershell)**.

## Download the scripts

Save these three files in the same folder:

| Script | Does |
|---|---|
| [`New-ExternalApiClient.ps1`]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/scripts/New-ExternalApiClient.ps1) | Creates the client application (you sign in once) |
| [`Get-ExternalApiToken.ps1`]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/scripts/Get-ExternalApiToken.ps1) | Gets an access token with the client ID and secret |
| [`Invoke-ExternalApiDemo.ps1`]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/scripts/Invoke-ExternalApiDemo.ps1) | Lists and reads objects, downloads a file, or keeps running |

Windows may block downloaded scripts. If PowerShell refuses to run them, right-click each file, select **Properties**, and tick **Unblock**, or run `Unblock-File .\*.ps1` in the folder.
{:.note}

## Step 1: Create a client application

**Temporary solution.** Creating a client application with `New-ExternalApiClient.ps1` is a temporary solution until a full solution is available. The way you create client applications will change; getting tokens and calling the API will not.
{:.note.warning}

```powershell
.\New-ExternalApiClient.ps1 -SubscriptionId 123-45678901 -VaultGuid <vault GUID>
```

An Edge window opens. Sign in to M-Files Manage. The window closes by itself and you see:

```text
> Client application created.

Client ID       : subapp,6f1d...
Vaults          : <vault GUID>
Secret expires  : 2027-02-10T09:00:00 UTC
Saved to        : C:\Users\you\AppData\Local\M-Files\ExternalApi\client.xml (readable only by your Windows user)
```

[Authentication]({{ site.baseurl }}/APIs/EXTERNAL-API/Authentication/#1-create-a-client-application) explains exactly what the script does with the Edge window.

## Step 2: Get a token

```powershell
.\Get-ExternalApiToken.ps1 -RetrySeconds 60
```

```text
> Token for subapp,6f1d..., valid until 10.2.2027 15:51
  Vault <vault GUID>: full access (External Storage API allowed)
```

A new client can take up to a minute before it works; `-RetrySeconds 60` waits for that. No one signs in here: this is what your program does every hour.

## Step 3: Read from the vault

```powershell
.\Invoke-ExternalApiDemo.ps1 -VaultUrl https://<vault-name>.cloudvault.m-files.com
```

```text
> API: https://<vault-name>.cloudvault.api.m-files.com/storage   Vault: <vault GUID>   Object type: 0
> Listed 5 object(s) in 668 ms; more pages are available (use the ct parameter).

Title                     ObjectGuid                           Files
-----                     ----------                           -----
Quarterly Report Q1 2025  a1b2c3d4-e5f6-7890-abcd-ef1234567890     1
...

> Read object 'Quarterly Report Q1 2025' (a1b2c3d4-e5f6-7890-abcd-ef1234567890).
```

Useful options:

| Option | Does |
|---|---|
| `-TypeId 162` | Lists another object type (default `0`, Document) |
| `-Limit 20` | Lists more objects |
| `-DownloadTo .\downloads` | Downloads the first file of the first listed object |
| `-Watch -IntervalSeconds 300` | Keeps running: renews the token before it expires and retries when the service is busy. Stop with Ctrl+C |

## Step 4: Use it in your own program

Your program needs only the client ID and secret, and does what `Get-ExternalApiToken.ps1` does: one `POST` to `https://login.m-files.com/connect/token`. See [Authentication]({{ site.baseurl }}/APIs/EXTERNAL-API/Authentication/#2-get-an-access-token) for curl and C# examples, and [running a program continuously]({{ site.baseurl }}/APIs/EXTERNAL-API/Authentication/#running-a-program-continuously) for the rules a long-running program should follow.

On a server, give the program the client ID and secret from your secret store, for example as the environment variables `MFILES_CLIENT_ID` and `MFILES_CLIENT_SECRET`. To print the secret for storing, run `New-ExternalApiClient.ps1` with `-ShowSecret` when you create the client.

## Clean up

When you no longer need the client application:

```powershell
.\New-ExternalApiClient.ps1 -SubscriptionId 123-45678901 -Remove
```

## Next steps

* [Core concepts]({{ site.baseurl }}/APIs/EXTERNAL-API/Concepts/)
* [Retrieving objects]({{ site.baseurl }}/APIs/EXTERNAL-API/Retrieving-Objects/)
* [Creating objects]({{ site.baseurl }}/APIs/EXTERNAL-API/Creating-Objects/)
