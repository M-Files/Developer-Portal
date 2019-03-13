---
layout: mfws
title: Object type ID by alias
includeInSearch: true
minimumVersion: 12.0.6783.0
---

# Object type ID by alias

## /structure/objecttypes/itemidbyalias/(alias)
{:.url-with-parameters}

Resolves a single object type alias to its ID.
{:.description}

The alias should be URI-encoded.  If resolving multiple aliases, or your alias contains the character `\`, then it is recommended to use [/structure/objecttypes/itemidbyalias](../), or [/structure/metadatastructure/itemidbyalias](/APIs/REST-API/Reference/resources/structure/itemidbyalias/).
{:.remark}

### GET
{:.method}

{:.method}
Output: | int
| Returns the ID of object type with the given alias, or -1 if none could be found.

If multiple object types have the same alias then -1 will be returned.
{:.remark}