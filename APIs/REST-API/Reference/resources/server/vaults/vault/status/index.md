---
layout: mfws
title: Vault status
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/server/vaults/vault/status.html"
---

# Vault status

## /server/vaults/(vault)/status
{:.url-with-parameters}

Checks the availability of a single vault.
{:.description}

### Methods

### GET
{:.method}

By default this endpoint performs a lightweight reachability probe of the vault.  If `?onlinecheck=true` is specified then the server performs a real online-status check of the vault; use this to monitor whether a vault is truly online.
{:.remark}

{:.method}
Output: | [StatusResponse]({{ site.baseurl }}/APIs/REST-API/Reference/structs/statusresponse/)
| Retrieves the availability of the vault.  `Successful` is `true` when the vault is reachable, and — when `?onlinecheck=true` is specified — online.  An invalid or malformed vault GUID responds with `HTTP 500`.
Parameters: | `?onlinecheck` - If true, performs a real online-status check of the vault instead of a plain reachability probe.  Defaults to false.
