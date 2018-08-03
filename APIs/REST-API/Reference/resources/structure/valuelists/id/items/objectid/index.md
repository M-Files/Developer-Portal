---
layout: mfws
title: Value list item
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/valuelists/id/items/objectid.html"
---

# Value list item

## /valuelists/(id)/items/(objectid)
{:.url-with-parameters}

Single value list item information. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)
| Retrieves a single value list item information.

### DELETE
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Output: | [ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)
| Deletes a value list item. 

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Value list item title]({{ site.baseurl }}/APIs/REST-API/Reference/resources/valuelists/id/items/objectid/title/) | The title of a value list item. 
