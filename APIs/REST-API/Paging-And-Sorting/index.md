---
layout: page
title: Paging and sorting object search results via the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Paging and Sorting
---

This page describes how to retrieve a large set of objects from the M-Files Web Service (MFWS) in a stable, well-defined order, one page at a time, using the `orderBy` and `pageToken` query parameters on the object search endpoints.

All MFWS REST resources are served under the `/REST/` path of the M-Files Classic Web site (e.g. `https://<server-host>/REST/<resource>`). If your Web Access is configured in a subdirectory then prefix that on all links, [as described on the REST API overview]({{ site.baseurl }}/APIs/REST-API/).
{:.note}

This capability is available in **M-Files 26.6 and later**.
{:.note}

## Why token-based paging

Historically the object search endpoints returned results in no guaranteed, stable order. The only way to control the volume of results was the [`limit` parameter]({{ site.baseurl }}/APIs/REST-API/Searching/#increasing-the-number-of-results), which caps how many objects come back but does not let you continue past that cap.

This made it unsafe to page through a large result set by asking for progressively larger result windows and slicing the tail on the client side: because the underlying order was not stable, objects near the boundary of one page could shift between requests, so a naive client could **skip some objects and receive others twice**. For a vault holding tens of thousands of objects, there was no reliable way to walk the whole set in order.

Token-based paging solves this. When you request `orderBy=id`, the server guarantees a total order across **all** matching results — not just within a single page — and hands back an opaque `NextPageToken` that you pass to the following request to resume exactly where the previous page ended. No objects are skipped or duplicated.

## Parameters

Add the following query parameters to a [`/objects/(type)`]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/type/) or [`/objects`]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/) search request:

Parameter | Description
--- | ---
`orderBy` | The sort order for the results. Use `orderBy=id` to sort by ascending object ID. This is what enables stable, gap-free paging across the entire result set. Required to obtain a `NextPageToken`.
`limit` | The page size — the maximum number of objects returned in a single response. Choose a value that returns quickly (see [page size guidance](#choosing-a-page-size)).
`pageToken` | The token that identifies the next page to return. Omit it on the first request; on each subsequent request, pass the `NextPageToken` value from the previous response.

The response is the usual [Results&lt;ObjectVersion&gt;]({{ site.baseurl }}/APIs/REST-API/Reference/structs/resultst/) structure, extended with a `NextPageToken` field:

Field | Description
--- | ---
`Items` | The objects on the current page.
`MoreResults` | `true` if further pages remain; `false` on the last page.
`NextPageToken` | The token to pass as `pageToken` on the next request. Absent or `null` once iteration is complete.

## Paging through all objects of a type

To iterate the whole result set, make the first request without a `pageToken`, then repeat the request passing the `NextPageToken` from the previous response as `pageToken`, until `MoreResults` is `false` (equivalently, until `NextPageToken` is absent or `null`).

```text
# Page 1 -- no pageToken
GET /REST/objects/0?orderBy=id&limit=500
{
  "Items": [ ... ],
  "MoreResults": true,
  "NextPageToken": "1234"
}

# Page 2 -- pass the token from the previous response
GET /REST/objects/0?orderBy=id&limit=500&pageToken=1234
{
  "Items": [ ... ],
  "MoreResults": true,
  "NextPageToken": "2789"
}

# Last page -- MoreResults is false and NextPageToken is absent/null
GET /REST/objects/0?orderBy=id&limit=500&pageToken=2789
{
  "Items": [ ... ],
  "MoreResults": false,
  "NextPageToken": null
}
```

Treat `NextPageToken` as **opaque**: do not parse it, construct it, or assume anything about its contents. Simply echo the value from the previous response back into the next request.
{:.note}

The same pattern works on the general [`/objects`]({{ site.baseurl }}/APIs/REST-API/Reference/resources/objects/) endpoint by supplying the object type as the `o` parameter, for example `/REST/objects?o=0&orderBy=id&limit=500`.

## Combining paging with search conditions

`orderBy=id` can be combined with many of the [search conditions]({{ site.baseurl }}/APIs/REST-API/Searching/) documented for the object endpoints, so you can page through a filtered result set in the same way. Supported combinations include, for example:

* All objects of a specific type — e.g. `GET /REST/objects/136?orderBy=id&limit=500`.
* Filtering by class.
* Filtering by other lookup properties, such as a customer or project reference — e.g. `GET /REST/objects/0?p1500=12345&orderBy=id&limit=500`.

Encode each search condition exactly as described on the [Searching page]({{ site.baseurl }}/APIs/REST-API/Searching/) and the [search-encoding reference]({{ site.baseurl }}/APIs/REST-API/Reference/syntax/#sect:search-encoding), then append `orderBy=id`, `limit`, and (from page two onwards) `pageToken`.

### Full-text (any-field) searches are not supported

`orderBy=id` is **not** compatible with full-text / any-field quick-search conditions (the `q` parameter). A request that combines an any-field condition with `orderBy=id` is rejected with **`HTTP 400`** and a "sorting not supported" error. If you need to page through a large result set in a stable order, express the filter using typed property and object-type conditions rather than a quick search.
{:.note.warning}

## Choosing a page size

`limit` sets the size of each page. Prefer a moderate page size (for example a few hundred up to `500`) and iterate with `pageToken`, rather than trying to pull the entire result set in one request by setting a very large `limit`.

Requesting an extremely large single page (for example `limit=30000`) is likely to hit the request timeout and fail. Token-based paging exists precisely so that arbitrarily large result sets can be retrieved reliably as a sequence of small, fast requests.
{:.note.warning}

## Quick test snippets

`curl`:

```text
curl "https://<server-host>/REST/objects/0?orderBy=id&limit=500"
# then repeat, appending &pageToken=<NextPageToken from the previous response>
```

PowerShell — walk every page of object type 0:

```text
$base  = 'https://<server-host>/REST/objects/0?orderBy=id&limit=500'
$token = $null
do {
    $url  = if ( $token ) { "$base&pageToken=$token" } else { $base }
    $page = Invoke-RestMethod $url
    $page.Items | ForEach-Object { $_ }   # process this page
    $token = $page.NextPageToken
} while ( $page.MoreResults )
```
