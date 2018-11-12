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

{:.method}
Input: | [MFRefreshStatus]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfrefreshstatus/)
Output: | [MFRefreshStatus]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfrefreshstatus/)
| Sets the refresh status to either Full or Quick.