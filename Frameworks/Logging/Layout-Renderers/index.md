---
layout: page
title: Layout Renderers
includeInSearch: true
---


The logging library supports several custom layout renderers in addition to the [standard NLog layout renderers](https://nlog-project.org/config/?tab=layout-renderers).  These layout renderers can be included in any layout string and will be substituted with the appropriate value:

* `${application-guid}` - renders the current application GUID, if available, [in "D" format](https://docs.microsoft.com/en-us/dotnet/api/system.guid.tostring).
* `${application-name}` - renders the current application name, if available.
* `${application-version}` - renders the current application version, if available.
* `${server-guid}` - renders the current server GUID [in "D" format](https://docs.microsoft.com/en-us/dotnet/api/system.guid.tostring).
* `${vault-guid}` - renders the current vault GUID [in "D" format](https://docs.microsoft.com/en-us/dotnet/api/system.guid.tostring).
* `${log-context}` - renders any current [context](../#context) information.
