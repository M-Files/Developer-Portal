---
layout: mfws
title: WebServiceError
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/webserviceerror.html"
---

# WebServiceError

M-Files Web Service error object. 

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
int | Status | HTTP Status code 
`string` | URL | The request URL which caused this error. 
`string` | Method | The request method. 
[ExceptionInfo](../exceptioninfo) | Exception | Detailed information on the exception. 
