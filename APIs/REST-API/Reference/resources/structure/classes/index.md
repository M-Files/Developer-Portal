---
layout: mfws
title: Object classes
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/classes.html"
---

# Object classes

## /structure/classes
{:.url-with-parameters}

Collection of object class information. 
{:.description}

### GET
{:.method}

{:.method}
Output: | [ObjectClass[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectclass/) if `bygroup` is not specified or false, [ClassGroup[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/classgroup/) if `bygroup` is true.
| Retrieves information on all object classes. 
Parameters: | `?objtype` - Object type ID. Filters the returned classes by object type. Only classes belonging to the object type are returned.
| `?bygroup` - If true, returns the object classes in class groups.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Item ID by GUID]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/classes/itemidbyguid/) | Retrieves the ID of a class with the given GUID. ]
[Object class]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/classes/id/) | Information on a single object class. 