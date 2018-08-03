---
layout: mfws
title: ExceptionInfo
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/exceptioninfo.html"
---

# ExceptionInfo

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | Message | The raw error message. 
[ExceptionInfo](.) | InnerException | Underlying error that caused this one. 
[StackTraceElement[]](../stacktraceelement/) | Stack | M-Files Web Service server-side stack trace. 