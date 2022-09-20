---
layout: page
title: Property-related attributes in the Vault Application Framework
includeInSearch: true
breadcrumb: Properties
---

The following attributes can be use to associated C# methods with property-related functionality within the M-Files vault.

## Property Calculation

The `PropertyAutomaticNumberingAttribute` attribute marks the following method to be executed to calculate a custom automatic number for an object (see [Customized automatic numbering (VBScript)](https://www.m-files.com/user-guide/latest/eng/Automatic_values.html)).

Note that M-Files only supports customized automatic numbering for text and integer data types.
{:.note}

```csharp
[PropertyAutomaticNumbering("MyPropertyDefinitionAlias")]
public TypedValue MyPropertyAutomaticNumber(PropertyEnvironment env)
{
	// Create our typed value.
	var typedValue = new TypedValue();

	// Set the value to the current datetime (expressed as ticks).
	typedValue.SetValue(MFDataType.MFDatatypeText, DateTime.Now.Ticks.ToString());

	// Return the value.
	return typedValue;
}
```

The `PropertyCustomValueAttribute` attribute marks the following method to be executed to calculate a custom value for an object (see [Calculated value (VBScript)](https://www.m-files.com/user-guide/latest/eng/Automatic_values.html)).

```csharp
[PropertyCustomValue("MySecondPropertyDefinitionAlias")]
public TypedValue MySecondPropertyCustomValue(PropertyEnvironment env)
{
	// Create our typed value.
	var typedValue = new TypedValue();

	// Set the value to the current datetime (expressed as ticks).
	typedValue.SetValue(MFDataType.MFDatatypeText, DateTime.Now.Ticks.ToString());

	// Return the value.
	return typedValue;
}
```

## Property Validation

The `PropertyValueValidationAttribute` attribute marks the following method to be executed to validate a property value (see [Automatically Validating Property Values](https://www.m-files.com/user-guide/latest/eng/Validation.html)).

```csharp
[PropertyValueValidation("MyThirdPropertyDefinitionAlias")]
public bool MyThirdPropertyValidation(PropertyEnvironment env, out string message)
{
	// Set the message (displayed if validation fails).
	message = "Only people named Craig are allowed.";

	// Validate.
	return (env.PropertyValue?.Value?.DisplayValue?.ToLower() == "craig");
}
```
