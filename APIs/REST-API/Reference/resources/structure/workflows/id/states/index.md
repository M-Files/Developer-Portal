---
layout: mfws
title: Workflow states
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/workflows/id/states.html"
---

# Workflow states

## /structure/workflows/(id)/states
{:.url-with-parameters}

Collection of states under a single workflow. 
{:.description}

### GET
{:.method}

{:.method}
Output: | [WorkflowState[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/workflowstate/)
| Retrieves information on all workflow states of the given workflow. 
Parameters: | `?currentstate` - `null` or state ID. Restricts the list of returned states to those that are available as valid states from the current state.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Workflow state]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/workflows/id/states/id/) | Information on a single workflow state. 
[Workflow state ID from alias (multiple)](itemidbyalias/) | Allows resolution of one or more workflow state IDs from their aliases.