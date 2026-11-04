---
layout: mfws
title: Results&lt;T&gt;
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/resultst.html"
---

# Results&lt;T&gt;

Results of a query which might leave only a partial set of items. 

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`T[]` | Items | Contains results of a query 
`bool` | MoreResults | True if there were more results which were left out. 
`string` | NextPageToken | An opaque token identifying the next page of results, returned when paging with `orderBy=id`. Pass it back as the `pageToken` query parameter to retrieve the next page; absent or `null` once iteration is complete. See [Paging and sorting]({{ site.baseurl }}/APIs/REST-API/Paging-And-Sorting/). 
