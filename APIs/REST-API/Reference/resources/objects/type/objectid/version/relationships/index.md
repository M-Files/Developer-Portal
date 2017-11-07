---
layout: mfws
title: Relationships
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/relationships.html"
---

# Relationships

## /objects/(type)/(objectid)/(version)/relationships
{:.url-with-parameters}

A collection of related objects. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectVersion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/) or [Lookup]({{ site.baseurl }}/APIs/REST-API/Reference/structs/lookup/)
| Retrieves related objects.  
Parameters: | `?objtype` - Only returns related objects of a certain object type.
| `?direction` - Only returns related objects with the specified direction of relationship. `from` considers only the relationships specified on the current object.  `to` considers only the relationships originating from the related objects.  'both' is the default behaviour which considers both directions.
| `?type` - Specifies the response type. `lookup` will make the response to be serialized as [Lookup]({{ site.baseurl }}/APIs/REST-API/Reference/structs/lookup/) while the default `objectversion` will result in the response being serialized as [ObjectVersion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/).

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Relationship count]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/relationships/count/) | The count of the related objects. 
