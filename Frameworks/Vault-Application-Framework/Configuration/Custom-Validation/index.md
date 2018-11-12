---
layout: page
title: Custom Configuration Validation
includeInSearch: true
breadcrumb: Validation
---

[Version 1]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10)
{:.tag.unavailable title="This functionality is NOT available in version 1.0 of the Vault Application Framework."}
[Version 2]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20)
{:.tag.available title="This functionality is available in version 2.0 of the Vault Application Framework."}

The approach shown below is only compatible with [version 2.0]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-20) of the Vault Application Framework, where the target audience runs M-Files 2018 or higher.  If using [version 1.0]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Versions/#version-10), or to maintain compatibility with M-Files 2015.3 and lower, [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/) should be used instead.
{:.note.warning}

Each configuration node can define a method which executes additional validation of the configuration.  In the sample below, the `CustomValidator` method has been set as the Validator for the configuration node.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF;
using MFiles.VAF.AdminConfigurations;
using MFiles.VAF.Common;
using MFilesAPI;

namespace MFVaultApplication1
{
	[DataContract]
	public class Configuration
	{
		[DataMember]
		public string ConnectionString { get; set; }

	}

	public class VaultApplication
		: VaultApplicationBase, IUsesAdminConfigurations
	{

		private ConfigurationNode<Configuration> config { get; set; }

		public void InitializeAdminConfigurations(IAdminConfigurations adminConfigurations)
		{
			// Add it to the configuration screen.
			this.config = adminConfigurations.AddSimpleConfigurationNode<Configuration>("My Vault Application");
			this.config.Validator = this.CustomValidator;
		}

		private IEnumerable<ValidationFinding> CustomValidator(Configuration configuration)
		{
			ValidationFinding finding = null;

			try
			{
				// Connect to the database to test the connection is valid.
				using (var sqlConnection = new System.Data.SqlClient.SqlConnection(configuration.ConnectionString))
				{
					// Connect to the database.
					sqlConnection.Open();

					// If no exception then report okay.
					finding = new ValidationFinding(
						ValidationFindingType.Ok,
						nameof(Configuration.ConnectionString),
						"Connection successful");

					// Disconnect.
					sqlConnection.Close();
				}
			}
			catch (Exception e)
			{
				// Report an exception.
				finding = new ValidationFinding(
					ValidationFindingType.Error,
					nameof(Configuration.ConnectionString),
					$"Exception connecting to server: {e.Message}");
			}

			// Return the finding.
			yield return finding;
		}
	}
}
{% endhighlight %}

![An example of failed validation](ValidationResult.png)