---
layout: mfws
title: Object type IDs by alias
includeInSearch: true
---

# Object type ID by alias

## /structure/objecttypes/itemidbyalias
{:.url-with-parameters}

Resolves one or more object type aliases to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of object type aliases to resolve.  A sample request body is shown below:

```json
[
	"ObjectTypeAlias1",
	"ObjectTypeAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the object type in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"ObjectTypeAlias1" : 101,
	"ObjectTypeAlias2" : 102,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Object type ID from alias (single)](alias/) | Allows resolution of a single object type ID from its alias