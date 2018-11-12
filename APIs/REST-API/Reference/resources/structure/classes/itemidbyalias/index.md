---
layout: mfws
title: Object class IDs by alias
includeInSearch: true
minimumVersion: 12.0.6783.0
---

# Object class ID by alias

## /structure/classes/itemidbyalias
{:.url-with-parameters}

Resolves one or more object class aliases to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of object class aliases to resolve.  A sample request body is shown below:

```json
[
	"ClassAlias1",
	"ClassAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the object class in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"ClassAlias1" : 101,
	"ClassAlias2" : 102,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Object class ID from alias (single)](alias/) | Allows resolution of a single object class ID from its alias