---
layout: page
title: Exceptions
---

## Throwing exceptions

In general, throwing an exception will result in the message being displayed in the M-Files client.  For example, when used within an event handler, the following two sets of code are broadly equivalent:

```csharp
[EventHandler(MFEventHandlerType.MFEventHandlerBeforeCheckInChanges)]
public void MyEventHandler(EventHandlerEnvironment env)
{
	throw new Exception("This cannot be done.");
}
```

```vbscript
Option Explicit

Err.Raise MFScriptCancel, "This cannot be done"
```

## Alternate patterns

Some method signatures expect a boolean to be returned to indicate whether or not to allow a process to happen, and define an alternate mechanism of defining the message to show.  If this pattern is available then it should be used instead of throwing exceptions manually.  An example of this is a `StatePostConditionsAttribute`:

```csharp
[StatePostConditions("MyWorkflowState")]
public bool MyStatePostConditions(StateEnvironment env, out string message)
{
	message = "The object cannot leave this state.";
	return false;
}
```

In the above example, the code does not throw an exception but defines an exception message and returns `false` from the method.  The Vault Application Framework will show the message to the user if the return value is `false`.
