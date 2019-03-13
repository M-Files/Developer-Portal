---
layout: mfws
title: Workflow ID by alias
includeInSearch: true
minimumVersion: 12.0.6783.0
---

# Workflow state transition ID by alias

## /structure/statetransitions/itemidbyalias/(alias)
{:.url-with-parameters}

Resolves a single workflow state transition alias to its ID.
{:.description}

The alias should be URI-encoded.  If resolving multiple aliases, or your alias contains the character `\`, then it is recommended to use [/structure/statetransitions/itemidbyalias](../), or [/structure/metadatastructure/itemidbyalias]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/itemidbyalias/).
{:.remark}

### GET
{:.method}

{:.method}
Output: | int
| Returns the ID of workflow state transition with the given alias, or -1 if none could be found.

If multiple workflow state transitions have the same alias then -1 will be returned.
{:.remark}