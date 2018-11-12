---
layout: mfws
title: Workflow IDs by alias
includeInSearch: 
minimumVersion: 12.0.6783.0
---

# Workflow ID by alias

## /structure/workflows/itemidbyalias
{:.url-with-parameters}

Resolves one or more workflow aliases to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of workflow aliases to resolve.  A sample request body is shown below:

```json
[
	"WorkflowAlias1",
	"WorkflowAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the workflow in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"WorkflowAlias1" : 101,
	"WorkflowAlias2" : 102,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Workflow ID from alias (single)](alias/) | Allows resolution of a single workflow ID from its alias