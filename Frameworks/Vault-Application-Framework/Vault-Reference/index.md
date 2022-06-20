---
layout: page
title: The Vault Reference (VAF)
includeInSearch: true
breadcrumb: Vault Reference
---

Please also read the [VBScript page on the Vault reference]({{ site.baseurl }}/Built-In/VBScript/Vault-Reference) page.
{:.note.warning}

The `Vault` reference is the primary method of interacting with contents of an M-Files vault.  It is an instance of the [Vault COM API class](https://www.m-files.com/api/documentation/index.html#MFilesAPI~Vault.html).  There are two types of `Vault` reference available within the VAF: transactional and non-transactional.

Changes made using a transactional vault reference are automatically rolled back if the transaction subsequently fails.  Changes made using a non-transactional vault reference are not automatically rolled back if the transaction subsequently fails; the developer must handle exceptions and ensure that any changes are undone.  If available, you should always make changes using a transactional vault reference.

## Task queues

The `TaskProcessorJob` instance provided when processing an item in a job queue also contains a vault reference.  This vault reference may or may not be transactional depending upon the [task processor transaction mode]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Task-Queues/#transaction-modes).

## Environment vault reference

Almost all entry points to a vault application (event handlers, state actions, property calculations, property validations, etc.) define an `Environment` parameter.  This environment provides contextual information about the vault and object that caused the event (e.g. which object triggered the event handler).  The environment contains a transactional `Vault` reference; any modifications to the vault contents performed using this reference during the vault application executing will be rolled back in the case of exceptions.

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCheckInChanges)]
public void MyEventHandler(EventHandlerEnvironment env)
{
	// The `env` reference contains a transactional vault reference.
	// Let's create an object using it.
	env.Vault.ObjectOperations.CreateNewObjectEx
	(
		... // Ommitted for clarity.
	);

	// If we throw an exception now then the object created above
	// will not be committed to the server as it was created using
	// the transactional vault reference.
	throw new InvalidOperationException("This cannot be done.");
}
```

The exception to the rule above relates to background operations and code executed within a task queue.  In these scenarios an environment vault reference is not available, so the [permanent vault reference](#permanent-vault-reference) is typically used instead.
{:.note}

### Using the transaction runner

In recent versions of the Vault Application Framework, the `transaction runner` can be used to execute sections of code within their own transaction.  This can be done in situations where, for example, a long-running task is being processed outside of a transaction, but a small section of code needs transactional safety.

A canonical example is shown below:

```csharp
[TaskProcessor(QueueId, ProcessManyObjectsTaskType, TransactionMode = TransactionMode.Unsafe)]
public void ProcessManyObjects(ITaskProcessingJob<ObjIDTaskDirective> job)
{
	// The transaction runner can be used to enable transactional safety for sections of code.
	var transactionRunner = this.GetTransactionRunner();

	// Execute a search to retrieve all the items to process.
	var searchResults = ...;

	// Iterate over the items and process them.
	foreach(var item in searchResults)
	{
		// Process each item in its own transaction.
		try
		{
			transactionRunner.Run((transactionalVault) =>
			{
				// Ensure any data is up-to-date and using the transactional vault.
				var transactionalObjVerEx = new ObjVerEx(transactionalVault, item.Info, item.Properties);

				// Check out/in the object using a transaction.
				transactionalObjVerEx.CheckOut();
				transactionalObjVerEx.SaveProperties();
				transactionalObjVerEx.CheckIn();
			});
		}
		catch
		{
			// TODO: Report out any exception thrown within the transaction..
		}
	}
}
```

## Auditing

[Special consideration]({{ site.baseurl }}/Built-In/VBScript/Audit-Trail-And-Scripting/) should be given to operations that could affect the current object's audit trail (e.g. setting the current object's properties).

## Security

It is important to note that the `Vault` reference provided within VBScript is connected to the M-Files server as an internal administrative user.  Any operations executed against the vault using this reference will not respect the current user's permissions.  [Special consideration]({{ site.baseurl }}/Built-In/VBScript/Audit-Trail-And-Scripting/) should be given to operations that could affect the current object's audit trail (e.g. setting the current object's properties).
{:.note.warning}

The current user's ID is available via the `env.CurrentUserID` reference.  The [current user's session information](https://www.m-files.com/api/documentation/MFilesAPI~SessionInfo.html) is available via `env.Vault.SessionInfo`.  Search results can be [filtered by user permissions]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#restricting-the-search-results-by-user-permissions) if needed.

## Permanent vault reference

For situations where there is no transactional vault reference available or needed, the `this.PermanentVault` reference can be used.  The most common situations are within [background operations](#background-operations) and [task queues](#task-queues).

It is recommended that the permanent vault reference is not used for making changes to the vault contents, as actions outside of your direct control (e.g. event handlers) could cause the vault contents to be left in an inconsistent state.  Instead, actions can be routed over [vault extension methods](#vault-extension-methods) to provide the developer with a transactional vault reference.
{:.note}