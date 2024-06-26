---
layout: mfws
title: Check out status
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout.html"
---

# Check out status

## /objects/(type)/(objectid)/(version)/checkedout
{:.url-with-parameters}

Resource representing the check out state of the object. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [PrimitiveType]({{ site.baseurl }}/APIs/REST-API/Reference/structs/primitivetypet/)<[MFCheckOutStatus]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfcheckoutstatus/)>
| Retrieves the current check out status. 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [PrimitiveType]({{ site.baseurl }}/APIs/REST-API/Reference/structs/primitivetypet/)<[MFCheckOutStatus]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfcheckoutstatus/)>
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/), `HTTP 204`
| Sets the check out status. This is allowed only when the object isn't checked out to someone else, that is when the check out status isn't `CheckedOut`. 

See DELETE on [/objects/(type)/(objectid)/(version)]( .. ) for undoing the check out. 
{:.remark}
