---
layout: page
title: The M-Files Web Service (REST API)
---

The [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/) is a REST-like web service that is available from within M-Files Web Access. Note that this must be configured separately from the standard M-Files server, and may not be available on all installations.

The MFWS can be used from any environment that can make HTTP requests, and is not limited to Windows operating systems.

The MFWS supports most "user" operations but cannot be used to undertake administrative operations.

Whilst there are some differences in available endpoints between versions, code interacting with the MFWS is not directly dependent on the M-Files sever version; as the sever and MFWS are updated, it is unlikely that your code will require further changes.