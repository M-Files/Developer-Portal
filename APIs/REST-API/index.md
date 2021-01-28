---
layout: page
title: The M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: REST API
---

The [M-Files Web Service (MFWS)]({{ site.baseurl }}/APIs/REST-API/) is a REST-like web service that is available from within M-Files Web Access. Note that this must be configured separately from the standard M-Files server, and may not be available on all installations.  The following differences are important to note when compared with the [COM API]({{ site.baseurl }}/APIs/COM-API/):

* The MFWS can be used from any environment that can make HTTP requests, and is not limited to Windows operating systems.

* The MFWS supports most "user" operations but cannot (natively) be used to undertake administrative operations.

* Code interacting with the MFWS is not directly dependent on the M-Files sever version; as the sever and MFWS are updated, it is unlikely that your code will require further changes.

## Setup

The M-Files Web Service (MFWS) is part of the M-Files Web Access.  Once M-Files Web Access is correctly configured, the M-Files Web Service will be available to use.  More information on [setting up the M-Files Web and Mobile Access is available in our user guide](https://www.m-files.com/user-guide/latest/eng/Configure_M-Files_Web_Access.html).  Once configured the REST API is available within the M-Files Web Access at `/REST/`.  If your Web Access has been configured in a subdirectory then remember to prefix that on all links (e.g. if it's in `/MFiles/` then your REST API is available within `/MFiles/REST/`).

## IIS compatibility

### HTTP verbs

The official M-Files Web Service documentation defines endpoints that use different HTTP verbs in order to provide different functionality. As an example:

* [/objects/(type)/(objectid)/(version)](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version.html) uses `GET` to retrieve information about a specific object version.

* [/objects/(type)/(objectid)/(version)/files](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/files.html) uses `POST` to add files to an object.

* [/objects/(type)/(objectid)/(version)](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version.html) uses `DELETE` to destroy an object.

* [/objects/(type)/(objectid)/(version)/files/(file)/content](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/content.html) uses `PUT` to replace the contents of a specific file.

Depending upon the version of Windows, IIS, and M-Files being used, sometimes only the `GET` and `POST` HTTP verbs will correctly work.  For maximum compatibility it is recommended that `DELETE` and `PUT` requests are routed via the `_method` querystring parameter, as shown below.
{:.note.warning}

Original method | Original endpoint | Compatible method | Compatible endpoint | Change
--- | --- | --- | --- | ---
`GET` | `/REST/resource` | `GET` | `/REST/resource` | None
`POST` | `/REST/resource` | `POST` | `/REST/resource` | None
`PUT` | `/REST/resource` | `POST` | `/REST/resource?_method=PUT` | Change to `POST` request and ensure that the `_method` parameter is set on the querystring, with a value of `PUT` (the original verb).
`DELETE` | `/REST/resource` |`POST` | `/REST/resource?_method=DELETE` | Change to `POST` request and ensure that the `_method` parameter is set on the querystring, with a value of `DELETE` (the original verb).

#### File extensions

Older versions of IIS do not correctly map "extensionless" handlers to the M-Files Web Service.  To resolve this, include `.aspx` on the end of all endpoint addresses:

Original endpoint | Compatible endpoint
--- | ---
`/REST/resource` | `/REST/resource.aspx`
`/REST/resource?_method=PUT` | `/REST/resource.aspx?_method=PUT`
`/REST/resource?allVersions=true` | `/REST/resource.aspx?allVersions=true`
