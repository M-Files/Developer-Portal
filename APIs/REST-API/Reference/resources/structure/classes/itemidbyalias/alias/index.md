---
layout: mfws
title: Object class ID by alias
includeInSearch: true
---

# Object class ID by alias

## /structure/classes/itemidbyalias/(alias)
{:.url-with-parameters}

Resolves a single object class alias to its ID.
{:.description}

The alias should be URI-encoded.  If resolving multiple aliases, or your alias contains the character `\`, then it is recommended to use [/structure/classes/itemidbyalias](../), or [/structure/metadatastructure/itemidbyalias](../../../metadatastructure/itemidbyalias).
{:.remark}

### GET
{:.method}

{:.method}
Output: | int
| Returns the ID of object class with the given alias, or -1 if none could be found.

If multiple object classes have the same alias then -1 will be returned.
{:.remark}