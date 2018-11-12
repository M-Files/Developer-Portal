---
layout: mfws
title: Object properties
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties.html"
---

# Object properties

## /objects/(type)/(objectid)/(version)/properties
{:.url-with-parameters}

The properties of an object. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [PropertyValue[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
| Retrieves the object properties 
Parameters: | `?forDisplay` - If true, the response will be filtered and sorted for display. Each object has several built-in properties which usually aren't shown to the user. This parameter can be used to leave those out.

### POST
{:.method}

{:.method}
Input | [PropertyValue[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Sets the posted properties on the object. If the object already has a value for the sent properties this value will be overridden. 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input | [PropertyValue[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Sets the object properties. Properties not included in the request are removed from the object. 

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Single object property]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/id/) | A single property of an object. 
