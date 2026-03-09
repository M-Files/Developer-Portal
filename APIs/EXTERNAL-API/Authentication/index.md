---
layout: page
title: Authentication — External Storage API
includeInSearch: true
breadcrumb: Authentication
---

All External Storage API endpoints require a JWT Bearer token with the `mfmasterstorage` scope.

```
Authorization: Bearer <MfMasterStorageToken>
```

## Obtaining a token

Currently, tokens are obtained through an interactive browser-based OAuth flow using a PowerShell script. A non-interactive client application credential is planned for a future release.

To obtain a token, please contact M-Files to receive the authentication script (`mfmasterstorage-scope-token.ps1`).
{:.note}

### Prerequisites

* **Administrator privileges** — The script must be run in an elevated PowerShell terminal
* **Vault access** — Your M-Files user account must have full access to the target vault
* **Network** — The script runs a local HTTP listener to capture the OAuth redirect

### Running the script

```powershell
# Run PowerShell as Administrator, then:
.\mfmasterstorage-scope-token.ps1 -vaultGuid "your-vault-guid-here"
```

The script will:

1. Generate an OAuth URL with the correct parameters for the Master Storage scope
2. Open a browser window for user authentication
3. Capture the authorization code via a local HTTP server
4. Exchange the code for an access token
5. Return the access token and metadata

### Script parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `vaultGuid` | Yes | The GUID of the vault you want to access |
| `loginServiceUrl` | No | The OAuth endpoint URL (defaults to the userstory environment) |

### Using the token

Include the token in the `Authorization` header of every API request:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}
```

### Token lifetime

* Tokens expire — check the JWT `exp` claim
* There is no automated refresh mechanism currently; re-run the script when the token expires
* For long-running batch jobs, monitor token expiry and re-authenticate as needed

### Troubleshooting

* **Script fails to start** — Ensure you are running PowerShell as Administrator (required for the local HTTP listener)
* **Authentication error** — Verify your user account has full access to the specified vault
* **Firewall issues** — Allow PowerShell through your firewall for the local redirect server
