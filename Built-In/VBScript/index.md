---
layout: page
title: Executing VBScript within M-Files
includeInSearch: true
breadcrumb: VBScript
---

VBScript provides an easily-accessible mechanism for server-side code to be placed within an M-Files vault or server.  Code can react to vault events (e.g. event handlers), can execute when objects move through workflows (e.g. to enforce that an object meets some conditions before moving into a state), or even to calculate or validate values of properties on objects.

<p class="note">The <a href="{{ site.baseurl }}/Frameworks/Vault-Application-Framework">Vault Application Framework</a> can be used to enable .NET (typically C#) code to be used in many of the places that VBScript can be used, and should be considered for complex scripts.</p>

## Locations VBScript can execute

### Event Handlers

VBScript can respond to various [vault and server events](http://www.m-files.com/user-guide/latest/eng/#Event_handlers_variables.html).  For example: an event handler could be created to validate that an item meets a set of criteria before it is added to the vault.  Different event handlers provide different built-in variables; the variables available in each event are listed [here](http://www.m-files.com/user-guide/latest/eng/#Event_handlers_variables.html), and details about the variables are available [here](http://www.m-files.com/user-guide/latest/eng/index.html?q=/user-guide/latest/eng/Variables.html).

### Automatic (Calculated) Property Values

VBScript can be used to [calculate the value of a given property](http://www.m-files.com/user-guide/latest/eng/index.html#Automatic_values.html).  This could be based upon the object's other property values, based upon other information in the vault, or even based upon some external logic (e.g. communication with another system).  Some examples of using [VBScript to calculate property values are available here](http://www.m-files.com/user-guide/latest/eng/index.html#Editing_VBScript_code.html).

<p class="note">"Customized automatic numbering (VBScript)" is used to generate an automatic number and is calculated - typically - once, when the object is created.  A "Calculated value (VBScript)" is re-calculated whenever the object is altered.</p>

### Validating Property Values

VBScript can be used to [automatically validate property values that have been entered by the user](http://www.m-files.com/user-guide/latest/eng/index.html#Validation.html).  To fail validation, use `Err.Raise` to throw an exception, which will be shown to the user in a dialog.  The following code will fail validation if the property value contains fewer than 10 characters.

```vbscript
Option Explicit

Dim propertyName, value

propertyName = PropertyDef.Name

value = PropertyValue.GetValueAsUnlocalizedText

If Len(value) < 10 Then

    Err.Raise MFScriptCancel, "The property """ + propertyName + """ must have a value of at least 10 characters."

End If
```

### Workflow state actions

VBScript can be used to perform actions whenever objects enter a specific [workflow state](http://www.m-files.com/user-guide/latest/eng/index.html#graphical_workflows.html).  This code may update the object itself, other objects in the vault, or even interact with external systems (e.g. send an email to a third party).  The variables available at this point are [listed here](http://www.m-files.com/user-guide/latest/eng/index.html#run_script.html#run_script).

### Workflow pre- and post-conditions

VBScript can be used to control whether objects are allowed to enter (pre-conditions) or leave (post-conditions) any [given workflow state](http://www.m-files.com/user-guide/latest/eng/index.html#State_conditions.html#state_transition_conditions).  This allows complex logic to be added to a workflow, for example to not allow a user to move an object out of a workflow state until related documents exist.

### Workflow state transition triggers

VBScript can be used to [automate the transition between two workflow states](http://www.m-files.com/user-guide/latest/eng/index.html#workflow_state_transition_trigger.html#trigger).  These triggers will be executed both when an object is altered (e.g. when an object is moved into a state, the system will check whether it can automatically transition to another one), and also periodically for situations where the trigger depends on an external system (e.g. move an object into a workflow state when an action has been performed in an external system).

### Vault Extension Methods

VBScript can be used to create [Vault Extension Methods]({{ site.baseurl }}/Built-In/VBScript/Vault-Extension-Methods/), which are snippets of code that can be executed using [ExecuteVaultExtensionMethod](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultExtensionMethodOperations~ExecuteVaultExtensionMethod.html).  These Vault Extension Methods can be executed by other VBScript, by external applications using the COM API, by [external applications using the REST API](/APIs/REST-API/Vault-Extension-Methods/), or by User Interface Extensibility Framework applications running within the M-Files desktop or web clients.

## Tips and tricks

### Ensuring an accurate audit trail

Whenever a server-side script executes that alters an object, the object's "last modified by" details are automatically set to "(M-Files Server)".  To resolve this, ensure that you call [SetLastModificationInfoAdmin, as detailed in this article](Audit-Trail-And-Scripting).  This needs to be done both for VBScript code and for code written using the [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/ObjVerEx/#setcreatedby-and-setmodifiedby).