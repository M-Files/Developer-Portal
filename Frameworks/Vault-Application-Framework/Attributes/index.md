---
layout: page
title: Attributes in the Vault Application Framework
includeInSearch: true
breadcrumb: Attributes
---

Attributes within .NET provide a mechanism of associating additional information with elements within C# code.  This approach can simplify code that would otherwise require significant scaffolding and maintenance.  Attributes are effectively metadata that describe the property, method or class that they precede.

All samples in this document show C# code, but attributes can also be used from VB.NET.

For example, the `SerializableAttribute` is used to mark elements that can be serialized (stored and then later re-loaded).  The attribute can be placed before a class definition to note that the class has been designed to serialize (and later de-serialize) correctly:

```csharp
[Serializable]
public class MySerializableClass
{
}
```

<p class="note">The name of the class, by convention, includes the suffix "Attribute", but this does not need to be included when used, so MFPropertyDefAttribute is referenced as [MFPropertyDef].
More information on Attributes in the .NET framework can be found within MSDN.</p>

### Multiple attributes

Note that multiple attributes can be placed on the same method.  The following code attaches the same code to two separate workflow states:

```csharp
[StateAction("MyWorkflowState1Alias")]
[StateAction("MyWorkflowState2Alias")]
public void HandleWorkflowStatesOneAndTwo(StateEnvironment env)
{
}
```

The alias of the referenced item is typically included in the attribute declaration.  This is used to identify which vault element to place the code into.
{:.note}
 
## Attributes And The Vault Application Framework

Attributes are used within the Vault Application Framework in the following broad ways:

1. [To identify the type of vault elements (for example,. a class or an object type) when using MFIdentifier.]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
2. To declare where in the vault a VBScript proxy should be placed for a specific method.  This may be for [event handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/), [workflow state actions, state pre- or post-conditions, automatic state transitions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/), [property calculation or validation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/).

Attributes can additionally be passed parameters at the time they are declared.  For example, the following attribute declares that a property definition with alias `PropertyDef.CustomerName` must exist in the vault when the application is loaded, or it will log an error to the event log:

```csharp
[MFPropertyDef(Required = true)]
public MFIdentifier CustomerNameProperty = "PropertyDef.CustomerName";
```

This code would output an error to the event log if the property were not found, but the application would still attempt to run.  It is up to the vault application to check whether any items were not found and execute accordingly.
{:.note}

### Attributes and VBScript Proxies

The following attributes precede C# methods and identify where in the vault a VBScript "proxy" should be created.  VBScript proxies are snippets of code which obtain a reference to the Vault Application Framework application, and execute the appropriate method(s).

These VBScript proxies must not be manually altered.
{:.note}

## What Attributes Exist Within the Vault Application Framework?

### Configuration

* [MFIdentifierAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfidentifier)
* [MFConfigurationAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfconfiguration)

The `MFConfigurationAttribute` is used in the Vault Application Framework 1.0 to persist configuration information to name value storage.  In the Vault Application Framework 2.0, configuration information should use the [new approach to integrate with the M-Files 2018 configuration area]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/).
{:.note}

#### Vault Structure

The following attributes precede `MFIdentifier` properties and fields and define the type of vault element that the identifier points to.  For example, the following code will declare an `MFIdentifier` for an object type with the [alias]({{ site.baseurl }}/Getting-Started/Aliases/) `MFiles.ObjectType.Project`.

```csharp
[MFObjType()]
MFIdentifier ProjectObjectType = "MFiles.ObjectType.Project";
```

##### Object Types, Classes, Class Groups and Value Lists

* [MFClassGroupAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFClassAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFObjTypeAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFValueListAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFValueListItemAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)

##### Access Control Lists and User Groups

* [MFNamedACLAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFUserGroupAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)

##### Property Definitions

* [MFPropertyDefAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)

##### Workflows, Workflow States, And Workflow State Transitions

* [MFWorkflowAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFStateAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)
* [MFStateTransitionAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)

##### Views
* [MFViewAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/)

#### Vault Extension Methods

* [VaultExtensionMethodAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Vault-Extension-Methods/)

#### Event Handlers

* [EventHandlerAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/)

#### Properties

* [PropertyAutomaticNumberingAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/)
* [PropertyCustomValueAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/)
* [PropertyValueValidationAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/)

#### Workflow States

* [StatePreConditionAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/)
* [StatePostConditionAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/)
* [StateActionAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/)

#### Workflow State Transitions

* [AutomaticStateTransitionTriggerAttribute]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows#automatic-state-transitions)
