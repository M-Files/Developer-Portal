---
layout: mfws
title: Workflow state transition IDs by alias
includeInSearch: 
minimumVersion: 12.0.6783.0
---

# Workflow state transition ID by alias

## /structure/statetransitions/itemidbyalias
{:.url-with-parameters}

Resolves one or more workflow state transition aliases to their IDs.
{:.description}

### POST
{:.method}

{:.method}
Input: | string[]
Output: | JSON object (see below)

This endpoint accepts an array of strings of workflow state transition aliases to resolve.  A sample request body is shown below:

```json
[
	"WorkflowStateTransitionAlias1",
	"WorkflowStateTransitionAlias2",
	"UnresolvedAlias"
]
```

This endpoint returns an object with a property for each provided alias with the value being the ID of the workflow state transition in the current vault that has that alias.  A sample response body is shown below:

```json
{
	"WorkflowStateTransitionAlias1" : 101,
	"WorkflowStateTransitionAlias2" : 102,
	"UnresolvedAlias" : -1
}
```

Aliases that could not be resolved will be returned as -1.
{:.remark}

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Workflow state transition ID from alias (single)](alias/) | Allows resolution of a single workflow state transition ID from its alias