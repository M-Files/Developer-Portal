---
layout: mfws
title: Property definition IDs by alias
includeInSearch: true
---

# Property definition ID by alias

## /structure/properties/itemidbyalias
{:.url-with-parameters}

Resolves one or more property definition aliases to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of property definition aliases to resolve.  A sample request body is shown below:

```json
[
	"PropertyAlias1",
	"PropertyAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the property definition in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"PropertyAlias1" : 873,
	"PropertyAlias2" : 432,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Property definition ID from alias (single)]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/properties/itemidbyalias/alias/) | Allows resolution of a single property definition ID from its alias