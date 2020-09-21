---
layout: page
title: Workflow-related attributes in the Vault Application Framework
includeInSearch: true
breadcrumb: Workflows
---

## Workflow State Actions

The `StateActionAttribute` attribute marks the following method to be executed when an object reaches a state in a workflow.

```csharp
[StateAction("MyWorkflowStateAlias")]
public void WorkflowStateAction(StateEnvironment env)
{
}
```

## State Pre-Conditions

The `StatePreConditionsAttribute` attribute marks the following method to be executed to determine whether an object can enter a state in a workflow.

```csharp
[StatePreConditions("MyWorkflowStateAlias")]
public bool MyStatePreConditions(StateEnvironment env, out string message)
{
	message = "The object cannot enter this state.";
	return false;
}
```

## State Post-Conditions

The `StatePostConditionsAttribute` attribute marks the following method to be executed to determine whether an object can leave a state in a workflow.

```csharp
[StatePostConditions("MyWorkflowStateAlias")]
public bool MyStatePostConditions(StateEnvironment env, out string message)
{
	message = "The object cannot leave this state.";
	return false;
}
```

## Automatic State Transitions

The `AutomaticStateTransitionTriggerAttribute` attribute marks the following method to be executed to determine whether an object should automatically transition between workflow states.

```csharp
[AutomaticStateTransitionTrigger("MyWorkflowStateTransitionAlias")]
public bool MyAutomaticStateTransitionTrigger(StateTransitionEnvironment env, out int nextState)
{
	nextState = 101; // The Id of the state to transition to.
	return false;
}
```
