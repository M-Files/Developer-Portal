---
layout: mfws
title: Request parameters
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/parameters.html"
---

# Request parameters
{:#parameters}

In addition to the resource specific parameters there are few request parameters that affect the way M-Files Web Service handles the requests with all resources.

## Authentication

Almost all of the M-Files Web Service resources require either an application-level or vault-level authentication. There are three alternate ways to authenticate the requests: Two header-based approaches using either plain text credentials or encrypted authentication token or a cookie based approach using the [/session]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session) and [/session/vault]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/vault) resources.

The headers used in the header-based authentication are listed below in [table 1](#table-1).

{:#table-1 .table}
Header | Description
--- | ---
X-Username | Plain text username.
X-Password | Plain text password.
--- | ---
X-WindowsUser | Value of `true` if M-Files should authenticate the username and password against Windows domain. Omit this header or use the value of `false` to authenticate the user as M-Files user.
X-Domain | Windows domain for Windows authentication. The header value can be empty or the header can be omitted to use the default domain.
--- | ---
X-Authentication | Encrypted authentication token. This can be requested through [/server/authenticationtokens]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/authenticationtokens) and [/session/authenticationtoken]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/authenticationtoken) resources.
--- | ---
X-Vault | Document vault GUID. Application-level resources such as [the document vault list]({{ site.baseurl }}/APIs/REST-API/Reference/server/vaults) can be accessed even if this header is missing.
X-ComputerName | Unique identifier for the client computer. This is used mainly to distinguish check-outs from different computers. This header always overrides the computer name - even if an authentication token containing a computer name is used.  The default ComputerName is `M-FILES WWW` for systems accessing MFWS without java enabled in their browsers. If a java enabled browser is used to access MFWS, then ComputerName will be `M-FILES WWW ( NAME )`, NAME being an arbritrary string to identify the machine used.

<div class="caption">
	<span class="caption-label">Table 1:</span>
	Authentication headers
</div>

The authentication token can be created with or without the vault-information. If the token is created without the vault-information it provides only an application-level token. Application-level authentication token can be used to request [the vault listing]({{ site.baseurl }}/APIs/REST-API/Reference/server/vaults) from the server in which case the listing contains vault-level authentication tokens or alternatively the application-level authentication token may be combined with the `X-Vault` header to acquire a vault-level authentication context.
{:.remark}

M-Files Web Service also supports passing the header values as query parameters in case the header values cannot be modified for one reason or another. The mapping between headers and query parameters is listed in [table 2](#table-2) below. In case a parameter is defined both as a header and as a query parameter the header value is used.

{:#table-2 .table}
Header | Query parameter
--- | ---
X-Username | username
X-Password | password
X-WindowsUser | windowsuser
X-Domain | domain
X-Authentication | auth
X-Vault | vault
X-ComputerName | computername

<div class="caption">
	<span class="caption-label">Table 2:</span>
	Authentication headers
</div>

## Content type negotiation

HTTP protocol defines two headers that are used to negotiate the content types used within the requests and the responses. These are the `Content-Type` and `Accept` headers. `Content-Type` header describes the type of content transmitted in the request or response body while the `Accept` header is sent by the client to the server to inform the server what kind of content the client prefers.

M-Files Web Service acknowledges this header and currently the only supported value for it is `application/json` save for few resource-specific exceptions. These exceptions are mainly in the resources that accept or respond with file contents. There is experimental support for `application/xml` or `text/xml` for XML serialization instead of JSON serialization but this has known issues. If the `Content-Type` or `Accept` headers are missing, or they contain only unsupported content types, `application/json` is used.


Do define the `Content-Type` and `Accept` headers when possible. Future versions of M-Files Web Service might add more content options such as `application/html`, `application/xml` or `application/x-www-form-urlencoded`. Currently passing `application/html` as the `Accept` header results in JSON serialization but if M-Files Web Service starts supporting `application/html` this will change and requires modifications to the application.
{:.remark}

