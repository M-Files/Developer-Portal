---
layout: page
title: Task queues in Vault Application Framework applications
includeInSearch: true
breadcrumb: Task queues
requiredMFilesServerVersion: 20.5
requiredVaultApplicationFrameworkVersion: 2.3
redirect_from:
  - /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Task-Queues/
  - /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Task-Queues/Broadcast/
  - /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Task-Queues/Sequential/
  - /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Task-Queues/Concurrent/
  - /Frameworks/Vault-Application-Framework/Task-Queues/Broadcast/
  - /Frameworks/Vault-Application-Framework/Task-Queues/Sequential/
  - /Frameworks/Vault-Application-Framework/Task-Queues/Concurrent/
---

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

The VAF Extensions library contains various [helper methods working with task queues](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#using-vaf-23-task-processors).  These include methods for recurring tasks that should be run [on a schedule](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#automatically-running-task-processors) or [after an interval](https://github.com/M-Files/VAF.Extensions.Community/tree/master/MFiles.VAF.Extensions#after-a-time-interval).

By default task processing that uses the approach described on these pages will operate using the [`Hybrid` transaction mode](#using-the-hybrid-default-transaction-mode).  *This does not affect [background operations]({{ site.baseurl }}/Legacy/Vault-Application-Framework/Background-Operations), or tasks using the [VAF 2.2 approach]({{ site.baseurl }}/Legacy/Vault-Application-Framework/VAF2.2/Multi-Server-Mode) that are using the VAF 2.3 runtime (although both of these should be removed during upgrades).*
{:.note.warning}

## Task queue types

Before creating a task queue, you must decide which type of queue is most appropriate for your situation: sequential, concurrent, or broadcast.

The samples below use a [custom task directive](#custom-directives) to provide the task processor with information about which object needs to be processed.  You can create your own task directives by inheriting from `TaskDirective` an ensuring that your directive is serializable.  The directive used, `ObjIDTaskDirective`, is part of the [VAF Extensions](https://github.com/M-Files/VAF.Extensions.Community/blob/master/MFiles.VAF.Extensions/Directives/ObjIDTaskDirective.cs) library.
{:.note}

### Sequential task queues

Tasks added to a sequential task queue will be processed in the order in which they were added; if tasks 1, 2, then 3 are added to the queue then the tasks will be processed one at a time and the processing order is typically 1, 2, 3.

If an explicit `ActivationTime` is set then this can affect the processing order; tasks will not be processed until the activation time is reached.
{:.note}

#### Creating a sequential queue and task processor, and adding tasks

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	// Sequential processing; all tasks will be executed one-by-one, in the order they were added to the queue.
	[TaskQueue(Behavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorSequential)]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string UploadToRemoteSystemTaskType = "UploadToRemoteSystem";

	[StateAction("WorkflowStateAliasForStateABCD")]
	public void HandleStateABCD(StateEnvironment env)
	{
		// When the object hits this state, add a task for it.
		this.TaskManager.AddTask
		(
			env.Vault,
			QueueId,
			UploadToRemoteSystemTaskType,
			// Directives allow you to pass serializable data to and from the task.
			directive: new ObjIDTaskDirective(env.ObjVer.ObjID)
		);
	}

	[TaskProcessor(QueueId, UploadToRemoteSystemTaskType)]
	public void UploadToRemoteSystem(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;

		// TODO: Send the item to the external system.

		// TODO: Update the object, moving it to the next workflow state.
		// Note: failing to call job.Commit will cause an exception.
		job.Commit((transactionalVault) =>
		{
			// ...do any work using the transactional vault reference.
		});
	}
}
```

### Concurrent task queues

Tasks added to a concurrent task queue can be assigned to one of any number of M-Files servers in the availability group, may be processed concurrently, and without regard for the order in which they were added to the queue.

#### Creating a concurrent queue and task processor, and adding tasks

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	// Concurrent processing, allowing up to ten tasks to run at one time on each server.
	[TaskQueue(Behavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorConcurrent, MaxConcurrency = 10)]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string UploadToRemoteSystemTaskType = "UploadToRemoteSystem";

	[StateAction("WorkflowStateAliasForStateABCD")]
	public void HandleStateABCD(StateEnvironment env)
	{
		// When the object hits this state, add a task for it.
		this.TaskManager.AddTask
		(
			env.Vault,
			QueueId,
			UploadToRemoteSystemTaskType,
			// Directives allow you to pass serializable data to and from the task.
			directive: new ObjIDTaskDirective(env.ObjVer.ObjID)
		);
	}

	[TaskProcessor(QueueId, UploadToRemoteSystemTaskType)]
	public void UploadToRemoteSystem(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;

		// TODO: Send the item to the external system.

		// TODO: Update the object, moving it to the next workflow state.
		// Note: failing to call job.Commit will cause an exception.
		job.Commit((transactionalVault) =>
		{
			// ...do any work using the transactional vault reference.
		});
	}
}
```

### Broadcast task queues

Broadcast task queues are used to broadcast information generated in one M-Files server to all others in the Multi-Server Mode configuration.  This can be used to send commands for other servers to update any cached information they may have, for example.  Processing of broadcast tasks should be fast, as they block the task processor.

#### Creating a task processor and broadcasting to all servers

The `[BroadcastProcessor]` attribute can be used to define broadcast processors that use the default broadcast queue.  This is recommended practice.
{:.note}

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{
	public const string BroadcastTaskType = "BroadcastType";

	// Dummy vault extension method to send the broadcast; this could
	// actually be done by a command on a dashboard, or a state action, etc.
	[VaultExtensionMethod("SendBroadcast",
		RequiredVaultAccess = MFVaultAccess.MFVaultAccessChangeMetaDataStructure)]
	private string SendBroadcast(EventHandlerEnvironment env)
	{
		this.TaskManager.SendBroadcast(env.Vault, BroadcastQueueId, BroadcastTaskType);
		return "Successful";
	}

	[BroadcastProcessor(BroadcastTaskType)]
	public void BroadcastProcessor(IBroadcastProcessingJob<BroadcastDirective> job)
	{ 
		// TODO: Handle the broadcast.
	}

}
```

##### Filtering broadcasts

The `FilterMode` can be used to filter which broadcasts are processed by the processor.  In the example below the processor will not be called for broadcasts that originated from the current server.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{
	public const string BroadcastTaskType = "BroadcastType";

	[BroadcastProcessor(BroadcastTaskType, FilterMode = BroadcastFilterMode.FromOtherServersOnly)]
	public void BroadcastProcessor(IBroadcastProcessingJob<BroadcastDirective> job)
	{ 
		// TODO: Handle the broadcast.
	}

}
```

## Reporting task status

Tasks can  periodically report their status back to the system.  This can be done by calling `ITaskProcessingJob<T>.UpdateTaskInfo`, providing the current task's state and any textual remarks (e.g. the percentage complete):

```csharp
[TaskProcessor(QueueId, TaskType)]
public void ProcessObjectHandler(ITaskProcessingJob<BroadcastDirective> job)
{
	for(var i=1; i<=100, i++)
	{
		job.Update
		(
			percentComplete: i,
			details: $"Processing object {i} / 100"
		);
	}

	// Make any commits to the vault.
	// Note: failing to call job.Commit will cause an exception.
	job.Commit((transactionalVault) =>
	{
		// ...do any work using the transactional vault reference.
	});
	job.Update
	(
		percentComplete: 100,
		details: $"Completed"
	);
}
```

The progress can be reported back as frequently as possible, but the system will only push changes back to the vault every 10 seconds or when the task completes.
{:.note}

## Handling exceptions

There are 7 potential task processing results that exceptions can use:

* `TaskProcessingJobResult.Abort`: Abandons the task and allows the server to automatically move it back to the waiting state at some point in the future.
* `TaskProcessingJobResult.Fatal`: Will fail the current task and never re-queue it.
* `TaskProcessingJobResult.Fail`: Fail will fail the current task and requeue it if allowed (i.e., we haven't hit the requeue limit).
* `TaskProcessingJobResult.Requeue`: Fails the task but re-queues it regardless of the requeue limit.
* `TaskProcessingJobResult.Retry`:  Does not fail the task, but instead re-runs the task immediately in a new transaction.  If the retry limit is hit then it will behave as "fail" and re-queue the task if the requeue limit has not been hit.
* `TaskProcessingJobResult.Cancel`:  Indicates the task should be marked as canceled in the vault, and not processed any further.
* `TaskProcessingJobResult.Complete`:  Indicates the task was successfully completed.

The default retry limit is 3, and the default requeue limit is 5.  These can be altered in the `[TaskProcessor]` declaration.
{:.note} 

### By throwing exceptions

To control how the task is re-processed (or not, as appropriate), often the easiest approach is to throw an instance of `AppTaskException` and provide the correct `TaskProcessingJobResult`:

```csharp
[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
{
	if (rnd.Next(1, 4) == 2)
		throw new AppTaskException(TaskProcessingJobResult.Fail, "Failed because of random number");
}
```

### By mapping exception types or M-Files error codes

As a developer you can choose what effect different exceptions raised within your code will have on the task itself.  This is done by mapping the exception type to an expected `TaskProcessingJobResult`.  In the example below, any `InvalidOperationException` thrown by the task processing will be considered fatal:

Mapping exception types is normally not required.
{:.note}

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

## Transaction modes

By default, when using the VAF 2.3 `TaskManager` approach, individual tasks are in the `Hybrid` transaction mode.  This provides flexibility that the overall operation can take as long as is needed, but transactional safety for all vault operations executed within the `Commit` action.  The `Commit` action is executed within a transaction, and therefore limited to a default maximum of 90 seconds.
{:.note}

If code that runs within a transaction exceeds the configured transaction duration then the task will be failed and may be re-run.  It is important that transactional code completes as quickly as possible.  Long-running transactions have impacts upon the general server performance and may cause conflicts and deadlocks.  Note that code that runs quickly in development environments may perform significantly differently in production vaults.
{:.note.warning}

There are three available transaction modes:

* `TransactionMode.Hybrid`: each task is run outside of a transaction, but must call `ITaskProcessingJob<TDirective>.Commit` to commit the process.  The commit method is executed within a transaction and is subject to a timeout.  **This is the default mode.**
* `TransactionMode.Full`: each task is run in a single, dedicated, transaction where all vault operations and the saving of the final task are fully committed on success, or fully rolled-back on failure.  Subject to timeouts.
* `TransactionMode.Unsafe`: tasks are run outside of a transaction.  Each vault operation is committed independently.  The developer is solely responsible in ensuring that the vault is left in a suitable state in case of exceptions or other unexpected situations.  Not subject to any timeouts.

When using a `Hybrid` or `Unsafe` transaction mode, the `job.Vault` reference will return the permanent vault reference.  Operations done using this reference are committed immediately to the vault and **will not be rolled back in case of the job not completing successfully**, even if the task is re-queued and re-run at a later date.  It is imperative that developers utilise the correct vault reference for the operation that is being performed.
{:.note.warning}

### Using the 'Hybrid' (default) transaction mode

In the `Hybrid` transaction mode, the bulk of the operation is executed outside of a transaction, but the code must call `job.Commit` before it completes.  If the operation finishes running and has not called `job.Commit` then it is considered to have failed.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string UploadToRemoteSystemTaskType = "UploadToRemoteSystem";

	[TaskProcessor(QueueId, UploadToRemoteSystemTaskType)]
	public void UploadToRemoteSystem(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;

		// TODO: Send the item to the external system.
		// This can take as long as is needed.  If the task is cancelled (e.g. during vault shutdown)
		// then the system will re-run it when it is next able to do so.

		// WARNING: the "job.Vault" reference here is *not* transactional so should not be used for writing.

		// TODO: Update the object, moving it to the next workflow state.
		// Note: failing to call job.Commit will cause an exception.
		job.Commit((transactionalVault) =>
		{
			// ...do any work using the transactional vault reference.
			// The action provided to the "Commit" method will be executed within a transaction.
		});
	}
}
```

### Using the 'Full' transaction mode

In the `Full` transaction mode, the processing of each individual task is executed within a transaction.  The `job.Vault` reference is a transactional vault reference.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ProcessObjectTaskType = "ProcessObject";

	[TaskProcessor(QueueId, ProcessObjectTaskType, TransactionMode = TransactionMode.Full)]
	public void ProcessObject(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// Get the object ID.
		if(false == job.Directive.TryGetObjID(out ObjID objID))
			return;

		// Perform any operation using the transactional "job.Vault" reference.
		// If the job is cancelled for whatever reason then all operations done
		// using this reference will be rolled back.
	}
}
```

### Using the 'Unsafe' transaction mode

The `Unsafe` transaction mode should be used with extreme caution.  It is recommended that most operations use the `Hybrid` mode, or `Full` for very short-lived individual operations.
{:.note.warning}

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ProcessManyObjectsTaskType = "ProcessManyObjects";

	[TaskProcessor(QueueId, ProcessManyObjectsTaskType, TransactionMode = TransactionMode.Unsafe)]
	public void ProcessManyObjects(ITaskProcessingJob<ObjIDTaskDirective> job)
	{
		// This can take as long as is needed.  If the task is cancelled (e.g. during vault shutdown)
		// then the system will re-run it when it is next able to do so.

		// WARNING: the "job.Vault" reference here is *not* transactional so should not be used for writing.

 		// Execute a search (reading), using the permanent vault.
		var searchResults = new MFSearchBuilder(job.Vault).FindEx();

		// The transaction runner can be used to enable transactional safety for sections of code.
		var transactionRunner = this.GetTransactionRunner();

		// TODO: Update the job status.

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

					// TODO: Process the item.

					// TODO: Update the job status.
				});
			}
			catch
			{
				// TODO: Report out any exception.
			}
		}
	}
}
```

## Custom directives

Each task can be provided with additional data that can be used during the processing of the job.  These objects must inherit from `TaskDirective`, must be serializable by `Newtonsoft.JSON`, have appropriate `[DataContract]` and `[DataMember]` attributes, and are automatically provided to the processing method.

### Declaring a custom directive type

Below is an example of a custom directive that represents a single object in the vault.  The members on the class are simple data types (integers) to support serialization, and the class provides some helper functions to easily convert to and from the appropriate M-Files API type.

The important points to remember are:

1. The class must inherit from `TaskDirective`.
2. The class must be able to be serialized (and deserialized) by `Newtonsoft.Json`.
3. The class must have the `[DataContract]` attribute, and members marked with `[DataMember]` as appropriate.

```csharp
/// <summary>
/// A <see cref="TaskDirective"/> that represents a single <see cref="ObjID"/>.
/// </summary>
[DataContract]
public class ObjIDTaskDirective
	: TaskDirective
{
	/// <summary>
	/// The internal ID of the object (unique within one object type).
	/// </summary>
	[DataMember]
	public int ObjectID { get; set; }

	/// <summary>
	/// The ID of the object type.
	/// </summary>
	[DataMember]
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
		// Set the ObjID instance.
		objID = new ObjID();

		// If we do not have a valid object type ID then return false.
		if(0 > this.ObjectTypeID)
			return false;

		// If we do not have a valid object ID then return false.
		if(0 == this.ObjectID)
			return false;

		// We can't guarantee that the object exists, but it seems reasonable.
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

## Migration of background processes to a recurring task

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

To resolve this, a [recurring task](Recurring-Tasks) should be used instead.