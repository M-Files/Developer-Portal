---
layout: page
title: Getting Started
---

## Using this website

This website complements and extends our existing documentation, available either online or within repositories such as the M-Files Partner Portal.  The purpose of this website is to provide tailored guidance, tutorials, and samples to software developers looking to extend or integrate with M-Files.

## Built-in functionality

### VBScript

### External Object Type Data Sources

### Importing file metadata from XML

## Our APIs

M-Files provides two Application Programming Interfaces for developers to communicate with: the COM/.NET API and the M-Files Web Service. The choice of which to use in each scenario will depend upon the technology you are using and the operations that you wish to undertake.

### COM/.NET API

The [M-Files COM/.NET API]({{ site.baseurl }}/APIs/COM-API/) can be used from any software that can interact with COM. This API is our most comprehensive API and provides interfaces for most "user" and "administrative" functions.
The API is available on both 32-bit and 64-bit versions and is typically referenced from your code by...

The API can be used in either "server" or "client" mode. Some API methods are only available in one of the modes. The API major and minor versions must match the server version (e.g. 2015.3 API to communicate with the 2015.3 server).

Client mode is designed to be used in situations where both the user is present, and a connection to the vault has been created in the M-Files Desktop Settings. In client mode, built-in M-Files dialogs (e.g. the "create new object" metadata card) can be shown to the user for them to interact with.

Server mode is designed to be used in situations where the user is not necessarily present, and/or a connection to the vault has not been created in the M-Files Desktop Settings. In server mode, dialogs cannot be shown and the code must programmatically undertake these actions.

The server mode allows connections to M-Files servers using the standard protocols – TCP/IP, HTTPS, and LPC – and supports all the same authentication schemes that M-Files supports.

### The M-Files Web Service

The [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/) is a REST-like web service that is available from within M-Files Web Access. Note that this must be configured separately from the standard M-Files server, and may not be available on all installations.

The MFWS can be used from any environment that can make HTTP requests, and is not limited to Windows operating systems.

The MFWS supports most "user" operations but cannot be used to undertake administrative operations.

Whilst there are some differences in available endpoints between versions, code interacting with the MFWS is not directly dependent on the M-Files sever version; as the sever and MFWS are updated, it is unlikely that your code will require further changes.

## Our Frameworks

M-Files provides two separate frameworks: the User Interface Extensibility Framework (UIX), and the Vault Application Framework (VAF).

### The User Interface Extensibility Framework (UIX)

The [User Interface Extensibility Framework]() is used to create client-side applications that interact with, replace, or react to, the M-Files Desktop client or M-Files Web Access.

### The Vault Application Framework (VAF)

The Vault Application Framework is designed as a replacement for using VBScript within M-Files vaults, allowing the use of .NET code instead.
