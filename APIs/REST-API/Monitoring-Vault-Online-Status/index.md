---
layout: page
title: Monitoring vault online status via the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Monitoring Vault Online Status
---

This page describes how a client can regularly poll the online status / availability of a vault through the M-Files Web Service (MFWS).

All MFWS REST resources are served under the `/REST/` path of the M-Files Classic Web site (e.g. `https://<server-host>/REST/<resource>`). If your Web Access is configured in a subdirectory then prefix that on all links, [as described on the REST API overview]({{ site.baseurl }}/APIs/REST-API/).
{:.note}

## Recommended endpoint for online-status polling

Use [/server/vaults/(vault)/status]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/vaults/vault/status/) to check the availability of a single vault. It supports two modes via the `onlinecheck` query parameter:

Request | Behavior
--- | ---
`GET /server/vaults/(vault)/status` | **Reachability probe.** Verifies the vault exists and is reachable, without performing an actual online-status check of the vault. Lighter weight.
`GET /server/vaults/(vault)/status?onlinecheck=true` | **Online-status check.** Performs an actual online/heartbeat check of the vault. This is the mode to use for monitoring whether a vault is truly online.

Both modes return a [StatusResponse]({{ site.baseurl }}/APIs/REST-API/Reference/structs/statusresponse/); treat `Successful == true` as available/online. An invalid or malformed vault GUID responds with `HTTP 500`.

For example, an online-status check for vault `{1234ABCD-1234-1234-1234-1234567890AB}` is:

`GET /REST/server/vaults/{1234ABCD-1234-1234-1234-1234567890AB}/status?onlinecheck=true`

A successful response:

```json
{
  "Successful": true,
  "Message": "Vault availability test succeeded in vault {1234abcd-1234-1234-1234-1234567890ab}"
}
```

## Related status endpoints

* [/server/status]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/status/) — a coarse server-level liveness signal, independent of any particular vault. If the M-Files server is unavailable the service responds with `503`.
* [/server/vaults]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/vaults/) — lists the vaults that are on-line and available to the caller. The vault objects carry no explicit online/offline field; online status is conveyed only by a vault's presence or absence in the list. For an explicit online check of a specific vault, use `/server/vaults/(vault)/status?onlinecheck=true` instead.

## Authentication

Authentication requirements differ by endpoint:

* **No authentication required** — `GET /server/status` and `GET /server/vaults/(vault)/status` (with or without `onlinecheck`) can be called anonymously. This is convenient for monitoring: a poller needs no credentials, session, or token.
* **Authentication required** — `GET /server/vaults` requires a login; called anonymously it responds with `403 Forbidden`.

To authenticate for user-scoped resources such as `/server/vaults`, use one of the standard MFWS mechanisms described on the [Authentication page]({{ site.baseurl }}/APIs/REST-API/Authentication/) (session cookie, authentication token, or single sign-on).

### Discovering the vault GUID without logging in

The online-status endpoint needs a vault GUID, but `/server/vaults` requires authentication. If you cannot log in, note that `GET /server/authenticationprotocols` (anonymous) also exposes the vault GUID in its `ConfigurationSource.VaultGUID` field, letting a monitoring client obtain everything it needs — vault GUID plus status — without a login.

## Polling guidance

* For "is this specific vault online" monitoring, poll `/server/vaults/(vault)/status?onlinecheck=true` on your chosen interval and treat `Successful == true` as online.
* Use the lighter `/server/vaults/(vault)/status` (no `onlinecheck`) if you only need a reachability probe and want to minimize server load.
* Use `/server/status` for a coarse server-level liveness signal.

Each `onlinecheck=true` call triggers a real online check on the server, so choose an interval appropriate to your monitoring needs and avoid aggressive intervals across many vaults simultaneously.
{:.note.warning}

### Quick test snippets

`curl` (no authentication needed):

```text
curl "https://<server-host>/REST/server/vaults/{vaultGuid}/status?onlinecheck=true"
```

PowerShell:

```text
$guid = '{E83303E5-2D8A-4EE9-9895-E36792B59696}'
Invoke-RestMethod "https://<server-host>/REST/server/vaults/$guid/status?onlinecheck=true"
# -> Successful : True
#    Message    : Vault availability test succeeded in vault {...}
```
