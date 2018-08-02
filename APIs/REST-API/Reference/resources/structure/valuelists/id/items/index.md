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
Parameters:  | `?filter` - Filter using name. Supports wildcards.
| `?filterItem` - A collection of value list IDs (comma-separated).  Returns only items with these IDs.
| `?conditionType` - One of the following values: `1` = "Equal to", `2` = "Not equal to", `3` = "Greater than", `4` = "Less than".

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
