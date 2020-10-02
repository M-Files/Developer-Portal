---
layout: page
title: Fast navigation in the User Interface Extensibility Framework
breadcrumb: Fast navigation
includeInSearch: true
requiredMFilesServerVersion: 20.11
---

M-Files 20.11 brings changes in which the M-Files Desktop Client builds and renders the client interface.  These changes can bring significant performance improvements.  These improvements are only activated if **all** UIX applications are marked as "fast navigation compatible".  **If one or more applications is not fast navigation compatible then you will see this dialog in your M-Files Desktop Client**:

![A dialog shown if one or more UIX applications is not fast-navigation compatible](dialog.png)

The primary difference between the legacy rendering mode and fast-navigation mode is that the [lifecycle](https://www.m-files.com/UI_Extensibility_Framework/#FrontPage.html) for the [ShellFrame](https://www.m-files.com/UI_Extensibility_Framework/#FrontPage.html) instance has changed.  In the legacy rendering mode, a `ShellFrame` instance would be created every time you entered a view, then destroyed when navigating to a new view.  This meant that all UI components that were attached to the `ShellFrame` (such as commands, tabs, etc.) needed to be re-created when the user navigated between views.  In fast-navigation mode the `ShellFrame` is created once - during the `ShellUI` startup process - and is not re-created when navigating between views.

For most applications this new behavior will not directly affect the application's functionality.  Some applications - those that rely on the previous `ShellFrame` lifecycle - may need alterations to correctly function in fast-navigation mode.

## New events

As the `ShellFrame`'s lifecycle cannot be used to identify when the user changes view, M-Files 20.11 adds two additional new events to the `ShellFrame`:

 * `Event_ViewLocationChanged`
 * `Event_ViewLocationChangedAsync`

These events are raised automatically when the user navigates into a new view.  The `Async` event is recommended to be used when the handler logic is more complex and should not block the user interface.

## Converting applications to fast-navigation compatible

### M-Files version requirements

The v4 client schema is only supported in M-Files 20.11 and higher.  Clients older than this version will not run any applications that target the v4 schema.
{:.note}

When enabling fast-navigation compatibility you may wish to change the `required-mfiles-version` value in the `appdef.xml` file to require M-Files 20.11 or newer:

```xml
<required-mfiles-version>20.11.0.0</required-mfiles-version>
```

### Altering the application

Most applications will not require modification.  If your application does not require modification then you can simply [update the application definition file](#updating-the-application-definition-file).

#### Updating the application definition file

The application definition file (`appdef.xml`) requires two changes:

1. The referenced schema must be changed to `http://www.m-files.com/schemas/appdef-client-v4.xsd`.
2. Any and all `ShellUI` module elements should have a `fast-browsing-compatible` attribute added with a value of `true`.

Below is a full example of an updated application definition file:

```xml
<?xml version="1.0"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v4.xsd">
  <guid>ff800931-f24a-aa39-99cf-b04b280e1af4</guid>
  <name>Fast-Navigation Compatible application</name>
  <version>0.1</version>
  <description></description>
  <publisher></publisher>
  <copyright></copyright>
  <required-mfiles-version>20.11.0.0</required-mfiles-version>
  <optional>true</optional>
  <enabled-by-default>true</enabled-by-default>
  <platforms>
    <platform>Desktop</platform>
  </platforms>
  <modules>
    <module environment="shellui" fast-browsing-compatible="true">
      <file>shellui.js</file>
    </module>
  </modules>
  <dashboards>
    <dashboard id="wrapper" >
      <content>wrapper.html</content>
    </dashboard>
  </dashboards>
</application>
```

#### Identifying problematic code

The typical use-case which requires modification is when an application uses the  `ShellFrame`'s `Started` event to check the current path.  This may be the case if your application only shows a tab in a certain view, for example.  Code similar to the following is of concern:

```csharp
shellFrame.Events.Register
(
	MFiles.Event.Started,
	function () {
		// Show the current path
		shellFrame.ShowMessage(shellFrame.CurrentPath)
	}
);
```

In the legacy rendering mode this would be executed every time the user went into a view; in the fast-navigation mode this would be executed only when the user first opened the M-Files interface.
{:.note}

#### Using the new events

The `ShellFrame` `Started` event will still fire when the user first opens M-Files but, from then on, the `ViewLocationChanged` event will fire instead.  To behave in the same way, code must now be written as:

```csharp
function reactToPathChanging()
{
	// Show the current path
	shellFrame.ShowMessage(shellFrame.CurrentPath)
}

// React when the user first opens M-Files.
shellFrame.Events.Register
(
	MFiles.Event.Started,
	reactToPathChanging
);

// React when they navigate within a view.
shellFrame.Events.Register
(
	MFiles.Event.ViewLocationChanged,
	reactToPathChanging
);
```

If the application is running on a 20.11 vault but one or more of the applications is not explicitly marked as fast-navigation-compatible, then **all** applications will run in legacy mode.  For this reason it is important that your updated application continues to function using the old event model.
{:.note.warning}

#### Checking the rendering mode

Even if your application is marked as fast-navigation-compatible, it is still possible that the M-Files Desktop Client will be running in legacy rendering mode.  This can happen if other applications are installed in the vault and these applications are not fast-navigation-compatible.

If you need to check the current rendering mode then you can do so using the following code style:

```csharp
if( MFiles.IsClientFeatureEnabled( "FastNavigationInMFShell" ) )
{
	shellFrame.Events.Register
	(
		MFiles.Event.ViewLocationChanged,
		function () {
			// TODO: React to the location changing.
			shellFrame.ShowMessage(shellFrame.CurrentPath)
		}
	);
}

```