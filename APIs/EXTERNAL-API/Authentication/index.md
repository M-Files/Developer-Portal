---
layout: page
title: Authentication — External Storage API
includeInSearch: true
breadcrumb: Authentication
---

Every External Storage API request needs a JWT access token with the `mfmasterstorage` scope:

```
Authorization: Bearer <access token>
```

Programs get this token with a **client application**: a login for a program rather than for a person. A client application has a client ID and a secret, and it can access only the vaults you give it. With these, your program gets tokens by itself, with no one signing in (the OAuth 2.0 *client credentials* flow).

New to the API? The [Quickstart]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/) takes you from nothing to your first API call with ready-made scripts.
{:.note}

## 1. Create a client application

**Temporary solution.** Creating a client application with this script is a temporary solution until a full solution is available. The way you create client applications will change; getting tokens and calling the API (steps 2 and 3) will not.
{:.note.warning}

You do this once, as a subscription administrator. Download [`New-ExternalApiClient.ps1`]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/scripts/New-ExternalApiClient.ps1) and run:

```powershell
.\New-ExternalApiClient.ps1 -SubscriptionId <subscription ID> -VaultGuid <vault GUID>
```

An Edge window opens. Sign in to M-Files Manage as you normally do; the script does the rest and saves the client ID and secret to a file that only your Windows user account can read.

### What you need

| | |
|---|---|
| **Role** | Subscription administrator (permission to manage access rights) in the subscription |
| **Subscription ID** | The part after `manage.m-files.com/` in the Manage address bar, for example `123-45678901` |
| **Vault GUID** | The GUID of each vault the program should access. The vault must belong to the same subscription |
| **Computer** | Windows with Microsoft Edge and [PowerShell 7](https://aka.ms/powershell). Only this one-time step needs Windows |

### What the script does

1. Opens a **separate** Edge window with a temporary, empty profile. Your normal browser and its data are not touched.
2. Waits until you have signed in to M-Files Manage in that window.
3. Reads your Manage sign-in from that window's requests to the M-Files subscription API. To do this it starts Edge with remote debugging enabled on a local port that only your computer can reach.
4. Closes the window and deletes the temporary profile. Your sign-in is used only for this one operation and is not saved.
5. Creates the client application with access to the vaults you gave, and **no** subscription administration rights.
6. Saves the client ID and secret, encrypted for your Windows user, to `%LOCALAPPDATA%\M-Files\ExternalApi\client.xml`.

The secret is shown only once, when the client is created. Add `-ShowSecret` to print it so you can store it in your own secret store, such as Azure Key Vault. Never put it in source code.
{:.note.warning}

### Vault access

The External Storage API requires **full access** to the vault. By default the script grants vault roles `1027`, which is:

| Role | Value | Why |
|---|---|---|
| Full control of vault | 1 | Required by the External Storage API |
| Log in to vault | 2 | Without this the vault is left out of the token completely |
| Internal user | 1024 | Other roles have no effect without it |

A client application can only be given access to vaults in its own subscription, and it can never run code on the server.

### Other script options

| Command | Does |
|---|---|
| `-RotateSecret` | Gives the saved client a new secret. **The old secret stops working immediately**, so update your programs right after. |
| `-Remove` | Deletes the client application. Tokens it already has stay valid until they expire (at most one hour). |
| `-ValidityDays 90` | Days until the secret expires (default 90). |
| `-Name "Invoice importer"` | Name of the client, shown in the client list. |
| `-CheckBrowser` | Checks that the script can open and watch Edge, without signing in. |

## 2. Get an access token

With the client ID and secret, request a token from the M-Files login service:

```
POST https://login.m-files.com/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=subapp,<client GUID>&client_secret=<secret>&scope=mfmasterstorage
```

The client ID always has the form `subapp,<GUID>`.

### curl

```bash
curl -X POST https://login.m-files.com/connect/token \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "client_id=subapp,<client GUID>" \
  --data-urlencode "client_secret=<secret>" \
  --data-urlencode "scope=mfmasterstorage"
```

### PowerShell

[`Get-ExternalApiToken.ps1`]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/scripts/Get-ExternalApiToken.ps1) reads the client saved by `New-ExternalApiClient.ps1`, or the environment variables `MFILES_CLIENT_ID` and `MFILES_CLIENT_SECRET`:

```powershell
$token = (.\Get-ExternalApiToken.ps1 -Quiet).AccessToken
```

### C#

```csharp
using var http = new HttpClient();
var response = await http.PostAsync("https://login.m-files.com/connect/token",
    new FormUrlEncodedContent(new Dictionary<string, string>
    {
        ["grant_type"] = "client_credentials",
        ["client_id"] = clientId,          // "subapp,<client GUID>"
        ["client_secret"] = clientSecret,  // from your secret store
        ["scope"] = "mfmasterstorage",
    }));
response.EnsureSuccessStatusCode();
using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
string accessToken = json.RootElement.GetProperty("access_token").GetString();
int expiresIn = json.RootElement.GetProperty("expires_in").GetInt32();
```

### Response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "mfmasterstorage"
}
```

The token's `accessrights` claim lists the vaults it can access. `vault2` holds the access bits per vault GUID; `274808663551` means full access.

A brand-new client application can take up to a minute before its first token request succeeds. Until then the login service answers `invalid_client`.
{:.note}

## 3. Call the API

Send the token in the `Authorization` header. The API address is your vault's address with `.api` added, followed by `/storage`:

| | |
|---|---|
| Vault address | `https://<vault-name>.cloudvault.m-files.com` |
| External Storage API | `https://<vault-name>.cloudvault.api.m-files.com/storage` |

```bash
curl -H "Authorization: Bearer <access token>" \
  "https://<vault-name>.cloudvault.api.m-files.com/storage/external/v1/vaults/<vault GUID>/objects/0?limit=10"
```

## Running a program continuously

| Do | Why |
|---|---|
| Keep one token and reuse it. Get a new one about five minutes before `expires_in` runs out. | Tokens last one hour. There are no refresh tokens: getting a new token is the same request again. |
| On `401`, get a new token and retry **once**. If it fails again, stop and alert. | A second `401` means a configuration problem (vault access or vault GUID), not an expired token. |
| On `429` or `503`, wait and retry, honouring `Retry-After`. | The service, or the storage behind it, can be temporarily busy. |
| Use `limit` and `ct` when listing objects. | Listing a large vault in one call can take a long time. |
| Keep the secret in a secret store and rotate it before it expires. | When the secret expires, token requests fail. Rotating removes the old secret immediately. |
| Use a separate client application for each program and environment, with only the vaults it needs. | You can remove one program's access without affecting the others. |

Removing a client application, or its access to a vault, does not cancel tokens it already has. They stay valid until they expire, at most one hour later.
{:.note.warning}

[`Invoke-ExternalApiDemo.ps1`]({{ site.baseurl }}/APIs/EXTERNAL-API/Quickstart/scripts/Invoke-ExternalApiDemo.ps1) with `-Watch` shows these rules in a running loop.

## Troubleshooting

| Problem | Cause and fix |
|---|---|
| `Could not connect to the Edge window` | Your organization blocks Edge remote debugging (policy `RemoteDebuggingAllowed`). Run the script on a computer where it is allowed. |
| `No sign-in was seen` | Refresh the Manage page in the opened window, or sign in within five minutes. |
| `HTTP 403` when creating the client | Your account is not a subscription administrator in that subscription. |
| `HTTP 404` when creating the client | Wrong subscription ID, or the vault is not in that subscription. |
| `invalid_client` from the login service | Wrong client ID or secret, the client was removed, its secret has expired, or the client was created less than a minute ago. |
| `401` from the API with a fresh token | The client lacks full access to that vault, or the vault GUID and address do not match. |
