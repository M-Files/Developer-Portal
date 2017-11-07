---
layout: mfws
title: SessionInfo
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/sessioninfo.html"
---

# SessionInfo

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | AccountName
[MFACLMode](../../enumerations/mfaclmode) | ACLMode
[MFAuthType](../../enumerations/mfauthtype) | AuthenticationType
`bool` | CanForceUndoCheckout
`bool` | CanManageCommonUISettings
`bool` | CanManageCommonViews
`bool` | CanManageTraditionalFolders
`bool` | CanMaterializeViews
`bool` | CanSeeAllObjects
`bool` | CanSeeDeletedObjects
`bool` | InternalUser
`bool` | LicenseAllowsModifications
`int` | UserID

This is related to [the SessionInfo class](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~SessionInfo.html) in the COM API.
{:.remark}