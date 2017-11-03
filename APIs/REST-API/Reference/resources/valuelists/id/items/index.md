---
layout: mfws
title: Value list items
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/valuelists/id/items.html"
---

# Value list items

## /valuelists/(id)/items
{:.url-with-parameters}

Collection of value list items for a single value list. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [Results]({{ site.baseurl }}/APIs/REST-API/Reference/structs/resultst/)<[ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)>
| Retrieves value list item information. 
Parameters:  | `?propertydef` - Filters the items using the filter defined on the property definition.
| `?pN` - Filter items using defined property ID and its value. See search conditions.
| `?parent` - Filters items by parent item.
| `?owner` - Filters items by owner item.
| `?name` - Filter using name. Supports wildcards.
| `?page` - Retrieves only one page. Default page size is 100.
| `?pagesize` - Defines page size. If page size is defined, retrieve only one page, default to first.

### POST
{:.method}

{:.method}
Input: | [ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)
Output: | [ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)
| Creates a new value list item in the value list. 

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Value list item]({{ site.baseurl }}/APIs/REST-API/Reference/resources/valuelists/id/items/objectid/) | Single value list item information. 
