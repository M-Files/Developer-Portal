---
layout: page
title: Layout Renderers
includeInSearch: true
---


The logging library supports several custom layout renderers in addition to the [standard NLog layout renderers](https://nlog-project.org/config/?tab=layout-renderers).  These layout renderers can be included in any layout string and will be substituted with the appropriate value when available:

#### Global Layouts
* `${application-guid}` - renders the current application GUID, if available, [in "D" format](https://docs.microsoft.com/en-us/dotnet/api/system.guid.tostring).
* `${application-name}` - renders the current application name, if available.
* `${application-version}` - renders the current application version, if available.
* `${server-guid}` - renders the current server GUID [in "D" format](https://docs.microsoft.com/en-us/dotnet/api/system.guid.tostring).
* `${vault-guid}` - renders the current vault GUID [in "D" format](https://docs.microsoft.com/en-us/dotnet/api/system.guid.tostring).
* `${vault-name}` - renders the current vault name.
* `${log-context}` - renders any current [context](../#context) information, if available.

#### Event Handler Layouts
The following layouts will return values from threads processing events, when applicable.
* `${mf-activity}` - renders activity id associated with the current event.
* `${mf-trans-master}` - renders the master transaction id associated with the current event.
* `${mf-trans-parent}` - renders the parent transaction id associated with the current event.
* `${mf-trans-current}` - renders the transaction id associated with the current event.
* `${mf-user-current}` - renders the id of the user that triggered the current event.
* `${mf-user-session}` - renders the id of the user session being used in the current event.
* `${mf-objver}` - renders the ObjVer string associated with the current event/thread.
* `${mf-objid}` - renders the ObjID string associated with the current event/thread.
* `${mf-event-handler}` - renders the type of event currently being handled by the thread.
* `${mf-prop-def}` - renders the id of the property definition for property calculation and validation events.
* `${mf-state}` - renders the id of the current state for state action and conditional events.
* `${mf-next-state}` - renders the id of the next state for state transition events.
* `${mf-transition}` - renders the id of the state transition for state transition events.

#### Task Layouts
The following layouts will return values from threads processing tasks from the application task queues, when applicable.
* `${mf-task-queue}` - renders the queue id of the task currently being processed.
* `${mf-task-type}` - renders the type of task currently being processed.
* `${mf-task-id}` - renders the id of the task currently being processed.
* `${mf-broadcast-ids}` - renders the ids of the broadcasts currently being processed.


