---
layout: mfws
title: RepositoryAuthenticationStatus
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/repositoryauthenticationstatus.html"
---

# RepositoryAuthenticationStatus

Structure defining one external repository authentication status.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | AccountName | Account name used for authentication.
[MFExtensionAuthenticationSpecialUserType](https://www.m-files.com/api/documentation/index.html#MFilesAPI~MFExtensionAuthenticationSpecialUserType.html) | ExtensionAuthenticationSpecialUserType | User type used in authentication.
`string` | TargetID | ID of the target repository.
`int` | UserID | ID of the authenticated M-Files user.