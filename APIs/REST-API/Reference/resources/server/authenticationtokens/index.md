---
layout: mfws
title: Authentication tokens
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/server/authenticationtokens.html"
---

# Authentication tokens

## /server/authenticationtokens
{:.url-with-parameters}

Transient resource used in calculating new authentication tokens. 
{:.description}

### Methods

### POST
{:.method}

{:.method}
Input: | [Authentication]({{ site.baseurl }}/APIs/REST-API/Reference/structs/authentication/)
Output: | string
| Creates a new authentication token based on the authentication information. See [Getting started]({{ site.baseurl }}/APIs/REST-API/Reference/gettingstarted/#authenticating) for more information on authenticating.