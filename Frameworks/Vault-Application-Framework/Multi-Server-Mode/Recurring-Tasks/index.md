---
layout: page
title: Recurring tasks in Multi-Server Mode Vault Application Framework applications
includeInSearch: true
breadcrumb: Recurring tasks
prerelease: true
requiredMFilesServerVersion: 20.5
---

The approach shown below is only compatible with version 2.2(and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

The code listed below is available within the [M-Files Samples and Libraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/MultiServerMode/Samples/VAF/MultiServerMode/RecurringTask).
{:.note .github}

Recurring tasks can be created through the use of a [task queue](../Task-Queues).  Each job should, when processed, re-schedule itself to run once it is completed.

## Creating a recurring task

Creating a recurring task broadly falls into four steps:

1. Ensure that you implement `IUsesTaskQueue`.
2. Create the task processor.
3. Scheduling the task execution.
4. Ensure that the task runs again once the scheduled execution completes.

### Create the task processor

The code below creates a [concurrent task queue](../Task-Queues/Concurrent/).  More details on the specific functionality of a concurrent task queue can be found on the dedicated page.
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
	public const string BackgroundOperationTaskQueueId = "MFiles.Samples.RecurringBackgroundOperation.Application.TaskQueueId";
	
	/// <summary>
	/// The task type.
	/// This can be used to have different handlers for different types of task in your queue.
	/// </summary>
	public const string TaskTypeHourlyRecurringTask = "TaskType.HourlyRecurringTask";

	/// <summary>
	/// Override the start operations so we can register our task processor.
	/// </summary>
	/// <param name="vaultPersistent">Non-transactional Vault object.</param>
	public override void StartOperations(Vault vaultPersistent)
	{
		// Allow the base to process the start operations.
		base.StartOperations(vaultPersistent);

		// Set a reference to the current server reference.
		VaultApplication.CurrentServer = vaultPersistent
			.GetVaultServerAttachments()
			.GetCurrent();

		// Enable polling/processing of the queue.
		this.TaskQueueManager.EnableTaskPolling(true);
	}

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
					QueueDef = new TaskQueueDef
					{
						TaskType = TaskQueueManager.TaskType.Both,
						Id = VaultApplication.BackgroundOperationTaskQueueId,
						ProcessingBehavior = MFTaskQueueProcessingBehavior.MFProcessingBehaviorConcurrent,
						MaximumPollingIntervalInSeconds = this.Configuration.MaxPollingIntervalInSeconds,
						LastBroadcastId = ""
					},
					PermanentVault = this.PermanentVault,
					MaxConcurrentBatches = this.Configuration.MaxConcurrentBatches,
					MaxConcurrentJobs = this.Configuration.MaxConcurrentJobs,
					TaskHandlers = new Dictionary<string, TaskProcessorJobHandler>
					{
						{ VaultApplication.TaskTypeHourlyRecurringTask, ProcessHourlyTask }
					},
					TaskQueueManager = this.TaskQueueManager,
					EnableAutomaticTaskUpdates = true,
					DisableAutomaticProgressUpdates = false,
					PollTasksOnJobCompletion = true
				},
				this.TokenSource.Token
			);

			// Schedule the hourly task.
			ScheduleHourlyTask();

		}

		// Register the task queue.
		this.TaskProcessor.RegisterTaskQueues();
	}
}
{% endhighlight %}

### Scheduling the task execution

Consider the situation of a task that should be run hourly.  The first step is to locate any tasks that represent scheduled execution of this process in the future, and ensure that they are marked as cancelled.  This stops the task being processed multiple times:

{% highlight csharp %}
/// <summary>
/// Cancels pre-existing hourly tasks in the waiting or in progress state
/// and schedules a new task to process in one hour.
/// </summary>
private void ScheduleHourlyTask()
{
	try
	{
		// Find any tasks of the appropriate type that are already scheduled.
		ApplicationTaskInfos tasksToCancel = TaskQueueAdministrator.FindTasks
		(
			this.PermanentVault,
			VaultApplication.BackgroundOperationTaskQueueId,
			t => t.Type == VaultApplication.TaskTypeHourlyRecurringTask,
			new[] { MFTaskState.MFTaskStateWaiting, MFTaskState.MFTaskStateInProgress }
		);

		// Cancel the pre-existing hourly tasks.
		foreach (ApplicationTaskInfo taskInfo in tasksToCancel)
			this.TaskProcessor.UpdateCancelledJobInTaskQueue
			(
				taskInfo.ToApplicationTask(),
				string.Empty,
				"Superseded."
			);
	}
	finally
	{
		// Schedule the task to execute in 1 hour.
		string nextHourlyTaskId = this.TaskProcessor.CreateApplicationTaskSafe
		(
			true,
			VaultApplication.BackgroundOperationTaskQueueId,
			VaultApplication.TaskTypeHourlyRecurringTask,
			null,
			DateTime.Now.AddHours(1).ToUniversalTime()
		);

		// Debug Logging.
		if (this.Configuration.LoggingEnabled)
			Debug.WriteLine($"Hourly task scheduled with task id => {nextHourlyTaskId}.");
	}
}
{% endhighlight %}

### Recurring

The task defined above will be processed in one hour by a method named `ProcessHourlyTask`, but the task itself will not repeat.  To do so we must react to the `ProcessingComplete` event and re-schedule the same task:

{% highlight csharp %}
/// <summary>
/// Processes a re-occuring hourly task.
/// </summary>
/// <param name="job">The hourly task job.</param>
private void ProcessHourlyTask( TaskProcessorJob job )
{
	// Debug Logging.
	if( this.Configuration.LoggingEnabled )
		Debug.WriteLine( $"Hourly task processing with task id => {job.Data?.Value.Id}." );

	// Bind to the completed event ( called always ) of the job.
	// That way even if the job is canceled, fails, or finishes successfully
	// ...we always schedule the next run.
	job.ProcessingCompleted += ( s, op ) =>
		this.TaskProcessor.CreateApplicationTaskSafe(
		true,
		VaultApplication.BackgroundOperationTaskQueueId,
		VaultApplication.TaskTypeHourlyRecurringTask,
		null,
		DateTime.Now.AddHours( 1 ).ToUniversalTime() );

	// The hourly task has come due and is being processed.
	job.ThrowIfCancellationRequested();

	// Update has having been assigned.
	this.TaskProcessor.UpdateTaskAsAssignedToProcessor( job );

	// TODO: Do hourly work here...
}
{% endhighlight %}
