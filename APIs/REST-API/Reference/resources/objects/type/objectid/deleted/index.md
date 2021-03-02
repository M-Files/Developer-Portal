---
layout: mfws
title: Deleted
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/deleted.html"
---

# Deleted

## /objects/(type)/(objectid)/deleted
{:.url-with-parameters}

Resource representing the Deleted-state of an object. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | `bool`
| Retrieves the deleted status of the object.

### PUT
{:.method}

{:.method}
Input: | `bool`
Output: | [ObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Sets the deleted status of the object. 

The deleted status is tracked by the Deleted property and this resource is provided as a convenient access to that. It is still possible to read that property directly using [/objects/(type)/(objectid)/(version)/properties]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/) or similar resource. 
{:.remark}