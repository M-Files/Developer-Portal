---
layout: mfws
title: MFCheckOutStatus
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html"
---

# MFCheckOutStatus

## Values

{:.enum.table}
Value | Member | Description
--- | --- | ---
0 | CheckedIn | Object is checked in. 
1 | CheckedOut | Object is checked out to someone else. 
2 | CheckedOutToMe | Object is checked out to the current user. 

`value == CheckedOut` will not evaluate to true if the object is checked out to the current user. If it doesn't matter whom the object is checked out to, use `value != CheckedIn` instead.
{:.remark}