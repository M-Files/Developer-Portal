---
layout: mfws
title: Workflow ID by alias
includeInSearch: true
---

# Workflow ID by alias

## /structure/workflows/itemidbyalias/(alias)
{:.url-with-parameters}

Resolves a single workflow alias to its ID.
{:.description}

The alias should be URI-encoded.  If resolving multiple aliases, or your alias contains the character `\`, then it is recommended to use [/structure/workflows/itemidbyalias](../), or [/structure/metadatastructure/itemidbyalias](../../../metadatastructure/itemidbyalias).
{:.remark}

### GET
{:.method}

{:.method}
Output: | int
| Returns the ID of workflow with the given alias, or -1 if none could be found.

If multiple workflows have the same alias then -1 will be returned.
{:.remark}