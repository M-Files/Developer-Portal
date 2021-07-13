---
layout: mfws
title: Relationship count
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/relationships/count.html"
---

# Relationship count

## /objects/(type)/(objectid)/(version)/relationships/count
{:.url-with-parameters}

The count of the related objects. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | `int`
| Retrieves the amount of related objects.   
Parameters: | `?objtype` - Only returns related objects of a certain object type.
| `?direction` - Only returns related objects with the specified direction of relationship. `from` considers only the relationships specified on the current object.  `to` considers only the relationships originating from the related objects.  'both' is the default behaviour which considers both directions.
