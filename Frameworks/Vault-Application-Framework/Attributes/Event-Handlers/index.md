---
layout: page
title: The Event Handler attribute in the Vault Application Framework
includeInSearch: true
breadcrumb: Event Handlers
---

## EventHandlerAttribute

The `EventHandlerAttribute` attribute marks the following method to be executed when a specific M-Files event occurs.  Almost all document vault events can be handled.  Information about the object being processed (e.g. being checked in) is available in `env.ObjVer` and `env.ObjVerEx`, if appropriate.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCheckInChanges)]
public void MyEventHandler(EventHandlerEnvironment env)
{
}
```

<p class="note">The event handler type is included in the attribute declaration.  Other values can also be passed, such as the alias of the object type or class of object that this code should run for, if applicable.</p>

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