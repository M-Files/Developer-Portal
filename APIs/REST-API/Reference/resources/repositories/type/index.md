---
layout: mfws
title: Favorite object
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/favorites/type/object.html"
---

# Favorite object

## /favorites/(type)/(objectid)
{:.url-with-parameters}

A single favorite object.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Retrieves object version information on the favorite object

### DELETE
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the _method, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Removes an object from favorites.
