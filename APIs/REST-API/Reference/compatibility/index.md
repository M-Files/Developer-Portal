---
layout: mfws
title: Compatibility
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/compatibility.html"
---

# Compatibility
{:#chpt:compatibility}

## Server compatibility

M-Files Web Service requires .NET Framework 4 and IIS 5.1 or newer on the server. There are couple of features which enable better support for older IIS versions but might require changes in the requests.

### File extensions

M-Files Web Service requires .NET Framework 4 and IIS 5.1 or newer on the server. Older IIS versions (5.1 and 6.0) use file extensions to map incoming HTTP requests to different extensions such as ASP.Net. M-Files Web Service supports `.aspx` and `.ashx` extensions for all resource URIs. These make it easier to invoke the resources in case the web service is hosted on top of IIS 5.1 or IIS 6.0 server and have no real effect on the actual resource. 


When writing an application that might be consuming M-Files Web Service from an older IIS server, do use either `.aspx` or `.ashx` extension in the requests. This makes it easier to configure the server and enables the default M-Files Web Access deployment to be used.
{:.remark}

### HTTP methods

Another compatibility hurdle caused by the older IIS versions is the support for `PUT` and `DELETE` methods in the HTTP requests. The older IIS versions forward only the `GET` and `POST` requests to ASP.Net by default. M-Files Web Service supports using a `_method` query parameter to override the HTTP method in the request. See [table 1](#table-1) below for how to use this parameter.

<div class="caption">
	<span class="caption-label">Table 1:</span>
	Using _method parameter.
</div>

{:#table-1 .table}
Original request | Compatible request
--- | ---
`GET /REST/resource` | `GET /REST/resource`
`POST /REST/resource` | `POST /REST/resource`
`PUT /REST/resource` | `POST /REST/resource?_method=PUT`
`DELETE /REST/resource` | `POST /REST/resource?_method=DELETE`

Use the `_method` parameter to invoke `PUT` and `DELETE` methods over `POST`. This enables the application to consume M-Files Web Services that are hosted on top of an older IIS server.
{:.remark}

### REST path in a query parameter

Some third party components only support web services with a single URL and insist on passing all parameters as query parameters. M-Files Web Service can be used by such components by hosting it within an `.ashx` handler. The M-Files Web Access includes `MFWS.ashx` handler for such purposes. This handler is able to invoke any M-Files Web Service resource by passing the resource path in the `restPath` query parameter. [Table 2](#table-2) below shows M-Files Web Service requests using MFWS.ashx handler.

<div class="caption">
	<span class="caption-label">Table 2:</span>
	Using MFWS.ashx to call M-Files Web Service.
</div>

{:#table-2 .table}
Original request | Compatible request
--- | ---
`GET /REST/resource` | `GET MFWS.ashx?restPath=resource`
`POST /REST/resource` | `POST MFWS.ashx?restPath=resource`