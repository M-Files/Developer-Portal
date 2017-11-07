---
layout: mfws
title: Object class
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/classes/id.html"
---

# Object class

## /structure/classes/(id)
{:.url-with-parameters}

Information on a single object class. 
{:.description}

### GET
{:.method}

{:.method}
Output: | [ExtendedObjectClass]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectclass/)
| Retrieves information on an object class. 
Parameters: | `?include` - Comma separated list of additional data sets to return. Currently only `templates` is supported which will will cause the response to include a list of available templates available to the class.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Class icon]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/classes/id/icon/) |
