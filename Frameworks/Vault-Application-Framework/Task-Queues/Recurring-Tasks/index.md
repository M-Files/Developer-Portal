---
layout: page
title: Recurring tasks in Vault Application Framework applications
includeInSearch: true
breadcrumb: Recurring tasks
requiredMFilesServerVersion: 20.5
requiredVaultApplicationFrameworkVersion: 2.3
redirect_from:
  - /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Recurring-Tasks/
  - /Frameworks/Vault-Application-Framework/Multi-Server-Mode/Task-Queues/Recurring-Tasks/
---

Unlike previous approaches such as background operations, [task queues](../) themselves do not directly have a concept of recurring tasks.  Instead you must use the `Completed` event from one task execution to schedule the subsequent execution.  This is possible using the [VAF directly](#using-the-native-functionality), or can be done using helper attributes from the [VAF Extensions library](#using-the-vaf-extensions-library).

## Using the native functionality

To recur a task you must do two things:

1. Ensure that there is a job scheduled when the application starts (this is your initial execution).
2. React to the job's `Completed` event to schedule the next iteration.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ImportDataFromRemoteSystemTaskType = "ImportDataFromRemoteSystem";

	/// <inheritdoc />
	protected override void InitializeTaskManager()
	{
		// Allow the task manager to be initialized.
		base.InitializeTaskManager();

		// If we do not have a task manager then die.
		if (null == this.TaskManager)
			return;

		// Cancel anything that's scheduled.
		this.CancelFutureExecutions(QueueId, ImportDataFromRemoteSystemTaskType);

		// Schedule an execution for now.
		this.TaskManager.AddTask(this.PermanentVault, QueueId, ImportDataFromRemoteSystemTaskType);
	}

	protected virtual void CancelFutureExecutions(string queueId, string taskType = null)
	{

		// Get all future executions of this type in this queue.
		List<TaskInfo<TaskDirective>> futureExecutions = new List<TaskInfo<TaskDirective>>();
		{
			var query = new TaskQuery();
			query.Queue(queueId);
			if (false == string.IsNullOrWhiteSpace(taskType))
				query.TaskType(taskType);
			query.TaskState(MFTaskState.MFTaskStateWaiting);

			futureExecutions = query
				.FindTasks<TaskDirective>(this.TaskManager);
		}

		// Cancel any future executions.
		foreach (var execution in futureExecutions)
		{
			try
			{
				this.TaskManager.CancelWaitingTask
				(
					this.PermanentVault,
					execution.TaskId
				);
			}
			catch
			{
				SysUtils.ReportInfoToEventLog($"Could not cancel task with id {execution.TaskId}");
			}
		}
	}

	[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
	public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
	{
		// Add a handler to re-schedule the job when it completes.
		job.Completed += (a, b) =>
		{
			// Cancel anything scheduled.
			this.CancelFutureExecutions(QueueId, ImportDataFromRemoteSystemTaskType);

			// Schedule the next execution.
			this.TaskManager.AddTask
			(
				this.PermanentVault,
				QueueId, 
				ImportDataFromRemoteSystemTaskType, 
				job.Directive, 
				DateTime.UtcNow.AddMinutes(10) // Re-schedule for 10 minutes
			);
		};

		// TODO: Process the job.
	}

}
```

## Using the VAF Extensions library

The VAF Extensions library is an open-source, community-driven set of extensions that work with the M-Files Vault Application Framework.  It is not an official M-Files application and, as such, you should consider whether it is appropriate to use in your VAF applications.
{:.note.warning}

The Vault Application Framework Extensions library contains helper attributes that can be used to more easily control recurring tasks.  These typically involve exposing a configurable element and relating that to a queue and task type.  **Note that the base class for your application must be `MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<T>` for this to work.**

### Recurring on an interval

The below code exposes a timespan (`Interval`) on the application's configuration page.  The interval defaults to ten minutes, but can be altered by an administrator.  By using the `[RecurringOperationConfiguration]` attribute, the application will automatically ensure that the appropriate task processor is configured to run every ten minutes.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ImportDataFromRemoteSystemTaskType = "ImportDataFromRemoteSystem";

	[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
	public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
	{
		// TODO: Connect to the remote system and import data.
	}
}
[DataContract]
public class Configuration
{
	// The import will run every 10 minutes but can be configured via the M-Files Admin software.
	[DataMember]
	[RecurringOperationConfiguration(VaultApplication.QueueId, VaultApplication.ImportDataFromRemoteSystemTaskType)]
	public TimeSpan Interval { get; set; } = new TimeSpan(0, 10, 0);
}
```

### Recurring on a schedule

The below code exposes a schedule (`ImportDataSchedule`) on the application's configuration page.  The schedule defaults to running at 3am every day, but can be altered by an administrator.  By using the `[RecurringOperationConfiguration]` attribute, the application will automatically ensure that the appropriate task processor is configured to run every ten minutes.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ImportDataFromRemoteSystemTaskType = "ImportDataFromRemoteSystem";

	[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
	public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
	{
		// TODO: Connect to the remote system and import data.
	}
}
[DataContract]
public class Configuration
{
	// The import will run daily at 3am but can be configured via the M-Files Admin software.
	[DataMember]
	[RecurringOperationConfiguration(VaultApplication.QueueId, VaultApplication.ImportDataFromRemoteSystemTaskType)]
	public Schedule ImportDataSchedule { get; set; } = new Schedule()
	{
		Enabled = true,
		Triggers = new List<Trigger>()
		{
			new DailyTrigger()
			{
				TriggerTimes = new List<TimeSpan>()
				{
					new TimeSpan(3, 0, 0) // 3am
				}
			}
		}
	};
}
```

### Allowing an administrator to swap between an interval and a schedule

The below code exposes a `Frequency` on the application's configuration page, which defaults to an interval of every hour.  Therefore, by default, the processor will automatically be run every hour.  The administrator, however, can change this to either a different interval or a different schedule; they could easily change the processor to only run once per day at 3am.

```csharp
public class VaultApplication
	: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
{

	[TaskQueue]
	public const string QueueId = "sampleApplication.VaultApplication";
	public const string ImportDataFromRemoteSystemTaskType = "ImportDataFromRemoteSystem";

	[TaskProcessor(QueueId, ImportDataFromRemoteSystemTaskType)]
	public void ImportDataFromRemoteSystem(ITaskProcessingJob<TaskDirective> job)
	{
		// TODO: Connect to the remote system and import data.
	}
}
[DataContract]
public class Configuration
{
	// The import will run every hour  but can be configured via the M-Files Admin software.
	[DataMember]
	[RecurringOperationConfiguration
	(
		VaultApplication.QueueId,
		VaultApplication.ImportDataFromRemoteSystemTaskType,
		Label = "Import Frequency",
		DefaultValue = "Once per hour"
	)]
	public Frequency Frequency { get; set; } = TimeSpan.FromHours(1);
}
```

The `Frequency` instance can be set to a TimeSpan (in which case the default is to run on an interval) or a Schedule (in which case the default is to run according to that schedule).  You may consider setting a `DefaultValue` in the attribute that describes the default frequency.
{:.note}

### Implementing your own logic

The `RecurringOperationConfiguration` attribute can be used with any property or field whose type implements `IRecurrenceConfiguration` (plus `TimeSpan`, but that's a special case).  If you want to create your own logic then you can create a class that implements this interface and use it in your configuration:

```csharp
[DataContract]
public class RandomRecurrenceConfiguration
	: IRecurrenceConfiguration
{
	private static Random rnd = new Random();

	[DataMember]
	[JsonConfIntegerEditor(Min = 5, Max = 1000)]
	public int MinimumMinutes { get;set; } = 5;
	
	[DataMember]
	[JsonConfIntegerEditor(Min = 5, Max = 1000)]
	public int MaximumMinutes { get;set; } = 200;
	

	/// <inheritdoc />
	public string ToDashboardDisplayString()
	{
		return $"<p>Runs randomly between {this.MinimumMinutes} and {this.MaximumMinutes} after the last run time.</p>";
	}

	/// <inheritdoc />
	public DateTime? GetNextExecution(DateTime? after = null)
	{
		// Create a random interval.
		var interval = TimeSpan.FromMinutes(rnd.Next(this.MinimumMinutes, this.MaximumMinutes));

		// Return the next-run time.
		return (after ?? DateTime.UtcNow).Add(interval);
	}
}

// Use the custom logic.
[DataContract]
public class Configuration
{
	[DataMember]
	[RecurringOperationConfiguration
	(
		VaultApplication.QueueId,
		VaultApplication.UploadToRemoteSystemTaskType,
		DefaultValue = "Runs randomly throughout the day"
	)]
	public RandomRecurrenceConfiguration TaskOneSchedule { get; set; } = new RandomRecurrenceConfiguration();
}
```