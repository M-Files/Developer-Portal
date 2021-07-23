---
layout: page
title: The Event Handler attribute in the Vault Application Framework
includeInSearch: true
breadcrumb: Event Handlers
---

The `EventHandlerAttribute` attribute marks the following method to be executed when a specific M-Files event occurs.  Almost all document vault events can be handled.  Information about the object being processed (e.g. being checked in) is available in `env.ObjVer` and `env.ObjVerEx`, if appropriate.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCheckInChanges)]
public void MyEventHandler(EventHandlerEnvironment env)
{
}
```

The event handler type is included in the attribute declaration.  Other values can also be passed, such as the alias of the object type or class of object that this code should run for, if applicable.
{:.note}

## MFEventHandlerType

Almost all vault-related events can be subscribed to from within a Vault Application Framework event handler.  This value is passed to the attribute when it is declared; in the sample above, this code would be executed before changes to an item were checked in.  Below is a full list of the values in the `MFEventHandlerType` enumeration.

```csharp
public enum MFEventHandlerType
{
    MFEventHandlerTypeUndefined,
    MFEventHandlerBeforeSetProperties,
    MFEventHandlerAfterSetProperties,
    MFEventHandlerAfterCreateNewObjectFinalize,
    MFEventHandlerBeforeCheckInChanges,
    MFEventHandlerAfterCheckInChanges,
    MFEventHandlerBeforeCheckOut,
    MFEventHandlerAfterCheckOut,
    MFEventHandlerBeforeCancelCheckout,
    MFEventHandlerAfterCancelCheckout,
    MFEventHandlerBeforeDeleteObject,
    MFEventHandlerAfterDeleteObject,
    MFEventHandlerBeforeDestroyObject,
    MFEventHandlerAfterDestroyObject,
    MFEventHandlerBeforeSetObjectPermissions,
    MFEventHandlerAfterSetObjectPermissions,
    MFEventHandlerBeforeFileUpload,
    MFEventHandlerAfterFileUpload,
    MFEventHandlerBeforeFileDownload,
    MFEventHandlerAfterFileDownload,
    MFEventHandlerBeforeCreateNewValueListItem,
    MFEventHandlerAfterCreateNewValueListItem,
    MFEventHandlerBeforeLoginToVault,
    MFEventHandlerAfterLoginToVault,
    MFEventHandlerBeforeLogoutFromVault,
    MFEventHandlerAfterLogoutFromVault,
    MFEventHandlerBeforeRunScheduledJob,
    MFEventHandlerAfterRunScheduledJob,
    MFEventHandlerBeforeCreateNewObjectFinalize,
    MFEventHandlerBeforeCancelCreateObject,
    MFEventHandlerAfterCancelCreateObject,
    MFEventHandlerBeforeDestroyObjectVersion,
    MFEventHandlerAfterDestroyObjectVersion,
    MFEventHandlerReplication_AfterCreateNewObjectFinalize,
    MFEventHandlerReplication_AfterCheckInChanges,
    MFEventHandlerVaultExtensionMethod,
    MFEventHandlerBeforeCreateLoginAccount,
    MFEventHandlerAfterCreateLoginAccount,
    MFEventHandlerBeforeModifyLoginAccount,
    MFEventHandlerAfterModifyLoginAccount,
    MFEventHandlerBeforeRemoveLoginAccount,
    MFEventHandlerAfterRemoveLoginAccount,
    MFEventHandlerBeforeCreateUserAccount,
    MFEventHandlerAfterCreateUserAccount,
    MFEventHandlerBeforeModifyUserAccount,
    MFEventHandlerAfterModifyUserAccount,
    MFEventHandlerBeforeRemoveUserAccount,
    MFEventHandlerAfterRemoveUserAccount,
    MFEventHandlerBeforeCreateUserGroup,
    MFEventHandlerAfterCreateUserGroup,
    MFEventHandlerBeforeModifyUserGroup,
    MFEventHandlerAfterModifyUserGroup,
    MFEventHandlerBeforeRemoveUserGroup,
    MFEventHandlerAfterRemoveUserGroup,
    MFEventHandlerAfterBringOnline,
    MFEventHandlerBeforeTakeOffline,
    MFEventHandlerAfterCheckInChangesFinalize,
    MFEventHandlerAfterBeginTransaction,
    MFEventHandlerBeforeCommitTransaction,
    MFEventHandlerBeforeRollbackTransaction,
    MFEventHandlerAfterCancelCheckoutFinalize,
    MFEventHandlerBeforeUndeleteObject,
    MFEventHandlerAfterUndeleteObject,
    MFEventHandlerAfterUndeleteObjectFinalize,
    MFEventHandlerBeforeModifyMFilesCredentials,
    MFEventHandlerAfterModifyMFilesCredentials,
    MFEventHandlerBeforeReturnView,
    MFEventHandlerBeforeCheckInChangesFinalize,
    MFEventHandlerBeforeCreateView,
    MFEventHandlerAfterCreateView,
    MFEventHandlerBeforeModifyView,
    MFEventHandlerAfterModifyView,
    MFEventHandlerBeforeDeleteView,
    MFEventHandlerAfterDeleteView
}
```

## Filtering by class or object type

In many scenarios event handlers should only be executed for specific types of documents.  In this case the `ObjectType` and `Class` properties can be used to filter the situations in which the event handler would execute.

### Filtering by object type

For example in the code below the method would only be executed when objects with an object type with alias `MFiles.ObjectType.Invoice` were created.  Objects of other object types would not cause this code to execute.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCreateNewObjectFinalize, ObjectType="MFiles.ObjectType.Invoice")]
public void MyEventHandler(EventHandlerEnvironment env)
{
}
```

These attributes may be stacked.  In the scenario below the code would be executed for objects of type `MFiles.ObjectType.Invoice` and objects of type `MFiles.ObjectType.Document`.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCreateNewObjectFinalize, ObjectType="MFiles.ObjectType.Invoice")]
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCreateNewObjectFinalize, ObjectType="MFiles.ObjectType.Document")]
public void MyEventHandler(EventHandlerEnvironment env)
{
}
```

### Filtering by class

For example in the code below the method would only be executed when objects with an object type with alias `MFiles.Class.Agreement` were created.  Objects of other object types would not cause this code to execute.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCreateNewObjectFinalize, Class="MFiles.Class.Agreement")]
public void MyEventHandler(EventHandlerEnvironment env)
{
}
```

These attributes may be stacked.  In the scenario below the code would be executed for objects with either a class of `MFiles.Class.Invoice` or a class of `MFiles.Class.OtherDocument`.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCreateNewObjectFinalize, Class="MFiles.Class.Invoice")]
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCreateNewObjectFinalize, Class="MFiles.Class.OtherDocument")]
public void MyEventHandler(EventHandlerEnvironment env)
{
}
```