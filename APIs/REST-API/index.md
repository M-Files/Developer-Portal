---
layout: page
title: The M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: REST API
---

The [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/) is a REST-like web service that is available from within M-Files Web Access. Note that this must be configured separately from the standard M-Files server, and may not be available on all installations.  The following differences are important to note when compared with the [COM API]({{ site.baseurl }}/APIs/COM-API/):

* The MFWS can be used from any environment that can make HTTP requests, and is not limited to Windows operating systems.

* The MFWS supports most "user" operations but cannot be used to undertake administrative operations.

* Code interacting with the MFWS is not directly dependent on the M-Files sever version; as the sever and MFWS are updated, it is unlikely that your code will require further changes.

## Setup

The M-Files Web Service (MFWS) is part of the M-Files Web Access.  Once M-Files Web Access is correctly configured, the M-Files Web Service will be available to use.  More information on [setting up the M-Files Web and Mobile Access is available in our user guide](https://www.m-files.com/user-guide/latest/eng/Configure_M-Files_Web_Access.html).  Once configured the REST API is available within the M-Files Web Access at `/REST/`.  If your Web Access has been configured in a subdirectory then remember to prefix that on all links (e.g. if it's in `/MFiles/` then your REST API is available within `/MFiles/REST/`).

