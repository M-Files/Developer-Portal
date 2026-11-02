---
layout: page
title: The M-Files APIs
includeInSearch: true
breadcrumb: APIs
---

M-Files provides three Application Programming Interfaces for developers to communicate with: the [gRPC API]({{ site.baseurl }}/APIs/gRPC-API/), the [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/) and the [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/).

**For new development, use the gRPC API**, especially when you build with AI coding agents. It is the complete and direct interface to M-Files Server, with no extra layer in between, so it offers the most functionality and the best performance. It can be called from any language and platform that has a gRPC implementation, and its documentation is written for coding agents as well as for people. Choose the COM/.NET API or the M-Files Web Service for new development only when a specific tool or technology calls for them.

Code that runs inside M-Files, such as [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) applications and [VBScript]({{ site.baseurl }}/Built-In/VBScript/) event handlers, uses the COM API that M-Files provides to it.

## [gRPC API]({{ site.baseurl }}/APIs/gRPC-API/)

* The complete interface to M-Files Server: the API that the M-Files clients and M-Files Admin use, providing interfaces for both "user" and "administrative" functions.
* Can be called from any language and operating system that has a gRPC implementation; quickstarts and samples are available for C#, Python and Go.
* Works with both M-Files Cloud and on-premises servers.
* The COM/.NET API and the M-Files Web Service are layers on top of the same server interface and expose much, but not all, of its functionality.

More information is available in the <a href="{{ site.baseurl }}/APIs/gRPC-API/">gRPC API section</a>.
{:.note}

## [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/)

* Provides interfaces for both "user" and "administrative" functions.
* Can only be run on Windows, where the M-Files COM object can be made available.
* Supports the same connection protocols as the desktop client.
* Supports the same authentication schemes as the desktop client.
* Can be run in "client" or "server" mode:
  * Client mode requires a vault connection is already set up within the [M-Files Desktop Settings](https://www.m-files.com/user-guide/latest/eng/Implementing_the_document_vault.html), and can show M-Files dialogs such as the metadata card for object creation.
  * Server mode does not require a vault connection to be set up on the host machine, but cannot show M-Files dialogs.
* Requires the same version of the API on the client machine as the server.

More information is available in the <a href="{{ site.baseurl }}/APIs/COM-API/">COM API section</a>.
{:.note}

## [The M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/)

* A REST-like web service that is available from within M-Files Classic Web.
* Can be called from any environment that can make HTTP requests (e.g. mobile), and is not limited to Windows operating systems.
* Connections to the MFWS are done via HTTPS.
* Supports most "user" operations, but cannot be used to undertake "administrative" functions.
* Not tied directly to the M-Files Server version.

More information is available in the <a href="{{ site.baseurl }}/APIs/REST-API/">REST API section</a>.
{:.note}