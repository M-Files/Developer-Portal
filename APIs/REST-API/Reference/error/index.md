---
layout: mfws
title: Error reporting
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/error.html"
---

# Error reporting
{:#chpt:error}

Inevitably at some point there will be an error during one of the M-Files Web Service requests. When this happens, M-Files Web Service interrupts the request processing and responds with a 4xx or 5xx HTTP status code instead.

The HTTP status codes in the 4xx and 5xx range indicate an error during the request. If the error happened inside M-Files Web Service, the error description is included in the HTTP response body as a [WebServiceError]({{ site.baseurl }}/APIs/REST-API/Reference/structs/WebServiceError) object. The object contains `Message` property which should provide more information on the error.


The message property in the `WebServiceError` departs from the traditional M-Files error reporting familiar from M-Files API. In M-Files API, especially for argument errors, the range of different error messages is quite small. This makes it possible to localize all the error messages but it also results in less specific messages. M-Files Web Service contains more specific error messages at the cost of localization.
{:.remark}

`WebServiceError` also contains the original stack trace from the server. This stack trace is valuable if there is ever a need to contact M-Files support.


The returned JSON also contains `ErrorCode` property. Do not use this for anything. The information in this property is wrong and the property will be changed in future M-Files versions.
{:.remark}
