---
layout: page
title: COM API Samples
includeInSearch: true
breadcrumb: COM API
noInnerLinks: true
---

Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.
{:.note.warning}

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples#readme), which focus on achieving specific tasks using our public APIs or Frameworks.

 Title | Source | Details
--- | --- | ---
 Search by Display Id | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SearchByDisplayId#readme) | An example of how to search using the "display id" (or "external id") of an object when using [External Object Type Data Sources]({{ site.baseurl }}/Built-In/External-Object-Type-Data-Source/).
 Segmented Search | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/COM%20API/SegmentedSearch#readme) | Searches executed using [SearchForObjectsbyConditions](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI%7EVaultObjectSearchOperations%7ESearchForObjectsByConditions.html) or [SearchForObjectsByConditionsEx](https://developer.m-files.com/APIs/COM-API/Reference/index.html#MFilesAPI%7EVaultObjectSearchOperations%7ESearchForObjectsByConditionsEx.html) are limited in the number of items that are returned, even if a maximum timeout is specified.  This sample executes a number of separate searches instead, separating the objects into "chunks" by their internal ID (e.g. searching for items with ID 1-999 first, then for items with ID 1000-1999, onwards).
{:.samples .com}

Segmented searching is an operation that can take significant time, and involves multiple API calls to the server.  Whilst there are valid scenarios where enumerating large volumes of data from M-Files is required, this approach should be used sparingly.
{:.note}