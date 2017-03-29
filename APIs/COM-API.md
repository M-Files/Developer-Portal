---
layout: page
title: The COM/.NET API
---

The [M-Files COM/.NET API]({{ site.baseurl }}/APIs/COM-API/) can be used from any software that can interact with COM. This API is our most comprehensive API and provides interfaces for most "user" and "administrative" functions.
The API is available on both 32-bit and 64-bit versions and is typically referenced from your code by...

The API can be used in either "server" or "client" mode. Some API methods are only available in one of the modes. The API major and minor versions must match the server version (e.g. 2015.3 API to communicate with the 2015.3 server).

Client mode is designed to be used in situations where both the user is present, and a connection to the vault has been created in the M-Files Desktop Settings. In client mode, built-in M-Files dialogs (e.g. the "create new object" metadata card) can be shown to the user for them to interact with.

Server mode is designed to be used in situations where the user is not necessarily present, and/or a connection to the vault has not been created in the M-Files Desktop Settings. In server mode, dialogs cannot be shown and the code must programmatically undertake these actions.

The server mode allows connections to M-Files servers using the standard protocols – TCP/IP, HTTPS, and LPC – and supports all the same authentication schemes that M-Files supports.