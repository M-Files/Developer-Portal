---
layout: mfws
title: Value list IDs by alias
includeInSearch: 
minimumVersion: 12.0.6783.0
---

# Value list ID by alias

## /structure/valuelists/itemidbyalias
{:.url-with-parameters}

Resolves one or more value list aliases to their IDs.
{:.description}

This endpoint resolved value lists, not value list items.
{:.remark}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of value list aliases to resolve.  A sample request body is shown below:

```json
[
	"ValueListAlias1",
	"ValueListAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the value list in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"ValueListAlias1" : 101,
	"ValueListAlias2" : 102,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Value List ID from alias (single)](alias/) | Allows resolution of a single value list ID from its alias