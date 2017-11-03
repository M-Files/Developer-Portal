---
layout: mfws
title: Session
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/session.html"
---

# Session

## /session
{:.url-with-parameters}

Current user session information.
{:.description}

### GET
{:.method}

{:.method}
Output: | [SessionInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/sessioninfo/)
| Retrieves the current session information. 

### PUT
{:.method}

{:.method}
Input: | [Authentication]({{ site.baseurl }}/APIs/REST-API/Reference/structs/authentication/)
Output: | [Vault[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/vault/)
| Performs login using the credentials in the request. 

### DELETE
{:.method}

{:.method}
Output: | `HTTP 204 status code`
| Performs a logout for the session. 

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Authentication tokens]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/authenticationtoken/) | Authentication token representing the current session. 
[Vault]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/vault/) | The document vault attached to the current session. 