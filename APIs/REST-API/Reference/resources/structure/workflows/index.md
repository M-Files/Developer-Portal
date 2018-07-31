---
layout: mfws
title: Workflows
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/workflows.html"
---

# Workflows

## /structure/workflows
{:.url-with-parameters}

Collection of workflows. 
{:.description}

### GET
{:.method}

{:.method}
Output: | [Workflow[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/workflow/)
| Retrieves information on all workflows. 

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Workflow]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/workflows/id/) | Information on a single workflow. 
[Workflow ID from alias (multiple)](itemidbyalias/) | Allows resolution of one or more workflows IDs from their aliases.