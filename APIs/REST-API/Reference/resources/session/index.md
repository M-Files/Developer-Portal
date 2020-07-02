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

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [Authentication]({{ site.baseurl }}/APIs/REST-API/Reference/structs/authentication/)
Output: | [Vault[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/vault/)
| Performs login using the credentials in the request. 

### DELETE
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Output: | `HTTP 204 status code`
| Performs a logout for the session. A [session ID]({{ site.baseurl }}/APIs/REST-API/Reference/structs/authentication/) must have been provided as part of the authentication token request for this to work.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Authentication tokens]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/authenticationtoken/) | Authentication token representing the current session. 
[User ID]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/userid/) | The ID of the current user. 
[Vault]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/vault/) | The document vault attached to the current session. 
[Vaults]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/vaults/) | Retrieves a list of vaults that are accessible by the current user. 