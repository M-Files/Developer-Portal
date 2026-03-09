---
layout: page
title: The M-Files APIs
includeInSearch: true
breadcrumb: APIs
---

M-Files provides three Application Programming Interfaces for developers to communicate with: the [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/), the [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/), and the [External Storage API]({{ site.baseurl }}/APIs/EXTERNAL-API/). The choice of which to use in each scenario will depend upon the technology you are using and the operations that you wish to undertake.

## [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/)

* Our most comprehensive API, providing interfaces for both "user" and "administrative" functions.
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

## [External Storage API]({{ site.baseurl }}/APIs/EXTERNAL-API/)

* A REST API for importing and managing objects in M-Files external cloud storage (Master Storage).
* Designed for bulk data import, integration, and migration scenarios.
* Connects directly to the cloud storage layer, not through the M-Files Server.
* Supports object creation with metadata, inline file upload, and large file upload via SAS tokens.
* Every imported object requires a security context object that controls access rights.
* Authentication via JWT Bearer token with the `mfmasterstorage` scope.

More information is available in the <a href="{{ site.baseurl }}/APIs/EXTERNAL-API/">External Storage API section</a>.
{:.note}