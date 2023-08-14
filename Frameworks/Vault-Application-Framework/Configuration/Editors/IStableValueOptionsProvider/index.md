---
layout: page
title: IStableValueOptionsProvider
includeInSearch: true
---

Where you need to provide a set of values for a dropdown, but do not wish to hard-code the values, you can implement `IStableValueOptionsProvider`.  This interface enables you generate options at runtime from code.

Note that options provided here are cached by the configuration editor and are expected to be **stable across applications**; if you wish to use an implementation of `IStableValueOptionsProvider` in a shared class library and provide different values for application A to those in application B, please ensure that you read the [from within a class library](from-within-a-class-library) section below.
{:.note.warning}

## Basic usage

It is also possible to provide a set of values at runtime, instead of hard-coding these into a JSON collection.  This can be done by using a class that implements `IStableValueOptionsProvider`:

{% highlight csharp %}
using System.Runtime.Serialization;
using MFilesAPI;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using MFiles.VAF.Configuration.JsonEditor;

/// <summary>
/// Retrieves the object types from the vault, filterd to only show ones
// that are loaded from an external source.
/// </summary>
class ExternalObjectTypeOptions : IStableValueOptionsProvider
{
	/// <inheritdoc />
	public IEnumerable<ValueOption> GetOptions( IConfigurationRequestContext context )
	{
		foreach( ObjTypeAdmin ota in context.Vault.ObjectTypeOperations.GetObjectTypesAdmin() )
		{
			// If it is internal then skip it.
			if( !ota.ObjectType.External )
				continue;

			// Return the value option.
			yield return new ValueOption
			{
				Label = ota.ObjectType.NameSingular,
				Value = ota.ObjectType.GUID  // always reference by GUID
			};
		}
	}
}

[DataContract]
public class Configuration
{
	[DataMember]
	[MFObjType]
	[JsonConfEditor( TypeEditor = "options" )]
	[ValueOptions( typeof( ExternalObjectTypeOptions ) )]
	public MFIdentifier ExternalObjectType { get; set; }
}
{% endhighlight %}

Options provided this way are rendered into the configuration schema, so are only refreshed when the configuration itself is reloaded (i.e. by right-clicking on the "Configurations" node in the tree on the left and selecting 'Refresh').  As a result this cannot provide truly dynamic options.  Also: providing large numbers of options will significantly affect the performance of the configuration editor.
{:.note}

## From within a class library

Options provided from an implementation of `IStableValueOptionsProvider` are cached by the configuration editor using the full name of the implementing class as a cache key.  This is done for performance.  For simple implementations this works well, but can cause issues where one implementation of `IStableValueOptionsProvider` is shared between two applications.

Consider a situation where applications A and B both use the same class library, C.  Within C there is an implementation of `IStableValueOptionsProvider` which provides different options for vault application A to vault application B.  As the type name is the same in both applications, the configuration editor could show the incorrect values.

To solve this, you need to ensure that the full type name of the implementation of `IStableValueOptionsProvider` contains something unique to each application.  The simplest way is to use generics to provide the type of the current vault application class.  This will ensure that the type name of the instance from vault application A is different to the instance from vault application B:


{% highlight csharp %}
using System.Runtime.Serialization;
using MFilesAPI;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.AdminConfigurations;
using MFiles.VAF.Configuration.JsonEditor;

/// <summary>
/// Retrieves the object types from the vault, filterd to only show ones
// that are loaded from an external source.
/// </summary>
class ExternalObjectTypeOptions<TVaultApplicationType> : IStableValueOptionsProvider
{
	/// <inheritdoc />
	public IEnumerable<ValueOption> GetOptions( IConfigurationRequestContext context )
	{
		foreach( ObjTypeAdmin ota in context.Vault.ObjectTypeOperations.GetObjectTypesAdmin() )
		{
			// If it is internal then skip it.
			if( !ota.ObjectType.External )
				continue;

			// Return the value option.
			yield return new ValueOption
			{
				Label = ota.ObjectType.NameSingular,
				Value = ota.ObjectType.GUID  // always reference by GUID
			};
		}
	}
}

[DataContract]
public class Configuration
{
	// Note that the current vault application type is passed to the [ValueOptions] attribute.
	// This will ensure that the type name will be different in each vault application.
	[DataMember]
	[MFObjType]
	[JsonConfEditor( TypeEditor = "options" )]
	[ValueOptions( typeof( ExternalObjectTypeOptions<VaultApplication> ) )]
	public MFIdentifier ExternalObjectType { get; set; }
}
{% endhighlight %}