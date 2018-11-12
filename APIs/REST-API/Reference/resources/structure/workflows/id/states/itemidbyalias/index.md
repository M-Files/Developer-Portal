---
layout: mfws
title: Workflow state IDs by alias
includeInSearch: 
minimumVersion: 12.0.6783.0
---

# Workflow state IDs by alias

## /structure/workflowstates/itemidbyalias
{:.url-with-parameters}

Resolves one or more workflow state aliases to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of workflow state aliases to resolve.  A sample request body is shown below:

```json
[
	"WorkflowStateAlias1",
	"WorkflowStateAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the workflow state in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"WorkflowStateAlias1" : 101,
	"WorkflowStateAlias2" : 102,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Workflow state ID from alias (single)](alias/) | Allows resolution of a single workflow state ID from its alias