---
layout: mfws
title: Class icon
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/classes/id/icon.html"
---

# Class icon

## /structure/classes/(id)/icon
{:.url-with-parameters}

Retrieves the icon for a single class.
{:.description}

### GET
{:.method}

{:.method}
Output: | Stream: `application/png`
| Retrieves the object class icon. 
Parameters: | `?size` - Icon dimension. Default is 16.

The icons supports only certain sizes and the real size on the received icon in the response might differ from the specified size. 
{:.remark}