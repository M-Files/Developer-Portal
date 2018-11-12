---
layout: mfws
title: Setting properties on multiple objects
includeInSearch: true
minimumVersion: 12.0.6400.37
---

# Setting properties on multiple objects

## /objects/setmultipleobjproperties
{:.url-with-parameters}

Sets properties in multiple objects in one HTTP call.  Can also be used to promote an unmanaged external object.
{:.description}

To promote an unmanaged external object, ensure that the class property (and any other required properties) is included in the properties submitted.
{:.remark}

### Methods

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [ObjectsUpdateInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectsupdateinfo/)
| Information on the objects to update.  If external objects are included, and their properties now include the object class, then the object is promoted.
Output: | [ExtendedObjectVersion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Information on the updated objects.
