---
layout: mfws
title: Favorites
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/favorites.html"
---

# Favorites

## /favorites
{:.url-with-parameters}

Collection of favorited objects.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectVersion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Retrieves favorite objects.

### POST
{:.method}

{:.method}
Input: | [ObjID]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objid/)
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Adds an object to the favorites.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Favorite object]({{ site.baseurl }}/APIs/REST-API/Reference/resources/favorites/type/objectid/) | A single favorite object. 