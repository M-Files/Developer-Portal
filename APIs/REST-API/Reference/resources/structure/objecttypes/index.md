---
layout: mfws
title: Object types
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/objecttypes.html"
---

# Object classes

## /structure/objecttypes
{:.url-with-parameters}

Collection of object type information. 
{:.description}

### GET
{:.method}

{:.method}
Output: | [ObjType[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objtype/)
| Retrieves information on all object types. 
Parameters: | `?type` - Only returns the object types of specific kind. `real` returns only real object types. `valuelist` returns only non-object type valuelists. `both` is the default which returns all object types.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Object type]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/objecttypes/type/) | Information on a single object type. 