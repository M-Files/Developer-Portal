---
layout: page
title: Concurrent task queues in Vault Application Framework applications
includeInSearch: true
breadcrumb: Concurrent task queues
requiredMFilesServerVersion: 20.5
legacy: true
latest_version: /Frameworks/Vault-Application-Framework/Task-Queues/#concurrent-task-queues
requiredVaultApplicationFrameworkVersion: 2.2
---

Tasks added to a concurrent task queue can be assigned to any number of M-Files servers in the Multi-Server Mode configuration, may be processed concurrently, and without regard for the order in which they were added to the queue.

Task queues are uniquely identified by a `Queue ID`.  This ID can be used to interact with the queue from other applications, through the M-Files COM API object model.

Each queue can process one or more task types, with each task type being processed by a specified processing method; this way a queue could contain a task to create an object, a task to update an object, and a task to delete an object, all at once.

## Creating the task queue, and processing items

Creating the task queue within the VAF is broken down into three main steps:

1. Creating the configuration options.
2. Implement `IUsesTaskQueue`, and override the `StartOperations` method to register and enable your queue(s).
3. Create the `AppTaskBatchProcessor`, providing suitable `AppTaskBatchProcessorSettings`.  This includes providing a collection of task type IDs and their associated processing methods.
4. Implement the task processing method(s), reporting data on the job processing back to the task processor.

### Creating the configuration options

It is good practice to expose configurable values to customize the processing of a task queue.  Below are the options used within this sample application.

{% highlight csharp %}
[DataContract]
public class Configuration
{
	/// <summary>
	/// If true, running data is logged to the Windows Event Log.
	/// </summary>
	[DataMember( Order = 0 )]
	[JsonConfEditor(
		Label = "Enable Logging",
		DefaultValue = false
	)]
	public bool LoggingEnabled { get; set; } = false;

	/// <summary>
	/// The max number of seconds that can pass between polling intervals.
	/// </summary>
	[DataMember( Order = 1 )]
	[JsonConfIntegerEditor(
		DefaultValue = 15,
		Label = "Maximum Polling Interval",
		HelpText = "The max number of seconds that can pass between polling intervals.",
		Min = 5
	)]
	public int MaxPollingIntervalInSeconds { get; set; } = 10;

	/// <summary>
	/// The max number of batches that can be running in the task processor at once.
	/// </summary>
	[DataMember( Order = 2 )]
	[JsonConfIntegerEditor(
		HelpText = "The max number of batches that can be running in the task processor at once.",
		Label = "Max Concurrent Batches",
		Min = 1,
		Max = 100,
		DefaultValue = 5
	)]
	public int MaxConcurrentBatches { get; set; } = 5;

	/// <summary>
	/// The max number of jobs that can be running within a batch at once.
	/// </summary>
	[DataMember( Order = 3 )]
	[JsonConfIntegerEditor(
		HelpText = "The max number of jobs that can be running within a batch at once.",
		Label = "Maximum Concurrent Jobs",
		Min = 5,
		Max = 100,
		DefaultValue = 5
	)]
	public int MaxConcurrentJobs { get; set; } = 5;
}
{% endhighlight %}

### Registering and enabling the task queue

Within this step we will define a `CancellationTokenSource` for cancellations of ongoing job processing, and declare our `AppTaskBatchProcessor`, set up our queue ID and task type (we will use one task type here, but multiple could be defined), and ensure that our task queue registration method (`RegisterTaskQueues`) is called.

The task queue registration method (`RegisterTaskQueues`) will be populated in the next step.
{:.note}

{% highlight csharp %}
/// <summary>
/// The entry point for this Vault Application Framework application.
/// </summary>
/// <remarks>Examples and further information available on the developer portal: http://developer.m-files.com/. </remarks>
public class VaultApplication
	: MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>, IUsesTaskQueue
{
	/// <summary>
		/// The token source for task processing cancellation.
		/// </summary>
	private CancellationTokenSource TokenSource { get; set; }

	/// <summary>
	/// The concurrent task processor.
	/// </summary>
	public AppTaskBatchProcessor TaskProcessor { get; set; }

	/// <summary>
	/// The server that this application is running on.
	/// </summary>
	internal static VaultServerAttachment CurrentServer { get; private set; }

	/// <summary>
	/// The task queue ID. This should be unique for your application
	/// so that you don't interfere with other task queues.
	/// </summary>
	public const string ConcurrentTaskQueueId = "MFiles.Samples.ConcurrentTaskQueue.Application.TaskQueueId";
	
	/// <summary>
	/// The task type.
	/// This can be used to have different handlers for different types of task in your queue.
	/// </summary>
	public const string TaskTypeConcurrentTask = "TaskType.ConcurrentTask";

	/// <summary>
	/// Override the start operations so we can register our task processor.
	/// </summary>
	/// <param name="vaultPersistent">Non-transactional Vault object.</param>
	public override void StartOperations(Vault vaultPersistent)
	{
		// Set a reference to the current server reference.
		VaultApplication.CurrentServer = vaultPersistent
			.GetVaultServerAttachments()
			.GetCurrent();

		// Allow the base to process the start operations.
		base.StartOperations(vaultPersistent);

		// Enable polling/processing of the queue.
		this.TaskQueueManager.EnableTaskPolling(true);
	}

	/// <summary>
	/// Registers the task queue used by this application or module.
	/// </summary>
	public void RegisterTaskQueues()
	{
		// TODO: Register the task queue.
	}
}
{% endhighlight %}

Remember that it is important that the queue ID is unique to your application.
{:.note}

### Create the sequential task processor

{% highlight csharp %}
/// <summary>
/// Registers the task queue used by this application or module.
/// </summary>
public void RegisterTaskQueues()
{
	// Create the cancellation token source.
	if (this.TokenSource == null)
		this.TokenSource = new CancellationTokenSource();

	// Create the task processor.
	if (this.TaskProcessor == null)
	{
		// Initialize the task processor.
		this.TaskProcessor = new AppTaskBatchProcessor
		(
			new AppTaskBatchProcessorSettings
			{
				DisableAutomaticProgressUpdates = false,
				PollTasksOnJobCompletion = true,
				MaxConcurrentBatches = this.Configuration.MaxConcurrentBatches,
				MaxConcurrentJobs = this.Configuration.MaxConcurrentJobs,
				PermanentVault = this.PermanentVault,
				EnableAutomaticTaskUpdates = true,
				QueueDef = new TaskQueueDef
				{
					TaskType = TaskQueueManager.TaskType.ApplicationTasks,
					Id = VaultApplication.ConcurrentTaskQueueId,
					ProcessingBehavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorConcurrent,
					MaximumPollingIntervalInSeconds = this.Configuration.MaxPollingIntervalInSeconds,
					LastBroadcastId = ""
				},
				TaskHandlers = new Dictionary<string, TaskProcessorJobHandler>
				{
					/* One task type is handled here, by the ProcessConcurrentTask handler. */
					{ VaultApplication.TaskTypeConcurrentTask, ProcessConcurrentTask }
				},
				TaskQueueManager = this.TaskQueueManager
			},
			this.TokenSource.Token
		);


	}

	// Register the task queue.
	this.TaskProcessor.RegisterTaskQueues();
}

/// <summary>
/// Processes a single job.
/// </summary>
/// <param name="job">Task processor job.</param>
private void ProcessConcurrentTask( TaskProcessorJob job )
{
	// TODO: Process the job itself.
}
{% endhighlight %}

### Implement the task processing method

{% highlight csharp %}
/// <summary>
/// Processes a single job.
/// </summary>
/// <param name="job">Task processor job.</param>
private void ProcessConcurrentTask( TaskProcessorJob job )
{
	// Debug Logging.
	if( this.Configuration.LoggingEnabled )
		SysUtils.ReportInfoToEventLog( $"Concurrent task processing with task id => {job.Data?.Value.Id}." );

	// Ensure cancellation has not been requested.
	job.ThrowIfCancellationRequested();

	// Update the progress of the task in the task queue.
	this.TaskProcessor.UpdateTaskAsAssignedToProcessor( job );

	// Sanity.
	if (null == job.Data?.Value)
	{
		return;
	}

	// Deserialize the directive.
	var dir = TaskQueueDirective.Parse<TaskQueueDirective>( job.Data?.Value );

	// TODO: Perform the processing.
	// Note that the job.Vault reference is not running within a transaction.
	// If transactionality is required then consider calling a vault extension method here.

	// Report back progress.
	this.TaskProcessor.UpdateTaskInfo
	(
		job,
		MFTaskState.MFTaskStateInProgress,
		$"Job processed on {CurrentServer.ServerID}",
		false
	);
}
{% endhighlight %}

## Using custom directives

Each task within the queue can be provided with additional data that can be used during the processing of the job.  These objects typically inherit from `TaskQueueDirective`, and can be parsed out of the job by calling `TaskQueueDirective.Parse<T>`, as shown in the previous code sample.

Custom directive classes can also be used to provide additional data to the method processing the job.  In the example below, a custom directive class is used to allow details about a specific object version to be passed to the job:

{% highlight csharp %}
public class ObjVerExTaskQueueDirective
	: TaskQueueDirective
{
	/// <summary>
	/// Parse-able ObjVerEx string.
	/// </summary>
	public string ObjVerEx { get; set; }
}
{% endhighlight %}

This data can then be retrieved within the task processing method:

{% highlight csharp %}
/// <summary>
/// Processes a single job.
/// </summary>
/// <param name="job">Task processor job.</param>
private void ProcessConcurrentTask( TaskProcessorJob job )
{
	// ... method body left out for clarity

	// Deserialize the directive.
	var dir = TaskQueueDirective.Parse<ObjVerExTaskQueueDirective>( job.Data?.Value );

	// Sanity.
	if(string.IsNullOrWhiteSpace(dir?.ObjVerEx))
		return;

	// Load the object from the directive information.
	var objVerEx = ObjVerEx.Parse(job.Vault, dir.ObjVerEx);

	// TODO: Perform the processing.

}
{% endhighlight %}

The custom directive class must be serializable by `Newtonsoft.JSON`, as it will be converted to a JSON representation then stored as a byte array against the job.
{:.note}

## Adding items to the queue

Items can be added to the queue from elsewhere within the Vault Application Framework application.  In the example below, a task is added to the task queue, but no custom directive is used.

{% highlight csharp %}
// Create a task in the task queue.
var itemId = this.TaskProcessor.CreateApplicationTaskSafe
(
	true, // allow retries
	VaultApplication.ConcurrentTaskQueueId, // The queue to add to.
	VaultApplication.TaskTypeConcurrentTask // The task type.
);
{% endhighlight %}

### Providing data to the task via a directive

If a task requires additional data then a custom directive can be provided when the object is created.  Note that the directive must be provided as a byte array.

{% highlight csharp %}
// Create a task in the task queue.
var itemId = this.TaskProcessor.CreateApplicationTaskSafe
(
(
	true, // allow retries
	VaultApplication.ConcurrentTaskQueueId, // The queue to add to.
	VaultApplication.TaskTypeConcurrentTask // The task type.
	new ObjVerExTaskQueueDirective { ObjVerEx = item.ToString() }.ToBytes()
);
{% endhighlight %}
