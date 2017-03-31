---
layout: page
title: Attributes
---

## What Are .NET Attributes?

Attributes within .NET provide a mechanism of associating additional information with elements within C# code.  This approach can simplify code that would otherwise require significant scaffolding and maintenance.  Attributes are effectively metadata that describe the property, method or class that they precede.

All samples in this document show C# code, but attributes can also be used from VB.NET.

For example, the `SerializableAttribute` is used to mark elements that can be serialized (stored and then later re-loaded).  The attribute can be placed before a class definition to note that the class has been designed to serialize (and later de-serialize) correctly:

```csharp
[Serializable]
public class MySerializableClass
{
}
```

<p class="note">Note: The name of the class, by convention, includes the suffix "Attribute", but this does not need to be included when used, so MFPropertyDefAttribute is referenced as [MFPropertyDef].
More information on Attributes in the .NET framework can be found within MSDN.</p>
 
## Attributes And The Vault Application Framework

Attributes are used within the Vault Application Framework in the following broad ways:

1. [To identify the type of vault elements (for example,. a class or an object type) when using MFIdentifier.]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
2. To declare where in the vault a VBScript proxy should be placed for a specific method.  This may be for [event handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/), [workflow state actions, state pre- or post-conditions, automatic state transitions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/), [property calculation or validation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/).

Attributes can additionally be passed parameters at the time they are declared.  For example, the following attribute declares that a property definition with alias `PropertyDef.CustomerName` must exist in the vault when the application is loaded, or it will log an error to the event log:

```csharp
[MFPropertyDef(Required = true)]
public MFIdentifier CustomerNameProperty = "PropertyDef.CustomerName";
```

<p class="note">Note: This code would output an error to the event log if the property were not found, but the application would still attempt to run.  It is up to the vault application to check whether any items were not found and execute accordingly.</p>