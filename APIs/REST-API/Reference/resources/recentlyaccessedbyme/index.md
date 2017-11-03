---
layout: mfws
title: Recently accessed by the user
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/recentlyaccessedbyme.html"
---

# Recently accessed by the user

## /recentlyaccessedbyme
{:.url-with-parameters}

A collection of objects recently accessed by the current user.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectVersion[][]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Retrieves the recently accessed objects

### POST
{:.method}

{:.method}
Input: | [ObjID]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objid/)
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Notifies object access and adds the object to the recently accessed objects.