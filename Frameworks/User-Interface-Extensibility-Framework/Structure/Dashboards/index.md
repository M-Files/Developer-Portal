---
layout: page
title: Dashboards in the User Interface Extensibility Framework
breadcrumb: Dashboards
---

Dashboards contain user interfaces that can be shown to the user as required.

## Declaration

<p class="note">Dashboards are defined within the <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/AppDef/">Application Definition (manifest) file</a>.  This page concentrates solely on the XML elements used to declare dashboards, and not other elements within the definition file.

Each application can contain one or more dashboards.  Each dashboard is declared within the application definition and provided with a unique ID.  This ID is used to reference the dashboard when showing or hiding it.

The following example declares a single dashboard and assigns it an ID of `myDashboard`.  It also defines the dashboard content to come from a file named `mydashboard.html`:

```xml
<dashboards>
	<dashboard id=`myDashboard`>
		<content>myDashboard.html</content>
	</dashboard>
</dashboards>
```

Multiple dashboards can be declared within a single application, by repeating the `<dashboard>` element.  Each dashboard must have its own unique ID:

```xml
<dashboards>
	<dashboard id=`myFirstDashboard`>
		<content>myFirstDashboard.html</content>
	</dashboard>
	<dashboard id=`mySecondDashboard`>
		<content>mySecondDashboard.html</content>
	</dashboard>
</dashboards>
```
## Loading remote content (allowing trusted domains)

## Showing and hiding dashboards


