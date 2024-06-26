---
layout: mfws
title: Single object property
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/id.html"
---

# Single object property

## /objects/(type)/(objectid)/(version)/properties/(id)
{:.url-with-parameters}

A single property of an object. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [PropertyValue]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
| Retrieves a single property value  

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input | [PropertyValue]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Sets a single property value

### DELETE
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Removes a single property value