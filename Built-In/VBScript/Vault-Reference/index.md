---
layout: page
title: The Vault Reference (VBScript)
includeInSearch: true
breadcrumb: Vault Reference
---

When connecting using the [COM API]({{ site.baseurl }}/APIs/COM-API), you must use a [client connection]({{ site.baseurl }}/APIs/COM-API/Connecting-And-Authenticating/#creating-a-client-connection) or [server connection]({{ site.baseurl }}/APIs/COM-API/Connecting-And-Authenticating/#creating-a-server-connection) to connect to the server and retrieve a vault reference.  When using VBScript a reference to the current vault is [automatically provided via the `Vault` VBScript variable](https://www.m-files.com/user-guide/latest/eng/Variables.html).

## Using the vault reference

The `Vault` reference is the primary method of interacting with contents of an M-Files vault.  It is an instance of the [Vault COM API class](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~Vault.html).  The `Vault` reference is a transactional reference, meaning any modifications to the vault contents done during the VBScript running will be rolled back in the case of exceptions being raised by the code.

The `Vault` reference is typically used to [search for objects]({{ site.baseurl }}/APIs/COM-API/Searching/), [create new objects]({{ site.baseurl }}/APIs/COM-API/Creating-Objects/), or [alter existing objects]({{ site.baseurl }}/APIs/COM-API/Updating-Objects/).

## Auditing

[Special consideration]({{ site.baseurl }}/Built-In/VBScript/Audit-Trail-And-Scripting/) should be given to operations that could affect the current object's audit trail (e.g. setting the current object's properties).

## Security

It is important to note that the `Vault` reference provided within VBScript is connected to the M-Files server as an internal administrative user.  Any operations executed against the vault using this reference will not respect the current user's permissions.  
{:.note.warning}

The current user's ID is available via the `CurrentUserID` VBScript variable.  The [current user's session information](https://www.m-files.com/api/documentation/latest/MFilesAPI~SessionInfo.html) is available via `Vault.SessionInfo`.  Search results can be [filtered by user permissions](){{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#restricting-the-search-results-by-user-permissions) if needed.

## Vault Application Framework

The Vault Application Framework has its own page on the [Vault reference]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Vault-Reference) providing additional relevant information to interacting with the vault via the Vault Application Framework.