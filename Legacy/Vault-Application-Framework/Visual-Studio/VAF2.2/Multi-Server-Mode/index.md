---
layout: page
title: The Vault Application Framework and M-Files Multi-Server Mode
includeInSearch: true
breadcrumb: Multi-Server Mode
requiredMFilesServerVersion: 20.5
legacy: true
latest_version: /Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.3/
requiredVaultApplicationFrameworkVersion: 2.2
---

M-Files Multi-Server Mode is an architectural implementation pattern available from M-Files 20.5 onwards.

Previous M-Files "High Availability" implementations used an active-passive arrangement for M-Files servers, with a load balancer in front of the servers and a Microsoft SQL Server configured as a High Availability Group as the vault database.  With this configuration the load balancer would react to the active server becoming unavailable and attach the vault to the passive vault, before then transferring users across to this secondary server.  A small downtime will be perceived by users whilst this failover occurs.

M-Files Multi-Server Mode instead allows multiple servers to concurrently have the M-Files vault attached, with the load balancer distributing users across these active servers.  If one server becomes unavailable then its users are automatically migrated to other servers; the perceived downtime is much lower as the vault is already active on the other servers, and only users on the unavailable server are affected.

This change in architecture impacts Vault Application Framework applications: **in order for your Vault Application Framework application to run on M-Files Multi-Server Mode, you must make some changes to the structure of the application**.

Applications that are compatible with Multi-Server Mode will also install and function correctly in single-server environments, provided they are running M-Files 20.5 or higher.  If compatibility with Multi-Server Mode is anticipated in the future, it is recommended that you use the approaches listed on this page from the start.
{:.note}

## Concepts

* Note that your vault application may be run concurrently on all servers.  If there are three M-Files servers in the multi-server configuration then there will be up to three instances of your application running.

* Where a user performs an action in one server (e.g. they create an object), that server will execute any reactive code such as event handlers or property calculations.

* Your application **should not attempt to maintain state in memory**; a property set on one server will not be available in the application running on another server.  You can, however, use Named Value Storage as a persistence mechanism.

* **Background operations must not be used in applications that support Multi-Server Mode**.  Instead, you must alter your code to use one of the [task queue approaches](#task-queues) instead.

* Your application must ensure that configuration changes are [pushed from the server the change was made on, to all appropriate M-Files servers](#configuration-changes)

* *If you are not using the Vault Application Framework Multi-Server Mode template (e.g. you are upgrading/converting an existing application)*, then your [`appdef.xml` must be manually updated](#appdefxml-changes).

### Task queues

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

Information on the various task queue types and how to use them is available on the [page dedicated to task queues](Task-Queues).

## Converting an existing Vault Application Framework project

If inheriting from `ConfigurableVaultApplicationBase`, the Vault Application Framework will only find and resolve `MFIdentifier` instances created on your `Configuration` class.  If you are using `MFIdentifier` instances in other locations (e.g. directly on your `VaultApplication` class) then these should be moved into your `Configuration` class to continue to be resolved automatically.  Alternatively you can call `MFIdentifier.Resolve` at runtime to manually resolve the items.
{:.note.warning}

### Minimum code changes

You will need to alter the code of any existing Vault Application Framework application to support Multi-Server M-Files implementations.  The required changes will depend on the exact structure and complexity of your application.  At a minimum you will need to:

* Update your VAF reference to target the [VAF 2.2](https://www.nuget.org/packages/MFiles.VAF),
* *Optional* Update your VAF Extensions library reference to target the [1.1 release branch](https://www.nuget.org/packages/MFiles.VAF.Extensions).
* [Update your appdef.xml](#appdefxml-changes) to mark compatibility,
* [Remove any in-memory state](#handling-of-in-memory-state),
* [Convert background operations to use task queues instead](#migration-of-background-processes-to-task-queues), and
* [Implement configuration rebroadcasting](#configuration-changes).

### appdef.xml changes

* It must reference the v3 XSD (`http://www.m-files.com/schemas/appdef-server-v3.xsd`).
* It must have a `multi-server-compatible` element with a value of `true`.
* It must define an appropriate minimum M-Files version (`20.5` upwards).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<application
			type="server-application"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-server-v3.xsd">
  <guid>1906780f-f8e5-4c37-848a-af13b4e6a9ba</guid>
  <name>MFiles.MSM.VaultApplicationExample</name>
  <description></description>
  <publisher></publisher>
  <version>0.1</version>
  <copyright></copyright>
  <required-mfiles-version>20.5.0.0</required-mfiles-version>
  <multi-server-compatible>true</multi-server-compatible>
  <extension-objects>
    <extension-object>
      <name>MFiles.MSM.VaultApplicationExample</name>
      <assembly>MFiles.MSM.VaultApplicationExample.dll</assembly>
      <class>MFiles.MSM.VaultApplicationExample.VaultApplication</class>
      <installation-method>Install</installation-method>
      <uninstallation-method>Uninstall</uninstallation-method>
      <initialization-method>Initialize</initialization-method>
      <uninitialization-method>Uninitialize</uninitialization-method>
      <start-operations-method>StartOperations</start-operations-method>
    </extension-object>
  </extension-objects>
</application>
```

### Migration of background processes to task queues

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

Details on the [types of task queues and how to migrate your code from background processes to task queues is available here](Recurring-Tasks).

### Handling of in-memory state

In general in-memory state (e.g. cached lists of content) should be avoided, as it's easy to have situations where the cache on one server has different data to the cache on another server.  However, there are some situations where this may be required.  This can be achieved in a number of ways, but the recommended best practice is the use of named value storage.

Details on the [handling in-memory state is available here](In-Memory-State).

### Configuration changes

When an administrator changes the configuration of a Vault Application, the "save" command is executed on the server to which the administrator happens to be connected.  In order to ensure that the configuration is correctly applied to all servers, the vault application must use a [broadcast task queue processor](Task-Queues/Broadcast/) to notify all servers of the configuration change.

For flexibility, an existing broadcast task queue processor can be used for this.

```csharp
public class VaultApplication
	: ConfigurableVaultApplicationBase<Configuration>, IUsesTaskQueue
{
	/// <summary>
	/// M-Files Vault Server Attachment for this server.
	/// </summary>
	internal static VaultServerAttachment CurrentServer { get; private set; }

	/// <summary>
	/// Vault application task broadcast processor cancellation token source.
	/// </summary>
	private CancellationTokenSource BroadcastTokenSource { get; set; }

	/// <summary>
	/// Broadcast task processor.
	/// </summary>
	private AppTaskBatchProcessor BroadcastProcessor { get; set; }

	/// <summary>
	/// Broadcast task queue id.
	/// </summary>
	public const string BroadcastTaskQueueId = "Example.Broadcast.TaskQueueID";

	/// <summary>
	/// Provides the ID of the task queue to use for rebroadcasting changes to all servers.
	/// </summary>
	/// <returns><see cref="BroadcastTaskQueueId" /></returns>
	public override string GetRebroadcastQueueId()
	{
		// We wish to re-use the above broadcast task processor / queue.
		return BroadcastTaskQueueId;
	}

	#region IUsesTaskQueue Registrations.

	/// <summary>
	/// Initializes token sources and task processors / registers and opens the the task queues.
	/// </summary>
	public void RegisterTaskQueues()
	{
		// Set the current server value.
		this.CurrentServer = this.PermanentVault.GetVaultServerAttachments()
				.Cast<VaultServerAttachment>()
				.First( vsa => vsa.IsCurrent );

		// Now create the task processor.
		InitializeBroadcastProcessor();

		// Enable polling.
		this.TaskQueueManager.EnableTaskPolling( true );
	}

	#endregion

	/// <summary>
	/// Initializes the broadcast task processor.
	/// - This processor also handles the rebroadcast messages from the SaveCommand from the MFAdmin.
	/// </summary>
	private void InitializeBroadcastProcessor()
	{
		// Verify the broadcast task processor token source has been created.
		if( this.BroadcastTokenSource == null )
			this.BroadcastTokenSource = new CancellationTokenSource();

		// Initialize the batch task processor.
		if( this.BroadcastProcessor == null )
			this.BroadcastProcessor = new AppTaskBatchProcessor(
					new AppTaskBatchProcessorSettings
					{
						QueueDef = new TaskQueueDef
						{
							TaskType = TaskQueueManager.TaskType.BroadcastMessages,
							Id = BroadcastTaskQueueId,
							ProcessingBehavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorConcurrent,
							MaximumPollingIntervalInSeconds = this.Configuration.MaxPollingIntervalInSeconds,
							LastBroadcastId = ""
						},
						PermanentVault = this.PermanentVault,
						MaxConcurrentBatches = this.Configuration.MaxConcurrentBatches,
						MaxConcurrentJobs = this.Configuration.MaxConcurrentJobs,
						// This does not require any task handlers, but if other broadcast tasks are used then they could be added here.
						TaskHandlers = new Dictionary<string, TaskProcessorJobHandler>()
						{
							// Note that we have to provide at least one task handler or the underlying call excepts.
							{ Guid.NewGuid().ToString(), (j) => {} }
						},
						TaskQueueManager = this.TaskQueueManager,
						EnableAutomaticTaskUpdates = true,
						DisableAutomaticProgressUpdates = false,
						PollTasksOnJobCompletion = true,
						VaultExtensionMethodProxyId = this.GetVaultExtensionMethodEventHandlerProxyName()
					},
					this.BroadcastTokenSource.Token );

		// Register the task queues.
		this.BroadcastProcessor.RegisterTaskQueues();
	}
}
```

The key items to highlight in the above code are:

* When the task queue processor is created, the `VaultExtensionMethodProxyId` is passed into the associated settings object.
* `GetRebroadcastQueueId` is overridden and the task queue ID processed by the created task queue processor is returned.  The system will then use this task queue for managing the configuration-application broadcast.

The VAF Extensions library contains a custom [ConfigurableVaultApplicationBase](https://github.com/M-Files/VAF.Extensions.Community/blob/master/MFiles.VAF.Extensions/ConfigurableVaultApplicationBase.cs) that implements this pattern for you.
{:.note}