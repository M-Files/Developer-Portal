---
layout: mfws
title: Value list ID by alias
includeInSearch: true
minimumVersion: 12.0.6783.0
---

# Value list ID by alias

## /structure/valuelists/itemidbyalias/(alias)
{:.url-with-parameters}

Resolves a single value list alias to its ID.
{:.description}

The alias should be URI-encoded.  If resolving multiple aliases, or your alias contains the character `\`, then it is recommended to use [/structure/valuelists/itemidbyalias](../), or [/structure/metadatastructure/itemidbyalias]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/metadatastructure/itemidbyalias).
{:.remark}

### GET
{:.method}

{:.method}
Output: | int
| Returns the ID of value list with the given alias, or -1 if none could be found.

If multiple value lists have the same alias then -1 will be returned.
{:.remark}