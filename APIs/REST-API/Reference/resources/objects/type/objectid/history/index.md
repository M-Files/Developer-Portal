---
layout: mfws
title: History
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/history.html"
---

# History

## /objects/(type)/(objectid)history
{:.url-with-parameters}

Resource listing the full object version history. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectVersion[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectversion/)
| Retrieves all the available versions of the object.

The use of this resource is recommended over just traversing through all the possible versions between 1 and the latest one. Some of these versions might be deleted for various reasons which makes them unavailable. This resource retrieves only the available versions. 
{:.remark}