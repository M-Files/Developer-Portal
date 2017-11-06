---
layout: mfws
title: Value list item title
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/valuelists/id/items/objectid/title.html"
---

# Value list item title

## /valuelists/(id)/items/(objectid)/title
{:.url-with-parameters}

The title of a value list item. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | `string`
| Retrieves the value list item title. 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the _method, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | `string`
Output: | [ValueListItem]({{ site.baseurl }}/APIs/REST-API/Reference/structs/valuelistitem/)
| Changes the value list item title. 
