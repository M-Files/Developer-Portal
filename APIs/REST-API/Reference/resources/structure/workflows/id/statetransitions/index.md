---
layout: mfws
title: Workflow state transitions
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/workflows/id/statetransitions.html"
---

# Workflow state transitions

## /structure/workflows/(id)/statetransitions
{:.url-with-parameters}

Valid state transitions in the selected workflow.
{:.description}

### GET
{:.method}

{:.method}
Output: | [WorkflowState[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/workflowstate/)
| Retrieves information on valid state transitions in the current workflow.
Parameters: | `?currentstate` - `null` or state ID. Restricts the list of returned states to those that are available as valid states from the current state.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[State transition ID from alias (multiple)](itemidbyalias/) | Allows resolution of one or more workflow state transition IDs from their aliases.