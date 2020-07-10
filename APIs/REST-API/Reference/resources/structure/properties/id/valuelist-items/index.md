---
layout: mfws
title: Property definition value list items
includeInSearch: true
---

# Property definition

## /structure/properties/(id)/valuelist/items
{:.url-with-parameters}

Only valid for property definitions based on object types.  Filters returned data as configured by the property definition.
{:.description}

### GET
{:.method}

{:.method}
Output: | [ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)[]
| Valid objects to be shown within this property.
| Retrieves value list item information. 
Parameters:  | `?filter` - Filter using name. Supports wildcards.
| `?limit` - The number of items to return.  Defaults to `500`.
