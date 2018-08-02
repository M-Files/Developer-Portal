---
layout: mfws
title: Property definition ID by alias
includeInSearch: true
minimumVersion: 12.0.6783.0
---

# Property definition ID by alias

## /structure/properties/itemidbyalias/(alias)
{:.url-with-parameters}

Resolves a single property definition alias to its ID.
{:.description}

The alias should be URI-encoded.  If resolving multiple aliases, or your alias contains the character `\`, then it is recommended to use [/structure/properties/itemidbyalias](../), or [/structure/metadatastructure/itemidbyalias]({{ site.baseurl }}/APIs/REST-API/Reference/resources/structure/metadatastructure/itemidbyalias).
{:.remark}

### GET
{:.method}

{:.method}
Output: | int
| Returns the ID of property definition with the given alias, or -1 if none could be found.

If multiple property definitions have the same alias then -1 will be returned.
{:.remark}