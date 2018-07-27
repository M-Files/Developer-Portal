---
layout: mfws
title: Object title
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/title.html"
---

# Object title

## /objects/(type)/(objectid)/(version)/title
{:.url-with-parameters}

Resource representing the object title. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | `string`
| Retrieves the object name 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | `string`
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Sets the object name 

If the object has an automatic title PUT will result in 401. 
{:.remark}
