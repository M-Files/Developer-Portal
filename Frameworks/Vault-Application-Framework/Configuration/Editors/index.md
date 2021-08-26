---
layout: page
title: Editors
includeInSearch: true
requiredVaultApplicationFrameworkVersion: 2.0
---

The M-Files Admin Configuration area has a number of built-in editors for common configuration types.  These editors allow users to more easily configure applications without requiring the user to enter formatted/structured text content such as JSON.

The following editors are available to use:

* [Text editor](#text-editor), for string values.
* [Numeric editors](#numeric-editors).
* [MFIdentifier](#mfidentifier-selector) selector, allowing users to select elements from the M-Files vault configuration, such as classes or property definitions.
* [Enumerations](#enumerations-editor) to choose from a pre-defined static list of values from an enumeration.
* [Dropdown list](#dropdown-list-editor) to choose from a list of values.
* A [Placeholder editor](#placeholder-editor), to allow the user to create a text template that will be filled with metadata.
* A [Search Conditions editor](#search-conditions-editor) to allow the user to specify search conditions for use by the vault application.
* [Date picker](#date-picker), for selecting dates.
* [Time picker](#time-picker), for selecting times.
* [Timestamp picker](#timestamp-picker), for selecting time stamps.
* [Color picker](#color-picker), for selecting colors.
* [Value editor](#value-editor), for entering values for property values.

In addition, the `JsonConfEditor` attribute can be used to set the following values on each editor:

* `HelpText` - text shown when the user selects the "i" icon to the left of the setting.
* `Label` - text shown on instead of the property name.
* `RegExMask` - a regular expression mask that will be enforced as a validation requirement.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(
		RegExMask = @"\d{3}.{4}",
		HelpText = "This is a simple string value.",
		Label = "My string value")]
	public string MyStringValue { get; set; }
}
{% endhighlight %}

![Customising the editor display](JsonConfEditor.png)

## Text editor

The text editor is the default editor used by the administration area.  Its display can be further customized through the use of additional attributes.  In addition to the base `JsonConfEditor` attribute listed above, the following can be used with the text editor:

* `JsonConfEditor`
	* `TypeEditor` - defines the sub-type of the editor shown.  Value values are:
		* `date` - the editor is shown as a [date picker](#date-picker).
		* `color` - the editor is shown as a [color picker](#color-picker).
		* `placeholderText` - the editor is shown as a [Placeholder editor](#placeholder-editor).
		* `options` - the editor is shown as a [dropdown list](#dropdown-list).
* `MultilineTextEditor` - allows the text area to accept multiple lines of text; as the user presses "Enter", the box will expand in size.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[MultilineTextEditor]
	public string MyMultiLineStringValue { get; set; }
}
{% endhighlight %}

![Using the multi-line text editor](MultilineTextEditor.png)

## Numeric editors

The `JsonConfIntegerEditor` and `JsonConfFloatEditor` attributes can be used to define that a property should only accept numbers, either integers or floats respectively.

The system will highlight invalid characters as a validation exception, and will stop invalid values being saved.  It does not stop values being entered using the keyboard.
{:.note.warning}

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfIntegerEditor]
	public int MyIntegerValue { get; set; }

	[DataMember]
	[JsonConfFloatEditor]
	public float MyFloatValue { get; set; }
}
{% endhighlight %}

![Using the numeric editors](NumericEditors.png)

### Integers

When using the `JsonConfIntegerEditor` attribute, the following additional arguments can be set:

* `Max` - defaults to 2147483647.  Values greater than this are invalid.
* `Min` - defaults to -2147483648.  Values less than this are invalid.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfIntegerEditor(Min=100, Max=500)]
	public int MyIntegerValue { get; set; }
}
{% endhighlight %}

### Floats

When using the `JsonConfFloatEditor` attribute, the following additional arguments can be set:

* `Max` - defaults to [PositiveInfinity](https://msdn.microsoft.com/en-us/library/system.double.positiveinfinity(v=vs.110).aspx).  Values greater than this are invalid.
* `Min` - defaults to [NegativeInfinity](https://msdn.microsoft.com/en-us/library/system.double.negativeinfinity(v=vs.110).aspx).  Values less than this are invalid.
* `MinPrecision` - defaults to 2.  Lower precisions are shown to this precision.
* `MaxPrecision` - defaults to 7.  Higher precisions may be saved rounded.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfFloatEditor(Min=100, Max=500, MinPrecision=1, MaxPrecision=2)]
	public float MyFloatValue { get; set; }
}
{% endhighlight %}

## MFIdentifier selector

The [MFIdentifier](/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfidentifier) class can be used to reference vault elements such as classes, object types, or properties without having to [hard-code their respective vault IDs]({{ site.baseurl }}/Getting-Started/Vault-Structure/Aliases/).  By declaring the member as an `MFIdentifier`, the M-Files Admin software will show the user a selection of items from the vault structure for them to pick.

The `MFIdentifier` class must be used along with an attribute such as `[MFClass]` or `[MFPropertyDef]` to define the type of vault structural element that the identifier points to.  An example is shown below.
{:.note.warning}

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[MFClass(Required = true)]
	[DataMember]
	public MFIdentifier MyClass { get; set; }
		= "MFiles.Class.PurchaseOrder";

	[MFPropertyDef(Required = true)]
	[DataMember]
	public MFIdentifier MyPropertyDefinition { get; set; }
		= "MFiles.PropertyDef.PurchaseOrderNumber";
}
{% endhighlight %}

![Using the MFIdentifier editor](MFIdentifierEditor.png)

The user will be first asked to select the vault element to reference (e.g. the `Other document` class or the `Deleted` property definition, in the screenshot above), then the method of referencing the vault element.  In the screenshot above, the user has chosen to reference `Other document` by its alias of `MF.CL.OtherDocument`, but the `Deleted` property definition by its ID (`27`).  Referencing vault structure elements by their alias is recommended if the configuration is expected to be copied between vaults.
{:.note}

### Making MFIdentifier elements optional

By default any elements exposed within the configuration class will be assumed to be mandatory.  The user will see an error about empty values in the validation screens at the bottom of the configuration window.  To highlight that the value is not mandatory, ensure that `MFObjType` has `AllowEmpty` set to `true`, and that the default value is correctly specified in the `JsonConfEditor` attribute.

In the code sample below the `Mandatory` configuration item will be highlighted as an error if empty, but the `Optional` configuration item can be left empty with no errors:

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[MFObjType]
	[JsonConfEditor(IsRequired = true, DefaultValue = null)]
	public MFIdentifier Mandatory { get; set; }

	[DataMember]
	[MFObjType(AllowEmpty = true)]
	[JsonConfEditor(IsRequired = false, DefaultValue = null)]
	public MFIdentifier Optional { get; set; }

}
{% endhighlight %}

## Enumerations editor

By declaring a member as an enumerated value, the M-Files Admin software will render a list of potential options for the user to select.  The user can click the "down" arrow to the right of the configuration row to drop down the available options.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	public MFBuiltInPropertyDef MyBuiltInPropertyDef { get; set; }
}
{% endhighlight %}

![Using the MFBuiltInPropertyDef editor](MFBuiltInPropertyDefEditor.png)

For your own enumerations, values can be decorated with `[JsonConfEditor]` to provide human-readable alternatives:

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	public MyEnum SelectedValue { get; set; }
}
public enum MyEnum
{
	// "hello" will be shown instead of "Value1".
	[JsonConfEditor(Label = "hello")]
	Value1 = 0,

	// "world" will be shown instead of "Value2".
	[JsonConfEditor(Label = "world")]
	Value2 = 1
}
{% endhighlight %}

## Dropdown list editor

### Hard-coded

By using the `JsonConfEditor` attribute and a `TypeEditor` value of `options`, the configuration can define a set of custom dropdown options shown to the user.

The Options property takes a string containing a JSON object with a single property named `selectOptions`.  In the simplest form this is an array of string to show to the user (shown below as `MyOptions1`).  If the label (shown text) should be different to the value (returned when selected), this should instead be an array of objects, each with a property for `label` and `value` (shown below as `MyOptions2`).

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(TypeEditor = "options",
		Options = "{selectOptions:[\"MyFirst\",\"MySecond\"]}")]
	public string MyOptions1;

	[DataMember]
	[JsonConfEditor(TypeEditor = "options",
		Options = "{selectOptions:[{label:\"MyFirst\", value:\"1\"},{label:\"MySecond\", value:\"2\"}]}")]
	public string MyOptions2;
}
{% endhighlight %}

![Using the dropdown list editor](DropdownListEditor.png)

In many situations, the use of an [enumerated value](#enumerations-editor) may be better.
{:.note}

### Stable values option provider

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


## Placeholder editor

By using the `JsonConfEditor` attribute and a `TypeEditor` value of `placeholderText`, the configuration allows the user to define a set of text containing placeholders.  These placeholders can be replaced at runtime with values from objects within the vault.  This can be useful to define, for example, text used for custom email notifications, where the object names can be replaced at runtime (e.g. "Invoice 123456 has been approved").

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(TypeEditor = "placeholderText")]
	public string MyTextTemplate;
}
{% endhighlight %}

![Using the placeholder text editor](PlaceholderTextEditor.png)

When the cog to the right of the configuration row is selected, the placeholder text editor is shown.  This can be used to create a custom text string including placeholders which can be automatically resolved using [ObjVerEx.ExpandPlaceholderText](/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/#expandplaceholdertext).

![Creating the placeholder text](PlaceholderTextEditor2.png)

## Search Conditions editor

By declaring a member as a type of `SearchConditionsJA` ("SearchConditions JSON Adapter"), the M-Files Admin software will allow the user to define a set of search conditions within the user interface.  This can then be used at runtime to locate objects within the vault.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;
using MFiles.VAF.Configuration.JsonAdaptor;

[DataContract]
public class Configuration
{
	[DataMember]
	public SearchConditionsJA LocateInvoiceRows;
}
{% endhighlight %}

![Using the search conditions editor](SearchConditionsEditor.png)

When the cog to the right of the configuration row is selected, the search conditons editor is displayed.

![Creating the search conditions](SearchConditionsEditor2.png)

The search conditions defined can be used to either execute a search in the vault, or to test whether an existing object matches the defined conditions:

{% highlight csharp %}

private List<ObjVerEx> LocateInvoiceRows()
{
	// Create our search builder.
	var builder = new MFSearchBuilder(this.PermanentVault, this.config.LocateInvoiceRows.ToApiObject(this.PermanentVault));

	// Find items.
	return builder.FindEx();
}

private void DoesObjectMatch(ObjVerEx input)
{
	return this.config.LocateInvoiceRows.IsMatch(input);
}

{% endhighlight %}

## Date picker

By declaring a datetime property and marking it with a correctly-configured `JsonConfEditor` attribute, the M-Files Admin software will render a datepicker for the user to select a date.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(TypeEditor="date")]
	public DateTime? MyDateTimePropertyValue { get; set; }
}
{% endhighlight %}

![Allowing the user to select a date](DatePicker.png)

The member can be declared as either a `string` or a `DateTime`.  If it is declared as a `string` then it will receive the date formatted as in locale-neutral ISO format (e.g. `2017-11-27`).  The date may be displayed in the admin area in a locale-specific format.
{:.note}

## Time picker

By declaring a time property and marking it with a correctly-configured `JsonConfEditor` attribute, the M-Files Admin software will render a datepicker for the user to enter a time.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(TypeEditor="time", Default="00:00:00")]
	public TimeSpan MyTimePropertyValue { get; set; } = TimeSpan.Zero;
}
{% endhighlight %}

The member can be declared as either a `string` or a `TimeSpan`.  If it is declared as a `string` then it will receive the date formatted as `HH:MM:SS`.
{:.note}

## Timestamp picker

By declaring a date/time property and marking it with a correctly-configured `JsonConfEditor` attribute, the M-Files Admin software will render a datepicker for the user to select a date and time.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(TypeEditor="timestamp")]
	public DateTime? MyTimeStampPropertyValue { get; set; };
}
{% endhighlight %}

The member can be declared as either a `string` or a `DateTime`.  If it is declared as a `string` then it will receive the date formatted as in locale-neutral ISO format (e.g. `2017-11-27 01:02:59`).  The date may be displayed in the admin area in a locale-specific format.
{:.note}

## Color picker

By declaring a datetime property and marking it with a correctly-configured `JsonConfEditor` attribute, the M-Files Admin software will render a color picker for the user to select a color.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor(TypeEditor = "color")]
	public string MyColorValue { get; set; }
}
{% endhighlight %}

![Allowing the user to select a color](ColorPicker.png)

The member should be declared as a `string` and will receive the color formatted as a color hex reference (e.g. `#010101`).
{:.note}

## Value editor

A value editor is a little different to the above editors in that it requires two linked configurable items to work.  In the example below the `Property` property allows the user to select a specific property definition from the vault, and the `Value` property will react to that selection and show an appropriate editor.  As an example: if the user selects a textual property definition then the value editor will show a text entry.  Alternatively: if the user selects a lookup-based property definition then the value editor will allow the user to select value(s) from the appropriate list.

{% highlight csharp %}
using System.Runtime.Serialization;
using MFiles.VAF.Configuration;

[DataContract]
public class Configuration
{
	[MFPropertyDef]
	[DataMember]
	public MFIdentifier Property { get; set; }

	[DataMember]
	[ValueSetter(
			AllowedModes = new[] { TypedValueSettingMode.Dynamic, TypedValueSettingMode.Static, TypedValueSettingMode.SetToNULL },
			PropertyDefReferencePath = ".parent._children{.key == 'Property' }")]
	public TypedValueSetter Value { get; set; }
}
{% endhighlight %}

The `Value` property is linked to the `Property` property via the `PropertyDefReferencePath` that is provided in the `ValueSetter` attribute.  This contains a JSPath selector from the current object to the associated property.  JSPath is also used when [showing and hiding configuration elements](../Showing-And-Hiding/).
{:.note}

### Using the value

To retrieve the configured value, you must inspect the mode that was selected by the user and react accordingly:

```csharp
switch(this.Configuration.Value.Mode)
{
	case TypedValueSettingMode.SetToNULL:
	{
		
		var nullValue = new TypedValue();
		nullValue.SetValueToNULL(propertyDataType);
		break;

	}
	case TypedValueSettingMode.Static:
	{
		
		// Retrieve the static value that was entered.
		// Note: the type will depend on the property value.
		var staticValue = this.Configuration.Value.TypedValue.ToApiObject(vault, false);
		break;

	}
	case TypedValueSettingMode.DynamicValue:
	{
		
		// Resolve string value by expanding placeholders in the context of an ObjVerEx.
		string value = myObjVerEx.ExpandPlaceholderText( this.Configuration.Value.DynamicValue );

		// Or resolve lookup values related to an object.
		IEnumerable<Lookup> lookups =
			myObjVerEx.ExpandPlaceholders( this.Configuration.Value.DynamicValue ).GetExpandedValues<Lookup>();

		// Or resolve other objects related to an object.
		IEnumerable<ObjVerEx> lookups =
			myObjVerEx.ExpandPlaceholders( this.Configuration.Value.DynamicValue ).GetExpandedValues<ObjVerEx>();

		// Or resolve individual expanded values of any type using generics...
		var stringValues = myObjVerEx.ExpandPlaceholders( this.Configuration.Value.DynamicValue ).GetExpandedValues<string>();
		var intValues = myObjVerEx.ExpandPlaceholders( this.Configuration.Value.DynamicValue ).GetExpandedValues<int>();
		var boolValues = myObjVerEx.ExpandPlaceholders( this.Configuration.Value.DynamicValue ).GetExpandedValues<bool>();
		var dateValues = myObjVerEx.ExpandPlaceholders( this.Configuration.Value.DynamicValue ).GetExpandedValues<DateTime>();

	}
		break;
}
```

You can restrict the modes available to the user by altering the `AvailableModes` within the associated `[ValueSetter]` attribute.
{:.note}