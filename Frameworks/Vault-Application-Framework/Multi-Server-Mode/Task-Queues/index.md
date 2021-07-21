---
layout: page
title: Task queues in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: Task queues
---

The approach shown below is only compatible with version 2.3 (and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

The VAF Extensions library contains various [helper methods working with task queues](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#using-vaf-23-task-processors).  These include methods for recurring tasks that should be run [on a schedule](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#automatically-running-task-processors) or [after an interval](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#after-a-time-interval).
{:.note}

## Task queue types

Before creating a task queue, you must decide which type of queue is most appropriate for your situation: sequential, concurrent, or broadcast.

### Sequential task queues

Tasks added to a [sequential task queue](Sequential) will be processed in the order in which they were added; if tasks 1, 2, then 3 are added to the queue then the tasks will be processed one at a time and the processing order is guaranteed to be 1, 2, 3.

### Concurrent task queues

Tasks added to a [concurrent task queue](Concurrent) can be assigned to any server in the availability group, may be processed concurrently, and without regard for the order in which they were added to the queue.

### Broadcast task queues

[Broadcast task queues](Broadcast) are used to broadcast information generated in one M-Files server to all others in the availability group.  This can be used to send commands for other servers to update any cached information they may have, for example.

## Migration of background processes to a recurring task

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

To resolve this, a [recurring task](../Recurring-Tasks) should be used instead.

By default task processing that uses the approach described on these pages will operate within a transaction, so must complete within 90 seconds.  This is different to historic approaches where the task processing executed outside of a transaction.  Long-running processes should be split into smaller processes that can run within the alloted time period.  Where this cannot be done, the [transaction mode](#long-running-tasks) can be changed.  *This does not affect [background operations]({{ site.baseurl }}/Legacy/Vault-Application-Framework/Background-Operations), or tasks using the [VAF 2.2 approach]({{ site.baseurl }}/Legacy/Vault-Application-Framework/VAF2.2/Multi-Server-Mode) that are using the VAF 2.3 runtime (although both of these should be removed during upgrades).*
{:.note.warning}

## Reporting task status

It's important that tasks periodically report their status back to the system.  This can be done by calling `ITaskProcessingJob<T>.UpdateTaskInfo`, providing the current task's state and any textual remarks (e.g. the percentage complete):

```csharp
[TaskProcessor(QueueId, TaskType)]
public void ProcessObjectHandler(ITaskProcessingJob<TaskDirective> job)
{
	for(var i=1; i<=100, i++)
	{
		job.Update
		(
			percentComplete: i,
			details: $"Processing object {i} / 100"
		);
		// TODO: Process the object.
	}
	job.Update
	(
		percentComplete: 100,
		details: $"Completed"
	);
}
```

The progress should be reported back as frequently as possible, but the system will only push changes back to the vault every 10 seconds or when the task completes.
{:.note}

## Handling exceptions

As a developer you can choose what effect different exceptions raised within your code will have on the task itself.  This is done by mapping the exception type to an expected `TaskProcessingJobResult`.  In the example below, any `InvalidOperationException` thrown by the task processing will be considered fatal:

```csharp
[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
[TaskExceptionBehavior(TaskProcessingJobResult.Fatal, typeof(InvalidOperationException))]
public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
{
	if (rnd.Next(1, 4) == 2)
		throw new InvalidOperationException("These are my exception details");
}
```

It is also possible to map M-Files COM API error codes to task processing results:

```csharp
[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
[TaskExceptionBehavior(TaskProcessingJobResult.Fatal, MFErrorCodes.NotFound1, MFErrorCodes.NotFound2)]
public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
{
	// Try and load an object; if it's not found then the job will be marked as fatal.
	var obj = new ObjVerEx(job.Vault, 0, 123, 5);

	// ...
}
```

There are 7 potential task processing results that exceptions can be mapped to:

* `TaskProcessingJobResult.Abort`: Indicates the task should not be updated further, so it automatically gets restored to the `MFTaskState.MFTaskStateWaiting` state.
* `TaskProcessingJobResult.Fatal`: Indicates the task should be set to `MFTaskState.MFTaskStateFailed`, and **may not** be re-queued.
* `TaskProcessingJobResult.Fail`: Indicates the task should be set to `MFTaskState.MFTaskStateFailed`, but **may** be re-queued.
* `TaskProcessingJobResult.Requeue`: Indicates the task should be set to `MFTaskState.MFTaskStateFailed`, and **must** be re-queued.
* `TaskProcessingJobResult.Retry`:  Indicates the task may be reprocessed immediately, and left in the `MFTaskState.MFTaskStateInProgress` state.
* `TaskProcessingJobResult.Cancel`:  Indicates the task should be marked canceled in the vault, and not processed any further.
* `TaskProcessingJobResult.Complete`:  Indicates the task my be set to `MFTaskState.MFTaskStateCompleted`.

## Long-running tasks

By default, when using the VAF 2.3 `TaskManager` approach, individual tasks are processed within a transaction.  This provides numerous benefits, but also restricts the duration that the processing of each task can take.  All operations within a single transaction are limited to a maximum of 90 seconds.

### Splitting into smaller tasks

Long-running tasks should be broken into multiple smaller steps.  Consider this old-style code:

```csharp
/// <inheritdoc />
protected override void StartApplication()
{
	this.BackgroundOperations.StartRecurringBackgroundOperation
	(
		"Export data to external system",
		TimeSpan.FromSeconds(10), () =>
		{
			// Execute a search to find all objects in state ABCD.
			var results = ...;

			// Process each object we found above.
			foreach(var item in results)
			{
				// Send the item to the external system.
				this.SendToExternalSystem(item);

				// Update the object, moving it to the next workflow state.
				// ...
			}
		}
	);
}
```

This code, which executes every ten seconds, may take a long time to run depending on how many objects are in the required state.  It also needs to consider exception trapping to ensure that no objects are left in a checked-out state should the code fail to complete for some reason.

When converting this to use task queues, a better approach would be use a task queue and process each item individually:

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ExportSingleItemToRemoteSystemTaskType = "ExportSingleItemToRemoteSystemTaskType";

	[StateAction("WorkflowStateAliasForStateABCD")]
	public void HandleStateABCD(StateEnvironment env)
	{
		// When the object hits this state, add a task for it.
		this.TaskManager.AddTask
		(
			env.Vault,
			QueueId,
			ExportSingleItemToRemoteSystemTaskType,
			// Directives allow you to pass serializable data to and from the task.
			directive: new ObjIDTaskDirective(env.ObjVer.ObjID)
		)
	}

	[TaskProcessor(QueueId, ExportSingleItemToRemoteSystemTaskType)]
	public void ExportSingleItemToRemoteSystem(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;

		// Send the item to the external system.
		this.SendToExternalSystem(objID);

		// Update the object, moving it to the next workflow state.
		// ...
	}
}
```

The sample above uses a [custom task directive](#custom-directives) to provide the task processor with information about which object needs to be processed.  You can create your own task directives by inheriting from `TaskDirective` an ensuring that your directive is serializable.  The directive used above, `ObjIDTaskDirective`, is part of the [VAF Extensions](https://github.com/M-Files/VAF.Extensions.Community/blob/master/MFiles.VAF.Extensions/Directives/ObjIDTaskDirective.cs) library.
{:.note}

### Opting out of transactional safety

In situations where a single task may take a significant amount of time - for example: doing large file manipulation or consolidation - you may need to alter the transaction mode used by the task processor.  There are three available transaction modes:

* `TransactionMode.Full`: each task is run in a single, dedicated, transaction where all vault operations and the saving of the final task are fully committed on success, or fully rolled-back on failure.  Subject to timeouts.  **This is the default mode.**
* `TransactionMode.Unsafe`: tasks are run outside of a transaction.  Each vault operation is committed independently.  The developer is solely responsible in ensuring that the vault is left in a suitable state in case of exceptions or other unexpected situations.  Not subject to any timeouts.
* `TransactionMode.Hybrid`: each task is run outside of a transaction, but must call `ITaskProcessingJob<TDirective>.Commit` to commit the process.  The commit method is executed within a transaction and is subject to a timeout.

```csharp
[TaskProcessor
(
	QueueId, 
	ImportDataFromRemoteSystemTaskType,
	TransactionMode = TransactionMode.Hybrid
)]
public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
{
	// Process the item somehow.
	// This runs outside of the transaction, so limit
	// your interaction with the vault accordingly.
	job.Update(percentComplete: 0, details: "Running");
	for (var i = 0; i < 100; i++)
	{
		System.Threading.Thread.Sleep(rnd.Next(100, 2000));
		job.Update(percentComplete: i, details: $"Running ({i}/100)");
	}
	job.Update(percentComplete: 100, details: "Completed");

	// Mark it as complete in the vault.
	job.Commit((v) =>
	{
		// Make any updates to the vault here, within a transaction.
	});
	
}
```
## Custom directives

Each task can be provided with additional data that can be used during the processing of the job.  These objects must inherit from `TaskDirective`, must be serializable by `Newtonsoft.JSON`, and are automatically provided to the processing method.

### Declaring a custom directive type

Below is an example of a custom directive that represents a single object in the vault.  The members on the class are simple data types (integers) to support serialization, and the class provides some helper functions to easily convert to and from the appropriate M-Files API type.

The important points to remember are:

1. The class must inherit from `TaskDirective`.
2. The class must be able to be serialized (and deserialized) by `Newtonsoft.Json`.

```csharp
/// <summary>
/// A <see cref="TaskDirective"/> that represents a single <see cref="ObjID"/>.
/// </summary>
public class ObjIDTaskDirective
	: TaskDirective
{
	/// <summary>
	/// The internal ID of the object (unique within one object type).
	/// </summary>
	public int ObjectID { get; set; }

	/// <summary>
	/// The ID of the object type.
	/// </summary>
	public int ObjectTypeID { get; set; }

	/// <summary>
	/// Instantiates an <see cref="ObjIDTaskDirective"/>.
	/// </summary>
	public ObjIDTaskDirective() { }

	/// <summary>
	/// Instantiates an <see cref="ObjIDTaskDirective"/> representing <paramref name="objID"/>.
	/// </summary>
	/// <param name="objID">The object to represent.</param>
	public ObjIDTaskDirective(ObjID objID)
		: this()
	{
		if (null == objID)
			throw new ArgumentNullException(nameof(objID));
		this.ObjectID = objID.ID;
		this.ObjectTypeID = objID.Type;
	}

	/// <summary>
	/// Attempts to set <paramref name="objID"/> from
	/// <see cref="ObjectTypeID"/> and <see cref="ObjectID"/>.
	/// </summary>
	/// <param name="objID">The object ID.</param>
	/// <returns><see langword="true"/> if successful.</returns>
	public bool TryGetObjID(out ObjID objID)
	{
		objID = new ObjID();
		objID.SetIDs(this.ObjectTypeID, this.ObjectID);
		return true;
	}
}
```

This specific example is adapted from the [VAF Extensions library](https://github.com/M-Files/VAF.Extensions.Community/).  You may consider using this library in your implementations rather than copying this implementation.
{:.note}

### Using the custom directive within a task processor

To alter your task processor to use a custom directive type, change the method signature from `ITaskProcessingJob<TaskDirective>` to `ITaskProcessingJob<CustomDirectiveType>`.  The example below uses the `ObjIDTaskDirective` declared [above](#declaring-a-custom-directive-type):

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ExportSingleItemToRemoteSystemTaskType = "ExportSingleItemToRemoteSystemTaskType";

	[StateAction("WorkflowStateAliasForStateABCD")]
	public void HandleStateABCD(StateEnvironment env)
	{
		// When the object hits this state, add a task for it.
		this.TaskManager.AddTask
		(
			env.Vault,
			QueueId,
			ExportSingleItemToRemoteSystemTaskType,
			directive: new ObjIDTaskDirective(env.ObjVer.ObjID)
		)
	}

	[TaskProcessor(QueueId, ExportSingleItemToRemoteSystemTaskType)]
	public void ExportSingleItemToRemoteSystem(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// NOTE: "job.Directive" will never be null, but it may be an empty instance
		// of the task directive type if, for example, no directive were passed.

		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;
			
		// TODO: Process the object.
	}
}
```