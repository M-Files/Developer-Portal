---
layout: page
title: Objects and Versions
includeInSearch: true
---

Items stored within an M-Files vault - aside from value lists - are considered `Objects`.  Each document stored to M-Files is an object.  Each project - if a vault is configured to store projects - is an object.  Each object is of a specific [object type](../Vault-Structure/#object-types) and [../Vault-Structure/class](#classes), and has a series of [property values](../Vault-Structure/#property-values) which together make up its metadata.  Some objects contain files (e.g. documents) and some objects do not.

Whenever the metadata or files of an object are altered, M-Files automatically creates a new `Object Version`.  These versions can be seen by viewing the object's history.  In order to maintain this audit trail, M-Files uses a process whereby an object is checked out, altered, then checked in.  [Objects can only be checked out by one person at a time](https://www.m-files.com/user-guide/latest/eng/Why_cant_I_edit_a_document_that_has_been_checked_out.html?hl=check%2Cout).

## Object history

For changes that may take some time (e.g. editing a file), M-Files may prompt the user to [check out the object](https://www.m-files.com/user-guide/latest/eng/Check_out.html?hl=check%2Cout).  No other user can make alterations to this object until it is [checked back in](https://www.m-files.com/user-guide/latest/eng/Check_in.html), the [checkout is discarded](https://www.m-files.com/user-guide/latest/eng/Undo_checkout.html), or an administrator overrides the checkout.

For smaller, atomic, changes, M-Files will often perform the check out and in transparently for the user.  This can be seen by finding an object and altering its metadata: when clicking the `Save` button, M-Files will check out the object, persist the changes, then check it back in again.

Any operation that alters the object's metadata or files causes a new version to be created, including moving items through workflows.
{:.note}

![Viewing an object's history](/Built-In/VBScript/Audit-Trail-And-Scripting/history-fixed.png)

## API objects

### ObjID

The [ObjID](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjID.html) class represents a single object in the M-Files vault.  The combination of the `Type` (the internal ID of the object type) and the `ID` (the M-Files [internal ID](../InternalAndExternalIDs)) uniquely identify an object in the system.  The `ObjID` is used to reference items when the version is not important, such as for checking out an object.

### ObjVer

The [ObjVer](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjVer.html) class represents a specific version of a single object in the M-Files vault.  The combination of the `Version` number (always a positive integer, starting at 1), the `Type` and the `ID` uniquely identify a specific version of an object in the system.  The `ObjVer` is used to reference items when the version is important, such as loading the property values that were on a specific object version.