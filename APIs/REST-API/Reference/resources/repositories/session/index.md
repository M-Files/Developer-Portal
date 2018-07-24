---
layout: mfws
title: Repository session
includeInSearch: true
---

# Repository session

## /repositories/(targetid)/session
{:.url-with-parameters}

Allows login and logout of external repository connections.
{:.description}

### Methods

### POST
{:.method}

Logs into the specified external repository connection using the provided authentication data.
{:.description}

{:.method}
Input: | [RepositoryAuthentication]({{ site.baseurl }}/APIs/REST-API/Reference/structs/repositoryauthentication/)
Output: | [RepositoryAuthenticationStatus]({{ site.baseurl }}/APIs/REST-API/Reference/structs/repositoryauthenticationstatus/)

### DELETE
{:.method}

Logs out from specified external repository connection.
{:.description}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the _method, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}
