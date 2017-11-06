---
layout: mfws
title: File name
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/title.html"
---

# File name

## /objects/(type)/(objectid)/(version)/files/(file)/title
{:.url-with-parameters}

The file name of an object file. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | `string`
| Retrieves the current object file name. 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the _method, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | `string`
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Sets the name on the object file. 

