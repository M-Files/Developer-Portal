---
layout: page
title: .NET Configuration Files
includeInSearch: true
---

Configuration files are commonplace within .NET and are often used to hold application-specific [runtime configuration settings](https://docs.microsoft.com/en-us/dotnet/framework/configure-apps/file-schema/configuration-sections-schema), [connection strings](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/connection-strings-and-configuration-files) or [web service bindings](https://docs.microsoft.com/en-us/dotnet/framework/wcf/configuring-services-using-configuration-files).  Common .NET development practices recommend the use of configuration files to allow easy customisation of these values by technical end-users, rather than requiring code recompilation.

## Configuration files and the Vault Application Framework

When executing a .NET application (e.g. a console application), the .NET framework will automatically locate the configuration file and provide easy access to the contents.  An issue that developers often encounter, especially when attempting to reference a web service from within a Vault Application Framework application is that the configuration file data will not automatically be loaded and so these values are not available.

### Loading a configuration file manually (configuration settings and connection strings)

Instead of using `System.Configuration.ConfigurationManager.AppSettings["item"]`, the same configuration data can be manually loaded from the deployed configuration file using a helper method such as this:

```csharp
/// <summary>
/// Load the <see cref="Configuration"/> from the current assembly's ".dll.config" file.
/// </summary>
/// <returns>The <see cref="Configuration"/> for the file.</returns>
public static Configuration LoadConfigurationFromExternalFile()
{
	// Retrieve the current assembly name.
	var assemblyName = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name;

	// Create a FileInfo pointing at the correct path.
	var defaultFilePath = new System.IO.FileInfo(assemblyName + ".dll.config");

	// Use the other overload to retrieve the configuration.
	return LoadConfigurationFromExternalFile(defaultFilePath); ;
}

/// <summary>
/// Load the <see cref="Configuration"/> from the supplied configuration file.
/// </summary>
/// <param name="externalConfiguration">The configuration file on disk.</param>
/// <returns>The <see cref="Configuration"/> for the file.</returns>
public static Configuration LoadConfigurationFromExternalFile(
	System.IO.FileInfo externalConfiguration)
{
	return ConfigurationManager.OpenMappedExeConfiguration(new ExeConfigurationFileMap()
	{
		ExeConfigFilename = externalConfiguration.FullName
	}, ConfigurationUserLevel.None);
}
```

Instead, the same content can be loaded from `LoadConfigurationFromExternalFile().AppSettings.Settings["item"].Value`.

The same approach can be used for connection strings, where the standard method of `System.Configuration.ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString` can be replaced with `LoadConfigurationFromExternalFile().ConnectionStrings.ConnectionStrings["connectionString"].ConnectionString`.

### Loading a web service binding manually

Once a [WCF or Web Service reference is added into a Visual Studio project](https://msdn.microsoft.com/en-us/library/bb628649.aspx), binding information for the web service is automatically added to the project configuration file.  This information is then used to connect to the web service at runtime.

Instead of using the default constructor (`var client = new CurrencyConvertorSoapClient();`), the same web service client can be instantiated and populated using information from a supplied configuration file - in the same manner as above.

```csharp
/// <summary>
/// Creates a web service client for the supplied interface.
/// </summary>
/// <typeparam name="TWebServiceInterface">The auto-generated web service interface.</typeparam>
/// <param name="endpointConfigurationName">The endpoint configuration name,
/// passed to <see cref="ConfigurationChannelFactory{TChannel}"/> constructor.
/// If null, passes the name of the interface.</param>
/// <param name="endpointAddress">The endpoint address for binding.
/// If empty reads the address from the configuration file.</param>
/// <returns>A web service client.</returns>
public static TWebServiceInterface CreateClient<TWebServiceInterface>(
	string endpointConfigurationName = null,
	EndpointAddress endpointAddress = null)
{
	// Use the other overload (use the assembly that the interface is in as the configuration).
	return CreateClient<TWebServiceInterface, TWebServiceInterface>(endpointConfigurationName, endpointAddress);
}
/// <summary>
/// Creates a web service client for the supplied interface.
/// </summary>
/// <typeparam name="TWebServiceAssembly">The assembly that the web service reference was within
/// (i.e. the configuration file to load).</typeparam>
/// <typeparam name="TWebServiceInterface">The auto-generated web service interface.</typeparam>
/// <param name="endpointConfigurationName">The endpoint configuration name, passed to
/// <see cref="ConfigurationChannelFactory{TChannel}"/> constructor.
/// If null, passes the name of the interface.</param>
/// <param name="endpointAddress">The endpoint address for binding.
/// If empty reads the addressfrom the configuration file.</param>
/// <returns>A web service client.</returns>
private static TWebServiceInterface CreateClient<TWebServiceAssembly, TWebServiceInterface>(
	string endpointConfigurationName = null,
	EndpointAddress endpointAddress = null)
{
	// Create the configuration channel factory.
	var factory = CreateConfigurationChannelFactory<TWebServiceAssembly, TWebServiceInterface>(
		endpointConfigurationName);

	// Create the channel, optionally supplying the endpoint address.
	return null == endpointAddress
		? factory.CreateChannel()
		: factory.CreateChannel(endpointAddress);
}

/// <summary>
/// Creates a configuration channel factory from the default configuration file for
/// the <see cref="TWebServiceAssembly"/>.
/// </summary>
/// <typeparam name="TWebServiceAssembly">The assembly to load the default configuration from.</typeparam>
/// <typeparam name="TWebServiceInterface">The interface type to create the channel for.</typeparam>
/// <param name="endpointConfigurationName">The endpoint configuration name, passed to
/// <see cref="ConfigurationChannelFactory{TChannel}"/> constructor.
/// If null, passes the name of the interface.</param>
/// <returns>The configuration channel factory.</returns>
private static ConfigurationChannelFactory<TWebServiceInterface> CreateConfigurationChannelFactory<TWebServiceAssembly, TWebServiceInterface>(
	string endpointConfigurationName = null)
{
	// Locate the default configuration file.
	var defaultFilePath = new System.IO.FileInfo(typeof(TWebServiceAssembly).Assembly.GetName().Name + ".dll.config");

	// Use the other overload.
	return CreateConfigurationChannelFactory<TWebServiceInterface>(defaultFilePath, endpointConfigurationName);
}

/// <summary>
/// Creates a configuration channel factory from the supplied configuration file.
/// </summary>
/// <typeparam name="TWebServiceInterface">The interface type to create the channel for.</typeparam>
/// <param name="externalConfiguration">The file to load the configuration from.</param>
/// <param name="endpointConfigurationName">The endpoint configuration name, passed to
/// <see cref="ConfigurationChannelFactory{TChannel}"/> constructor.
/// If null, passes the name of the interface.</param>
/// <returns>The configuration channel factory.</returns>
public static ConfigurationChannelFactory<TWebServiceInterface> CreateConfigurationChannelFactory<TWebServiceInterface>(
	System.IO.FileInfo externalConfiguration,
	string endpointConfigurationName = null)
{

	// Sanity.
	if (false == externalConfiguration.Exists)
		throw new FileNotFoundException(
			"Configuration could not be loaded from the file as it could not be found",
			externalConfiguration.FullName);

	// Open the configuration file.
	var configuration = ConfigurationManager.OpenMappedExeConfiguration(new ExeConfigurationFileMap()
	{
		ExeConfigFilename = externalConfiguration.FullName
	}, ConfigurationUserLevel.None);

	// Return the configuration channel factory.
	return new ConfigurationChannelFactory<TWebServiceInterface>(
		endpointConfigurationName ?? typeof(TWebServiceInterface).Name,
		configuration,
		null);
}
```

The client can then be created using `var client = CreateClient<CurrencyConvertorSoap>();`.

## A better approach

Configuration files are typically used within .NET to provide storage for configuration values, and to enable configuration values to be edited without the code needing recompilation.  For most standard .NET environments, a configuration file on disk is a good option.  However, Vault Application Framework applications are packaged into a `.zip` or `.mfappx` file and deployed into the M-Files server.  As such, these configuration files cannot easily be altered by users.  Additionally: M-Files offers Name-Value Storage as an "in-vault" option for setting storage.

Using the Vault Application Framework [Configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfconfiguration) may be an alternative option for settings storage.