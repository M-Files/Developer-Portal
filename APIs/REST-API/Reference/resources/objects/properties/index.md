---
layout: mfws
title: Properties of multiple objects
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/properties.html"
---

# Properties of multiple objects

## /objects/properties
{:.url-with-parameters}

A resource that allows access to properties of multiple objects.
{:.description}

### Methods

The properties returned in the response are arranged in the same order as the object versions sent in the request. This information should be used to match the correct [PropertyValue[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/) to the correct object version.
{:.remark}

### GET
{:.method}

{:.method}
Output: | [PropertyValue[][]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
| Retrieves properties of multiple objects. The object versions are specified in the URI seperated with semicolons, e.g. `/objects/properties;0/5/6;0/112/latest;136/2/3`.

Note that the number of arguments provided to this endpoint may easily exceed the maximum URI length.  For this purpose it is suggested to use the `POST` method instead which does not suffer from such limitations.  
{:.remark}

### POST
{:.method}

{:.method}
Input: | [ObjVer[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objver/)
Output: | [PropertyValue[][]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/)
| Retrieves properties of multiple objects. The object versions are specified in the request body.

Note that explicit object versions must be provided when using this endpoint (you cannot provide -1 as the version number to indicate the latest version).
{:.remark}