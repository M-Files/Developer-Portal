---
layout: page
title: The Vault Reference (VAF)
includeInSearch: true
breadcrumb: Vault Reference
---

Please also read the [VBScript page on the Vault reference]({{ site.baseurl }}/Built-In/VBScript/Vault-Reference) page.
{:.note.warning}

The `Vault` reference is the primary method of interacting with contents of an M-Files vault.  It is an instance of the [Vault COM API class](https://www.m-files.com/api/documentation/index.html#MFilesAPI~Vault.html).  There are two `Vault` references available within the VAF: the transactional [environment vault reference](#environment-vault-reference) and the non-transactional [permanent vault reference](#permanent-vault-reference).

## Environment vault reference

Almost all entry points to a vault application (event handlers, state actions, property calculations, property validations, etc.) are define an `Environment` parameter.  This environment provides contextual information about the vault and object that caused the event (e.g. which object triggered the event handler).  The environment contains a transactional `Vault` reference; any modifications to the vault contents performed using this reference during the vault application executing will be rolled back in the case of exceptions.

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

## Permanent vault reference

For situations where there is no transactional vault reference available, the `this.PermanentVault` reference can be used.  The most common situations are within [background operations](#background-operations) and [task queues](#task-queues).

It is recommended that the permanent vault reference is not used for making changes to the vault contents, as actions outside of your direct control (e.g. event handlers) could cause the vault contents to be left in an inconsistent state.  Instead, actions can be routed over [vault extension methods](#vault-extension-methods) to provide the developer with a transactional vault reference.
{:.note}

### Background operations

Background operations often interact with the vault using the `this.PermanentVault` reference as no transactional/environment vault reference is available.  Care should be taken here as exceptions within the background operation can leave the vault in an inconsistent state.  Consider instead calling a [vault extension method](#vault-extension-methods) to provide sections of code with transactionality.

Note that the code executed by a background operation is not subject to standard script timeouts, but the code within a vault extension method is.  Potentially long-running background operations should not be moved in their entirety to vault extension methods as they may time out.  Instead, consider calling the vault extension method for each atomic action within the background operation, returning a status value to the background operation to identify whether each action was successful or not.
{:.note}

```csharp
/// <summary>
/// The method that is run when the vault goes online.
/// </summary>
protected override void StartApplication()
{
	// Start writing content to the event log every ten seconds.
	// The background operation will continue until the vault goes offline.
	this.BackgroundOperations.StartRecurringBackgroundOperation
	(
		"Recurring operation",
		TimeSpan.FromMinutes(10),
		() =>
		{
			// Note that there is no "env" here, so we do not have a transactional
			// vault reference to use.  Instead we must use the permanent vault reference.
			var results = this.PermanentVault.ObjectSearchOperations.SearchForObjectsByConditionsEx
			(
				... /// Ommitted for clarity.
			);
		}
	);
}
```

### Task queues

Additionally, the `TaskProcessorJob` instance provided when processing an item in a job queue also contains a non-transactional vault reference.  As with the permanent vault reference, this job vault reference should be used cautiously.  Where transactionality is required, consider calling a [vault extension method](#vault-extension-methods) and move the vault interaction code into the vault extension method.

Note that in [multi-server-mode]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode) situations, the server which executes the vault extension method may not be the server which called the vault extension method.  You must ensure that the only data needed by the vault extension method is available via extension method's input.
{:.note.warning}

### Vault Extension Methods

Non-transactional code (e.g. background operations or task queue job processing) can call [Vault Extension Methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Vault-Extension-Methods/) to "wrap" code within a transaction.

```csharp
/// <summary>
/// The method that is run when the vault goes online.
/// </summary>
protected override void StartApplication()
{
	// Start writing content to the event log every ten seconds.
	// The background operation will continue until the vault goes offline.
	this.BackgroundOperations.StartRecurringBackgroundOperation
	(
		"Recurring operation",
		TimeSpan.FromMinutes(10),
		() =>
		{
			// Use the permanent vault reference to retrieve objects to process.
			var results = this.PermanentVault.ObjectSearchOperations.SearchForObjectsByConditionsEx
			(
				... /// Ommitted for clarity.
			);

			// Process each one using a vault extension method.
			foreach(ObjectVersion item in results)
			{
				this
					.PermanentVault
					.ExtensionMethodOperations
					.ExecuteVaultExtensionMethod("MyVaultExtensionMethod", item.ObjVer.ToJSON())
			}
		}
	);
}
[VaultExtensionMethod("MyVaultExtensionMethod",
	RequiredVaultAccess = MFVaultAccess.MFVaultAccessNone)]
private string MyVaultExtensionMethod(EventHandlerEnvironment env)
{
	try
	{
		// Retrieve the object to process.
		var objVer = new ObjVer();
		objVer.FromJSON(env.Input);

		// TODO: Perform some operations using env.Vault.
		return "Success";
	}
	catch(Exception e)
	{
		return e.Message;
	}
}

```

## Auditing

[Special consideration]({{ site.baseurl }}/Built-In/VBScript/Audit-Trail-And-Scripting/) should be given to operations that could affect the current object's audit trail (e.g. setting the current object's properties).

## Security

It is important to note that the `Vault` reference provided within VBScript is connected to the M-Files server as an internal administrative user.  Any operations executed against the vault using this reference will not respect the current user's permissions.  [Special consideration]({{ site.baseurl }}/Built-In/VBScript/Audit-Trail-And-Scripting/) should be given to operations that could affect the current object's audit trail (e.g. setting the current object's properties).
{:.note.warning}

The current user's ID is available via the `env.CurrentUserID` reference.  The [current user's session information](https://www.m-files.com/api/documentation/MFilesAPI~SessionInfo.html) is available via `env.Vault.SessionInfo`.  Search results can be [filtered by user permissions]({{ site.baseurl }}/APIs/COM-API/Searching/SearchConditions/#restricting-the-search-results-by-user-permissions) if needed.