---
layout: mfws
title: Authentication
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/authentication.html"
---

# Authentication

Structures the details used for authentication with the M-Files Web Service.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | Username
`string` | Password
`string` | Domain
`bool` | WindowsUser
`string` | ComputerName
`string` | VaultGuid
`DateTime?` | Expiration
`bool` | ReadOnly
`string` | URL
`string` | Method
`string` | SessionID | A string (e.g. a GUID) to uniquely identify a session.  If provided then the session can be destroyed by issuing a `DELETE` request to [the session endpoint]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session).
