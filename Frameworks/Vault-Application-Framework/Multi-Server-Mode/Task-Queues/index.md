---
layout: page
title: Task queues in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: Task queues
---

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

## Task queue types

### Sequential task queues

Tasks added to a sequential task queue will be processed in the order in which they were added; if tasks 1, 2, then 3 are added to the queue then the tasks will be processed one at a time and the processing order is guaranteed to be 1, 2, 3.

### Concurrent task queues

Tasks added to a concurrent task queue can be assigned to any number of M-Files servers in the Multi-Server Mode configuration, may be processed concurrently, and without regard for the order in which they were added to the queue.

### Broadcast task queues

Broadcast task queues are used to broadcast information generated in one M-Files server to all others in the Multi-Server Mode configuration.  This can be used to send commands for other servers to update any cached information they may have, for example.

## Migration of background processes to task queues

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

To resolve this, a `TaskQueue` should be used instead.  Operations running on various servers can add tasks into the queue via the `TaskQueueManager`, which will then delegate processing of the task to an appropriate `TaskQueueProcessor` running on one or more of the M-Files servers.

### Creating a task processor

```csharp

private CancellationTokenSource TokenSource { get;set; }

/// <summary>
/// Override the start operations so we can register our task processor.
/// </summary>
/// <param name="vaultPersistent">Non-transactional Vault object.</param>
public override void StartOperations( Vault vaultPersistent )
{
	// Allow the base to process the start operations.
	base.StartOperations( vaultPersistent );
	
	// Register the task queues
	this.RegisterTaskQueues();
}

/// <summary>
/// Registers the task queue used by this application or module.
/// </summary>
public void RegisterTaskQueues()
{
	// Create the cancellation token source.
	if( this.TokenSource == null )
		this.TokenSource = new CancellationTokenSource();

	// Create the task processor.
	if( this.TaskProcessor == null )
	{
		// Store and hold a reference to the queue def.
		this.QueueDef = new TaskQueueDef
		{
			TaskType = TaskQueueManager.TaskType.Both,
			Id = "My.TaskQueueId",
			ProcessingBehavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorConcurrent,
			MaximumPollingIntervalInSeconds = this.Config.MaxPollingIntervalInSeconds,
			LastBroadcastId = ""
		};

		// Initialize the task processor.
		this.TaskProcessor = new AppTaskBatchProcessor( new AppTaskBatchProcessorSettings
			{
				QueueDef = this.QueueDef,
				PermanentVault = this.PermanentVault,
				MaxConcurrentBatches = this.Config.MaxConcurrentBatches,
				MaxConcurrentJobs = this.Config.MaxConcurrentJobs,
				TaskHandlers = new Dictionary<string, TaskProcessorJobHandler>
				{
					{
						TaskType_NotificationTask,
						ProcessNotificationTask
					},
					{
						TaskType_DailyCheckTask,
						ProcessDailyCheckTask
					},
					{
						TaskType_SomeOtherTask,
						ProcessSomeOtherTask
					}
				},
				TaskQueueManager = this.TaskQueueManager,
				EnableAutomaticTaskUpdates = true,
				DisableAutomaticProgressUpdates = false,
				PollTasksOnJobCompletion = true
			},
			this.TokenSource.Token );
	}

	// Register the task queue.
	this.TaskProcessor.RegisterTaskQueues();
}
```

### Creating new tasks for the queue

#### Application tasks

- `TaskProcessor.CreateApplicationTaskSafe()` - Attempts to create an application task with a safety retry mechanism that will re-open a task queue if it is found to no longer exist. This prevents a thrown error if the task queue were no longer present in the database.
- Immutable data - The base class, `TaskQueueDirective` is provided as a base class that is recommended to be used to serialize the immutable data that is passed to a task during creation.

```csharp
// ********** Custom directive **********
public class ProcessNotificationDirective : TaskQueueDirective
{
	/// <summary>
	/// Parse-able ObjVerEx string.
	/// </summary>
	public string ObjVerEx { get; set; }
}

// ********** Using the custom directive **********

// Create a task in the task queue.
this.TaskProcessor.CreateApplicationTaskSafe(
		true,
		"My.TaskQueueId",
		TaskType_NotificationTask,
		new ProcessNotificationDirective { ObjVerEx = objVerEx.ToString() }.ToBytes() );

// Deserialize the directive.
ProcessNotificationDirective directive = TaskQueueDirective
    	.Parse<ProcessNotificationDirective>( appTask.Data.AsString( Encoding.UTF8 ) );

```

#### Broadcast messages

- `SendBroadcastMessageSafe()` - Attempts to send a broadcast message with a safety retry mechanism that will re-open a task queue if it is found to no longer exist. This prevents a thrown error if the task queue were no longer present in the database.
- Just like the application task, there is a base class for broadcast message directives as well, `BroadcastDirective`. This class adds properties; `UserID`, `GeneratedFromMachineName` and `GeneratedFromGuid`.  These properties can be used to identify both who triggered a broadcast message as well as on which server the message was created.

```c#
// ********** Custom directive **********
public class MyCustomBroadcastDirective : BroadcastDirective
{
    /// <summary>
    /// Event identifier.
    /// </summary>
    public string EventID { get; set; }
}

// ********** Using the custom directive **********

// Create a task in the task queue.
this.TaskProcessor.SendBroadcastMessageSafe(
		true,
		"My.TaskQueueId",
		TaskType_CustomBroadcast,
		new MyCustomBroadcastDirective { EventID = eventId }.ToBytes() );

// Deserialize the directive.
MyCustomBroadcastDirective directive = TaskQueueDirective
    		.Parse<MyCustomBroadcastDirective>( appTask.Data.AsString( Encoding.UTF8 ) );

```

### Processing tasks in the queue

#### Application tasks

#### Broadcast messages

### Handling application shutdown


### Recurring background operations
