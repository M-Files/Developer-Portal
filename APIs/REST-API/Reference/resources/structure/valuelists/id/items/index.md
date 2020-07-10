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
| `?limit` - The number of items to return.  Defaults to `500`.
| `?filterItem` - See below
| `?conditionType` - One of the following values: `1` = "Equal to", `2` = "Not equal to", `3` = "Greater than", `4` = "Less than".

The `filterItem` querystring parameter can be used to filter a sub-value-list by parents.  The value of the querystring parameter should be the ID of the parent value list followed by a colon followed by a comma-separated list of IDs to filter by.  For example:

* `/REST/valuelists/160/items?filterItem=159:1,2` - here the value list with ID 160 is `States` and the value list with ID 159 is `Countries`.  If the country with ID 1 is the United States and country with ID 2 is the United Kingdom, the returned value list items would only contain states of the United States and the United Kingdom.  `States` must be defined as a sublist of `Countries` for this to work.

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
[Value list item]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/valuelists/id/items/objectid/) | Single value list item information. 
