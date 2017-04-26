---
layout: page
title: ObjVerEx
---

## Overview

`ObjVerEx` is contained in the `MFiles.VAF.Common` namespace, is returned by [MFSearchBuilder's FindEx and FindOneEx methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/), and provides helper methods for working with an object, its properties and history.  Broadly, `ObjVerEx` wraps access to an [ObjectVersion](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersion.html) and the associated [PropertyValues](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html), as well as providing other convenience methods.

This document does not detail all members.

## ObjectVersion information

An in-memory copy of the object's [ObjectVersion](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersion.html) can be accessed via `ObjVerEx.Info`.

## Properties

An in-memory copy of the object's [PropertyValues](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValues.html) can be accessed via `ObjVerEx.PropertyValues`, which is [lazy-loaded](https://en.wikipedia.org/wiki/Lazy_loading) as required.

### SetProperty vs SaveProperty

`ObjVerEx` exposes a number of convenience methods for working with [PropertyValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~PropertyValue.html)s on objects.  It is important to note, though, that the function of `SetProperty` is very different to the function of `SaveProperty`.

`SetProperty` updates a property value *in memory only*.  The change is not persisted to the M-Files server unless `SaveProperties` is also called.  This means that the call to `SetProperty` is very fast, and all changes to the object can be saved with one atomic call to `SaveProperties`.

`SaveProperty` updates a property value both in memory *and* on the M-Files server.  Multiple calls to `SaveProperty` are discouraged as this will result in many calls back and forth to the server, which will adversely affect performance.  Instead, call `SetProperty` multiple times, then call `SaveProperties` once all changes have been made.

<p class="note">SaveProperties will deal with calling <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~SetAllProperties.html">SetAllProperties</a> or <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~SetProperties.html">SetProperties</a> in the API as appropriate, depending on whether the class of the object is specified in the change set.</p>

### SetCreatedBy and SetModifiedBy

`SetCreatedBy` offers a shortcut mechanism to calling [SetCreationInfoAdmin](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~SetCreationInfoAdmin.html), allowing a user ID to be passed rather than a [TypedValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~TypedValue.html).

`SetModifiedBy` offers a shortcut mechanism to calling [SetLastModificationInfoAdmin](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectPropertyOperations~SetLastModificationInfoAdmin.html), allowing a user ID to be passed rather than a [TypedValue](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~TypedValue.html).

### SetWorkflowState

`SetWorkflowState` sets the workflow and state of an object by affecting the in-memory `PropertyValues` collection.  Both the workflow and state are optional, but at least one must be supplied.  If the workflow is not provided then it will be looked up from the state.  If the state is not provided then the first state on the workflow will be used.

<p class="note">You must call SaveProperties after calling this method for the changes to be persisted.</p>

### Property helper methods

There are a variety of helper methods available that aid working with properties:

* `AddLookup` - adds a lookup item to the `PropertyValues` collection.
* `GetLookupID` - retrieves the ID of the item in the lookup, or -1 if the lookup is not found.
* `GetLookups` - retrieves the property values as lookups, or an empty [Lookups](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~Lookups.html) collection if the property is not found.
* `SetLookup` - sets the supplied lookup value as the only value of the specified property in the `PropertyValues` collection.
* `RemoveLookup` - removes a single lookup from the specified property value in the `PropertyValues` collection.
* `RemoveProperty` - removes a property value from the `PropertyValues` collection.

<p class="note">You must call SaveProperties after using these methods for the changes to be persisted.</p>

* `HasProperty` - returns whether the `PropertyValues` collection contains an entry for the supplied property definition.  Does not check the value.
* `HasValue` - 
* `HasPropertyFlag` - returns whether the `PropertyValues` collection contains an entry for the supplied property definition, and checks that the property value has a value.
* `HasClass` - returns whether the supplied class matches the class of the current object.
* `GetProperty` - returns the `PropertyValue` for the provided property definition from the `PropertyValues` collection.  Returns null if not found.
* `GetPropertyText` - returns the current property value of the supplied property, to be displayed to the user.
* `GetDirectReferences` - creates `ObjVerEx` objects for each non-deleted item referenced by the provided multi-select lookup property.
* `GetAllDirectReferences` - creates `ObjVerEx` objects for all items (including deleted) referenced by the provided multi-select lookup property.
* `GetIndirectReferences` - creates `ObjVerEx` objects for all items (including deleted) that referencethe current on, optionally using a specific property.

<p class="note warning">Calling GetIndirectReferences will execute a search against the M-Files vault.</p>

## History

An in-memory representation of the object's history can be accessed via `ObjVerEx.History`, which is [lazy-loaded](https://en.wikipedia.org/wiki/Lazy_loading) as required.  The values in this collection will order from latest (first) to oldest (last).

### Rolling back

An object can be rolled back by calling `ObjVerEx.Rollback`, and providing it with the version ID to roll back to.  An optional comment can be provided if needed.

## Working with files

* `ReplaceFiles` - replaces the current files on an object with the ones supplied.

<p class="note">If an object is currently a <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersion~SingleFile.html">Single File Document</a> then it must be changed to a <a href="https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~SetSingleFileObject.html">multi-file-document</a> before calling ReplaceFiles with multiple documents.</p>

## Permissions

An in-memory representation of the [object's permissions](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjectVersionPermissions.html) can be accessed via `ObjVerEx.History`, which is [lazy-loaded](https://en.wikipedia.org/wiki/Lazy_loading) as required.

## Helper Functions

### Checking in and out

* `CheckIn` - checks in the object version, setting the version comment and last modified user details as appropriate.
* `CheckOut` - checks out the object.
* `ForceUndoCheckout` - forces the undo of the checkout of the object.
* `StartRequireCheckedOut` - checks out the object if it isn't already.  Ensure that `EndRequireCheckout` is called once operations requiring the object being checked out are complete.
* `EndRequireCheckedOut` - checks in the object if a previous call to `StartRequireCheckedOut` checked it out.

### Deletion and Destruction

* `Delete` - [deletes the underlying M-Files object](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~DeleteObject.html).
* `Destroy` - [destroys the underlying M-Files object](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~DestroyObject.html).

<p class="note warning">Destruction of objects cannot be undone.</p>

### Testing user permissions

* `CanCurrentUserDelete` - returns true if the current user can delete the current object version.
* `CanCurrentUserEdit` - returns true if the current user can edit the current object version.
* `CanCurrentUserRead` - returns true if the current user can see/read the current object version.

### ExpandPlaceholderText

The `ExpandPlaceholderText` method can be used to easily parse a string containing [notification placeholders](http://www.m-files.com/user-guide/latest/eng/#Notifications.html#personalizing_notification_messages) and replace them with the current values.  Supported placeholders include:

* %OBJID% - the current object ID and type.
* %OBJVER% - the current object ID, type and version.
* %MFILESURL% - a URL to the current M-Files object (starting m-files://).
* %OBJNAME% - the name of the current object type (singular).
* %PROPERTY_123% - the value of property 123 on the current object.
* %PROPERTY_{MyPropertyDefinition}% - the value of the property with alias "MyPropertyDefinition" on the current object.

<p class="note">Not all placeholders are supported.</p>
