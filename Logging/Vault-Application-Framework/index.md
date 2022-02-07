---
layout: page
title: Logging in the Vault Application Framework
includeInSearch: true
breadcrumb: VAF
prerelease: true
redirect_from: /Frameworks/Vault-Application-Framework/Logging/
---

This page contains information that is specific to implementing logging within the Vault Application Framework, but does not cover the logging framework in general.  Ensure that you read the [logging page](../) and others in the section thoroughly.
{:.note.warning}

It is strongly recommended that applications utilize the [VAF Extensions library](#using-the-vaf-extensions-library) when implemented logging, as this library deals with initializing the logging framework, ensuring that configuration is validated and applied, and rendering the logging configuration to the application's dashboard.
{:.note}

## Using the VAF Extensions library

There are three steps to using the logging framework with the VAF Extensions library:

1. Ensure that you are referencing at least version `22.2.8-preview` with nuget.  Update your reference if you are targeting an earlier version.
2. Ensure that you are using the `MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<TConfiguration>` base class.
3. Alter your configuration to inherit from `MFiles.VAF.Extensions.Configuration.ConfigurationBase` (or alternative; see below), to expose the logging configuration.

Once done, you can then use the logger from within your code:

```csharp
using MFiles.VAF.Extensions.Dashboards;
using MFiles.VaultApplications.Logging;
namespace extensionstest2
{
	public class VaultApplication
		: MFiles.VAF.Extensions.ConfigurableVaultApplicationBase<Configuration>
	{

		[TaskQueue]
		public const string QueueId = "test.VaultApplication.myQueueId";
		public const string TaskTypeA = "taskTypeA";

		[TaskProcessor(QueueId, TaskTypeA, TransactionMode = TransactionMode.Full)]
		[ShowOnDashboard("Import data", ShowRunCommand = true)]
		public void ProcessBackgroundTask(ITaskProcessingJob<TaskDirective> job)
		{
			this.Logger.Info("hello world");
		}

	}
}
```

Remember to enable logging in your application's configuration in M-Files Admin, otherwise no logs will be generated!
{:.note}

### Exposing logging configuration

The easiest way to expose the logging configuration is to ensure that your top-level configuration class inherits from the class in the VAF Extensions library.  If you have done this then the logging configuration should be visible, and logging should function if enabled:

```csharp
[DataContract]
public class Configuration
		: MFiles.VAF.Extensions.Configuration.ConfigurationBase
{
}
```

In some situations you may not want to expose the logging configuration in this way, or may wish to control how the logging configuration is displayed.  You can optionally choose to instead implement `MFiles.VAF.Extensions.Configuration.IConfigurationWithLoggingConfiguration` yourself in your top-level configuration class:

```csharp
public class MyConfiguration
	: MFiles.VAF.Extensions.Configuration.IConfigurationWithLoggingConfiguration
{
	[DataMember]
	public NLogLoggingConfiguration MyLoggingConfiguration { get; set; } = new NLogLoggingConfiguration();

	/// <inheritdoc />
	public ILoggingConfiguration GetLoggingConfiguration()
		=> this.MyLoggingConfiguration;
}
```

Note that the logging configuration itself could be held anywhere in your configuration, provided that the top-level class implements the above interface, and the `GetLoggingConfiguration` returns the configured value.
{:.note}

## Implementing the functionality yourself

If you cannot use the VAF Extensions, then using the logging framework from a plain Vault Application is also possible.  The example below uses the VAF 2.3 and older versions of the framework may need some additional changes:

```csharp
using MFiles.VAF.AppTasks;
using MFiles.VAF.Configuration;
using MFiles.VAF.Extensions;
using MFiles.VAF.Extensions.Dashboards;
using MFiles.VaultApplications.Logging;
using MFiles.VaultApplications.Logging.Resources;
using MFilesAPI;
using System.Collections.Generic;

namespace Samples.VAF
{
	public class VaultApplication
		: ConfigurableVaultApplicationBase<Configuration>
	{

		/// <summary>
		/// Registers a task queue with ID "LoggingTaskQueue".
		/// </summary>
		// Note: this queue ID must be unique to this application!
		[TaskQueue]
		public const string TaskQueueID = "LoggingTaskQueue";
		public const string TaskType = "LoggingTestType";

		/// <summary>
		/// Processes items of type <see cref="TaskType" /> on queue <see cref="TaskQueueID" />
		/// </summary>
		[TaskProcessor(TaskQueueID, TaskType, TransactionMode = TransactionMode.Unsafe)]
		[ShowOnDashboard("Log something", ShowRunCommand = true)]
		public void MyTaskProcessor(ITaskProcessingJob<TaskDirective> job)
		{
			this.Logger.Info($"Hello, world");
		}

		#region Boilerplate required

		public ILogger Logger { get; private set; }

		protected override void StartApplication()
		{
			base.StartApplication();

#if DEBUG
			// Enable logging to any attached debugger, but do not launch the debugger.
			LogManager.EnableLoggingToAttachedDebugger(launchDebugger: false);
#endif

			LogManager.Initialize(this.PermanentVault, this.Configuration?.GetLoggingConfiguration());
			this.Logger = LogManager.GetLogger(this.GetType());
			this.Logger?.Info("Logging started");

		}

		protected override void UninitializeApplication(Vault vault)
		{
			this.Logger?.Info("Logging stopping");
			LogManager.Shutdown();
			base.UninitializeApplication(vault);
		}

		protected override void OnConfigurationUpdated(Configuration oldConfiguration, bool updateExternals)
		{
			this.Logger?.Info("Logging configuration updating");
			base.OnConfigurationUpdated(oldConfiguration, updateExternals);
			LogManager.UpdateConfiguration(this.Configuration?.GetLoggingConfiguration());
			this.Logger?.Info("Logging configuration updated");
		}

		/// <inheritdoc />
		// Sets up the combined resource manager so that the strings from the logging
		// exceptions and configuration work.
		protected override SecureConfigurationManager<Configuration> GetConfigurationManager()
		{
			var configurationManager = base.GetConfigurationManager();

			// Set the resource manager for the configuration manager.
			var combinedResourceManager = new CombinedResourceManager(true, configurationManager.ResourceManager);

			// Set the resource manager for the configuration.
			configurationManager.ResourceManager = combinedResourceManager;
			return configurationManager;
		}

		protected override IEnumerable<ValidationFinding> CustomValidation(Vault vault, Configuration config)
		{
			foreach(var finding in base.CustomValidation(vault, config) ?? new ValidationFinding[0])
				yield return finding;
			foreach(var finding in config?.GetLoggingConfiguration()?.GetValidationFindings() ?? new ValidationFinding[0])
				yield return finding;
		}

		#endregion


	}
}
```
