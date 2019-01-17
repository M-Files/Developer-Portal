---
layout: mfws
title: External source refresh
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/structure/objecttypes/type/refreshstatus.html"
---

# External source refresh

## /structure/objecttypes/(type)/refreshstatus
{:.url-with-parameters}

The refresh status for an external object type. 
{:.description}

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

This value can only be updated via a `PUT` request, and is akin to calling [VaultObjectTypeOperations.RefreshExternalObjectType](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectTypeOperations~RefreshExternalObjectType.html).  The request body should contain an integer to be converted to the [MFExternalDBRefreshType](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~MFExternalDBRefreshType.html) parameter; a request body containing `1` would execute a quick refresh, but a body containing `2` would execute a full refresh.

Note that this call simply initiates the refresh process, which could continue for several minutes depending on the data source and volume of content to synchronise.

{:.method}
Input: | [MFRefreshStatus]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfrefreshstatus/)
Output: | [MFRefreshStatus]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfrefreshstatus/)
| Sets the refresh status to either Full or Quick.