---
layout: mfws
title: Object type icon
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/objecttypes/type/icon.html"
---

# Object type icon

## /structure/objecttypes/(type)/icon
{:.url-with-parameters}

Retrieves the icon for a single object type.
{:.description}

### GET
{:.method}

{:.method}
Output: | Stream: `application/png`
| Retrieves the object type icon. 
Parameters: | `?size` - Icon dimension. Default is 16.

The icons supports only certain sizes and the real size on the received icon in the response might differ from the specified size. 
{:.remark}