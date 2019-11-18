---
layout: page
title: A step-by-step guide to upgrading a Vault Application Framework 2.0 application to use the Vault Application Framework 2.1
includeInSearch: true
breadcrumb: Upgrading VAF 2.0 to 2.1
---

Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.
{:.note.warning}

This document details the process involved in upgrading an existing M-Files Vault Application Framework 2.0 application to use the Vault Application Framework 2.1 runtime.  It also details the process of migrating to the new base class, including changes needed to support the new configuration, configuration validation, and dashboard-generation approaches.

## The sample VAF 2.0 application

The below application - in a single file, to make it easy to follow - includes some standard VAF 2.0 "Configuration" functionality, including:

* A function to generate a custom dashboard,
* A custom configuration class,
* A custom validation function for the configuration,
* An event handler executed when the configuration changes.

{% highlight csharp %}
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFiles.VAF.Configuration;
using Newtonsoft.Json;

namespace MyCompany.MyProduct.MyVaultApplication1
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{
		/// <summary>
		/// The current running configuration.
		/// </summary>
		private ConfigurationNode<Configuration> config { get; set; }

		/// <inheritdoc />
		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
			// Create the configuration.
			this.config = adminConfigurations.AddSimpleConfigurationNode<Configuration>(
				"My Vault Application", 
				this.GenerateDashboard);

			// Provide some custom dashboard validation.
			this.config.Validator = this.ValidateConfiguration;

			// React when the configuration changes
			this.config.Changed += (Configuration oldConfig, Configuration newConfig) =>
			{
				// Build up the string to log.
				var stringBuilder = new StringBuilder();
				stringBuilder.AppendLine("Configuration changed:");
				stringBuilder.AppendLine($"Old: {JsonConvert.SerializeObject(oldConfig, Formatting.Indented)}");
				stringBuilder.AppendLine($"New: {JsonConvert.SerializeObject(newConfig, Formatting.Indented)}");

				// Log the string.
				SysUtils.ReportToEventLog(
					stringBuilder.ToString(),
					EventLogEntryType.Information);
			};
		}

		/// <summary>
		/// Validates that the configuration is correct.
		/// </summary>
		/// <param name="newConfig">The new configuration data.</param>
		/// <returns>Any validation findings.</returns>
		private IEnumerable<ValidationFinding> ValidateConfiguration(Configuration newConfig)
		{
			// Sanity.
			if (null == newConfig)
				newConfig = new Configuration();

			// Username must be set.
			if (string.IsNullOrWhiteSpace(newConfig.Username))
				yield return new ValidationFinding(
					ValidationFindingType.Error,
					nameof(Configuration.Username),
					"Username cannot be empty");

			// Password must be set.
			if (string.IsNullOrWhiteSpace(newConfig.Password))
				yield return new ValidationFinding(
					ValidationFindingType.Error,
					nameof(Configuration.Password),
					"Password cannot be empty");
		}

		/// <summary>
		/// Generates the dashboard for the application.
		/// </summary>
		/// <returns></returns>
		private string GenerateDashboard()
		{
			return $"<h3>This is my dashboard.</h3>";
		}
	}

	/// <summary>
	/// Defines the application's configuration data.
	/// </summary>
	[DataContract]
	public class Configuration
	{
		/// <summary>
		/// The username to use.
		/// </summary>
		[DataMember]
		public string Username { get; set; }
		
		/// <summary>
		/// The password to use.
		/// </summary>
		[DataMember]
		public string Password { get; set; }
	}
}
{% endhighlight %}

## Migrating to the VAF 2.1 runtime

### Upgrading the VAF nuget reference

To migrate to the Vault Application Framework 2.1 runtime we need to update the nuget package reference that is being used:

* Open the existing project in Visual Studio.
* Locate the `Solution Explorer` window, and find the Vault Application Framework project within the solution.
* Right-click on the project name and select `Manage NuGet Packages...`
* Select the existing `M-Files.VAF` reference and click the `Update` button to upgrade to the latest published version.
* Expand the project's `References` node and **delete** the reference to `MFilesAPI`.  This is needed as the API is referenced in a different way in VAF 2.1, and the old reference is now a duplicate.

### Migrating to the new base class

The new base class changes the approach used in older Vault Application Framework releases.  The new `ConfigurableVaultApplication<T>` base class instead implements default behaviour for common configuration functionality which can then be overridden by your application if needed.

* Remove the explicit implementation of `IUsesAdminConfigurations`.
* Change the inherited class to `MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>`.  Remember that the `Configuration` class is the class that holds our configuration structures.
* Change the old `IUsesAdminConfigurations.InitializeAdminConfigurations` to use the new approach:
	* By default the new class uses the name of the application from the `appdef.xml` file for the configuration node.  If you wish something different to be shown then override the `GetName` implementation.
	* Move the configuration changed implementation into an override of `OnConfigurationUpdated`.

{% highlight csharp %}
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using Newtonsoft.Json;

namespace MyCompany.MyProduct.MyVaultApplication1
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	public class VaultApplication
		: MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>
	{

		#region Overrides of ConfigurableVaultApplicationBase<Configuration>

		/// <inheritdoc />
		protected override void OnConfigurationUpdated(
			IConfigurationRequestContext context,
			ClientOperations clientOps,
			Configuration oldConfiguration)
		{
			// Call the base implementation.
			base.OnConfigurationUpdated(context, clientOps, oldConfiguration);

			// Build up the string to log.
			var stringBuilder = new StringBuilder();
			stringBuilder.AppendLine("Configuration changed:");
			stringBuilder.AppendLine($"Old: {JsonConvert.SerializeObject(oldConfiguration, Formatting.Indented)}");
			stringBuilder.AppendLine($"New: {JsonConvert.SerializeObject(this.Configuration, Formatting.Indented)}");

			// Log the string.
			SysUtils.ReportToEventLog(
				stringBuilder.ToString(),
				EventLogEntryType.Information);
		}

		#endregion


		/// <summary>
		/// Validates that the configuration is correct.
		/// </summary>
		/// <param name="newConfig">The new configuration data.</param>
		/// <returns>Any validation findings.</returns>
		private IEnumerable<ValidationFinding> ValidateConfiguration(Configuration newConfig)
		{
			// Sanity.
			if (null == newConfig)
				newConfig = new Configuration();

			// Username must be set.
			if (string.IsNullOrWhiteSpace(newConfig.Username))
				yield return new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Username),
					"Username cannot be empty");

			// Password must be set.
			if (string.IsNullOrWhiteSpace(newConfig.Password))
				yield return new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Password),
					"Password cannot be empty");
		}

		/// <summary>
		/// Generates the dashboard for the application.
		/// </summary>
		/// <returns></returns>
		private string GenerateDashboard()
		{
			return $"<h3>This is my dashboard.</h3>";
		}
	}

	/// <summary>
	/// Defines the application's configuration data.
	/// </summary>
	[DataContract]
	public class Configuration
	{
		/// <summary>
		/// The username to use.
		/// </summary>
		[DataMember]
		public string Username { get; set; }
		
		/// <summary>
		/// The password to use.
		/// </summary>
		[DataMember]
		public string Password { get; set; }
	}
}
{% endhighlight %}

This code will not work correctly until the [Configuration](#configuration), [Validation](#validation), and [Dashboard generation](#dashboard-generation) steps are also completed.
{:note.warning}

#### Configuration

Note that the new base class uses a different location in Named-Value Storage to hold your application's configuration.  This means that users migrating from a VAF 2.0 build of your application to a VAF 2.1 build of your application will be reset to the default application configuration.  You must guide users on how to migrate their configuration as appropriate as part of the application upgrade.
{:.note .warning}

The core configuration will now work as before, but we can use the new [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/Security) to make the password field behave correctly in the M-Files Admin area.  To do this we must add the `[Security(IsPassword = true)]` attribute to the password property:

{% highlight csharp %}
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using Newtonsoft.Json;

namespace MyCompany.MyProduct.MyVaultApplication1
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	public class VaultApplication
		: MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>
	{

		#region Overrides of ConfigurableVaultApplicationBase<Configuration>

		/// <inheritdoc />
		protected override void OnConfigurationUpdated(
			IConfigurationRequestContext context,
			ClientOperations clientOps,
			Configuration oldConfiguration)
		{
			// Call the base implementation.
			base.OnConfigurationUpdated(context, clientOps, oldConfiguration);

			// Build up the string to log.
			var stringBuilder = new StringBuilder();
			stringBuilder.AppendLine("Configuration changed:");
			stringBuilder.AppendLine($"Old: {JsonConvert.SerializeObject(oldConfiguration, Formatting.Indented)}");
			stringBuilder.AppendLine($"New: {JsonConvert.SerializeObject(this.Configuration, Formatting.Indented)}");

			// Log the string.
			SysUtils.ReportToEventLog(
				stringBuilder.ToString(),
				EventLogEntryType.Information);
		}

		#endregion


		/// <summary>
		/// Validates that the configuration is correct.
		/// </summary>
		/// <param name="newConfig">The new configuration data.</param>
		/// <returns>Any validation findings.</returns>
		private IEnumerable<ValidationFinding> ValidateConfiguration(Configuration newConfig)
		{
			// Sanity.
			if (null == newConfig)
				newConfig = new Configuration();

			// Username must be set.
			if (string.IsNullOrWhiteSpace(newConfig.Username))
				yield return new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Username),
					"Username cannot be empty");

			// Password must be set.
			if (string.IsNullOrWhiteSpace(newConfig.Password))
				yield return new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Password),
					"Password cannot be empty");
		}

		/// <summary>
		/// Generates the dashboard for the application.
		/// </summary>
		/// <returns></returns>
		private string GenerateDashboard()
		{
			return $"<h3>This is my dashboard.</h3>";
		}
	}

	/// <summary>
	/// Defines the application's configuration data.
	/// </summary>
	[DataContract]
	public class Configuration
	{
		/// <summary>
		/// The username to use.
		/// </summary>
		[DataMember]
		public string Username { get; set; }
		
		/// <summary>
		/// The password to use.
		/// </summary>
		[DataMember]
		[Security(IsPassword = true)]
		public string Password { get; set; }
	}
}
{% endhighlight %}

This code will not work correctly until the [Validation](#validation) and [Dashboard generation](#dashboard-generation) steps are also completed.
{:note.warning}

##### Validation

Currently the `ValidateConfiguration` method is not being called.  We need to migrate this logic to an override of `CustomValidation`:

{% highlight csharp %}
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using MFilesAPI;
using Newtonsoft.Json;

namespace MyCompany.MyProduct.MyVaultApplication1
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	public class VaultApplication
		: MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>
	{

		#region Overrides of ConfigurableVaultApplicationBase<Configuration>

		/// <inheritdoc />
		protected override void OnConfigurationUpdated(
			IConfigurationRequestContext context,
			ClientOperations clientOps,
			Configuration oldConfiguration)
		{
			// Call the base implementation.
			base.OnConfigurationUpdated(context, clientOps, oldConfiguration);

			// Build up the string to log.
			var stringBuilder = new StringBuilder();
			stringBuilder.AppendLine("Configuration changed:");
			stringBuilder.AppendLine($"Old: {JsonConvert.SerializeObject(oldConfiguration, Formatting.Indented)}");
			stringBuilder.AppendLine($"New: {JsonConvert.SerializeObject(this.Configuration, Formatting.Indented)}");

			// Log the string.
			SysUtils.ReportToEventLog(
				stringBuilder.ToString(),
				EventLogEntryType.Information);
		}

		/// <inheritdoc />
		protected override IEnumerable<ValidationFinding> CustomValidation(Vault vault, Configuration config)
		{
			// The base implementation should not return any, but handle it in case that changes in the future.
			var validationFindings =
				new List<ValidationFinding>(base.CustomValidation(vault, config) ?? new List<ValidationFinding>());

			// Sanity.
			if (null == config)
				config = new Configuration();

			// Username must be set.
			if (string.IsNullOrWhiteSpace(config.Username))
				validationFindings.Add(new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Username),
					"Username cannot be empty"));

			// Password must be set.
			if (string.IsNullOrWhiteSpace(config.Password))
				validationFindings.Add(new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Password),
					"Password cannot be empty"));

			return validationFindings;
		}

		#endregion

		/// <summary>
		/// Generates the dashboard for the application.
		/// </summary>
		/// <returns></returns>
		private string GenerateDashboard()
		{
			return $"<h3>This is my dashboard.</h3>";
		}
	}

	/// <summary>
	/// Defines the application's configuration data.
	/// </summary>
	[DataContract]
	public class Configuration
	{
		/// <summary>
		/// The username to use.
		/// </summary>
		[DataMember]
		public string Username { get; set; }
		
		/// <summary>
		/// The password to use.
		/// </summary>
		[DataMember]
		[Security(IsPassword = true)]
		public string Password { get; set; }
	}
}
{% endhighlight %}

This code will not work correctly until the [Dashboard generation](#dashboard-generation) step is also completed.
{:note.warning}

#### Dashboard generation

Currently the `GenerateDashboard` method is not being called.  We need to migrate this logic to an override of `GetDashboardContent`:

{% highlight csharp %}
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using MFilesAPI;
using Newtonsoft.Json;

namespace MyCompany.MyProduct.MyVaultApplication1
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	public class VaultApplication
		: MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>
	{

		#region Overrides of ConfigurableVaultApplicationBase<Configuration>

		/// <inheritdoc />
		protected override void OnConfigurationUpdated(
			IConfigurationRequestContext context,
			ClientOperations clientOps,
			Configuration oldConfiguration)
		{
			// Call the base implementation.
			base.OnConfigurationUpdated(context, clientOps, oldConfiguration);

			// Build up the string to log.
			var stringBuilder = new StringBuilder();
			stringBuilder.AppendLine("Configuration changed:");
			stringBuilder.AppendLine($"Old: {JsonConvert.SerializeObject(oldConfiguration, Formatting.Indented)}");
			stringBuilder.AppendLine($"New: {JsonConvert.SerializeObject(this.Configuration, Formatting.Indented)}");

			// Log the string.
			SysUtils.ReportToEventLog(
				stringBuilder.ToString(),
				EventLogEntryType.Information);
		}

		/// <inheritdoc />
		protected override IEnumerable<ValidationFinding> CustomValidation(Vault vault, Configuration config)
		{
			// The base implementation should not return any, but handle it in case that changes in the future.
			var validationFindings =
				new List<ValidationFinding>(base.CustomValidation(vault, config) ?? new List<ValidationFinding>());

			// Sanity.
			if (null == config)
				config = new Configuration();

			// Username must be set.
			if (string.IsNullOrWhiteSpace(config.Username))
				validationFindings.Add(new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Username),
					"Username cannot be empty"));

			// Password must be set.
			if (string.IsNullOrWhiteSpace(config.Password))
				validationFindings.Add(new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Password),
					"Password cannot be empty"));

			return validationFindings;
		}

		/// <inheritdoc />
		public override string GetDashboardContent(IConfigurationRequestContext context)
		{
			return $"<h3>This is my dashboard.</h3>";
		}

		#endregion

	}

	/// <summary>
	/// Defines the application's configuration data.
	/// </summary>
	[DataContract]
	public class Configuration
	{
		/// <summary>
		/// The username to use.
		/// </summary>
		[DataMember]
		public string Username { get; set; }
		
		/// <summary>
		/// The password to use.
		/// </summary>
		[DataMember]
		[Security(IsPassword = true)]
		public string Password { get; set; }
	}
}
{% endhighlight %}

## The final VAF 2.1 application

Once converted, the final code should look like the below.  Remember that the VAF 2.0 configuration data will not be migrated to the updated VAF 2.1 approach, so you must guide your users on how to migrate their configuration properly.

{% highlight csharp %}
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using MFilesAPI;
using Newtonsoft.Json;

namespace MyCompany.MyProduct.MyVaultApplication1
{
	/// <summary>
	/// The entry point for this Vault Application Framework application.
	/// </summary>
	public class VaultApplication
		: MFiles.VAF.Core.ConfigurableVaultApplicationBase<Configuration>
	{

		#region Overrides of ConfigurableVaultApplicationBase<Configuration>

		/// <inheritdoc />
		protected override void OnConfigurationUpdated(
			IConfigurationRequestContext context,
			ClientOperations clientOps,
			Configuration oldConfiguration)
		{
			// Call the base implementation.
			base.OnConfigurationUpdated(context, clientOps, oldConfiguration);

			// Build up the string to log.
			var stringBuilder = new StringBuilder();
			stringBuilder.AppendLine("Configuration changed:");
			stringBuilder.AppendLine($"Old: {JsonConvert.SerializeObject(oldConfiguration, Formatting.Indented)}");
			stringBuilder.AppendLine($"New: {JsonConvert.SerializeObject(this.Configuration, Formatting.Indented)}");

			// Log the string.
			SysUtils.ReportToEventLog(
				stringBuilder.ToString(),
				EventLogEntryType.Information);
		}

		/// <inheritdoc />
		protected override IEnumerable<ValidationFinding> CustomValidation(Vault vault, Configuration config)
		{
			// The base implementation should not return any, but handle it in case that changes in the future.
			var validationFindings =
				new List<ValidationFinding>(base.CustomValidation(vault, config) ?? new List<ValidationFinding>());

			// Sanity.
			if (null == config)
				config = new Configuration();

			// Username must be set.
			if (string.IsNullOrWhiteSpace(config.Username))
				validationFindings.Add(new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Username),
					"Username cannot be empty"));

			// Password must be set.
			if (string.IsNullOrWhiteSpace(config.Password))
				validationFindings.Add(new ValidationFinding(
					ValidationFindingType.Error,
					nameof(this.Configuration.Password),
					"Password cannot be empty"));

			return validationFindings;
		}

		/// <inheritdoc />
		public override string GetDashboardContent(IConfigurationRequestContext context)
		{
			return $"<h3>This is my dashboard.</h3>";
		}

		#endregion

	}

	/// <summary>
	/// Defines the application's configuration data.
	/// </summary>
	[DataContract]
	public class Configuration
	{
		/// <summary>
		/// The username to use.
		/// </summary>
		[DataMember]
		public string Username { get; set; }
		
		/// <summary>
		/// The password to use.
		/// </summary>
		[DataMember]
		[Security(IsPassword = true)]
		public string Password { get; set; }
	}
}
{% endhighlight %}
