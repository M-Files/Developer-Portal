---
layout: mfws
title: Server status
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/server/status.html"
---

# Server status

## /server/status
{:.url-with-parameters}

Server status. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [StatusResponse]({{ site.baseurl }}/APIs/REST-API/Reference/structs/statusresponse/)
| Retrieves the server status. If the M-Files server is unavailable the service responds with 503. 