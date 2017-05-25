---
layout: page
title: Workflows
includeInSearch: true
---

## Workflow State Actions

The `StateActionAttribute` attribute marks the following method to be executed when an object reaches a state in a workflow.

```csharp
[StateAction("MyWorkflowState")]
public void WorkflowStateAction(StateEnvironment env)
{
}
```

## State Pre-Conditions

The `StatePreConditionsAttribute` attribute marks the following method to be executed to determine whether an object can enter a state in a workflow.

```csharp
[StatePreConditions("MyWorkflowState")]
public bool MyStatePreConditions(StateEnvironment env, out string message)
{
	message = "The object cannot enter this state.";
	return false;
}
```

## State Post-Conditions

The `StatePostConditionsAttribute` attribute marks the following method to be executed to determine whether an object can leave a state in a workflow.

```csharp
[StatePostConditions("MyWorkflowState")]
public bool MyStatePostConditions(StateEnvironment env, out string message)
{
	message = "The object cannot leave this state.";
	return false;
}
```

## Automatic State Transitions

The `AutomaticStateTransitionTriggerAttribute` attribute marks the following method to be executed to determine whether an object should automatically transition between workflow states.

```csharp
[AutomaticStateTransitionTrigger("MyWorkflowState")]
public bool MyAutomaticStateTransitionTrigger(StateTransitionEnvironment env, out int nextState)
{
	nextState = 101; // The Id of the state to transition to.
	return false;
}
```
