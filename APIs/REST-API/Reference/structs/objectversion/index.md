---
layout: mfws
title: ObjectVersion
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/objectversion.html"
---

# ObjectVersion

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`DateTime` | AccessedByMeUtc
`DateTime` | CheckedOutAtUtc
`int` | CheckedOutTo
`string` | CheckedOutToUserName
`int` | Class
`DateTime` | CreatedUtc
`bool` | Deleted
`string` | DisplayID
[ObjectFile[]](../objectfile) | Files
`bool` | HasAssignments
`bool` | HasRelationshipsFromThis
`bool` | HasRelationshipsToThis
`bool` | IsStub
`DateTime` | LastModifiedUtc
`bool` | ObjectCheckedOut
`bool` | ObjectCheckedOutToThisUser
[MFObjectVersionFlag](../../enumerations/mfobjectversionflag) | ObjectVersionFlags
[ObjVer](../objver) | ObjVer
`bool` | SingleFile
`bool` | ThisVersionLatestToThisUser
`string` | Title
`bool` | VisibleAfterOperation

This is related to [the ObjectVersion class](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersion.html) in the COM API.
{:.remark}