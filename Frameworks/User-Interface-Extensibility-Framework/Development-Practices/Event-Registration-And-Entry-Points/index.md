---
layout: page
title: Event Registration
includeInSearch: true
breadcrumb: Events
---

The User Interface Extensibility Framework is largely event-driven; each module must register a callback function for the events it wishes to be notified about.  There are a [large number of events](https://www.m-files.com/UI_Extensibility_Framework/#Events.html) to which modules can subscribe.  These events are raised as the user interacts with the user interface, or as events occur within the vault itself.

## Reacting to events

There are [numerous ways to register to be notified (section 3.2.4)](https://www.m-files.com/UI_Extensibility_Framework/#Event_Started.html) when events occur within the User Interface Extensibility Framework.  Our samples primarily use the `IEvents.Register` approach, as this allows multiple handlers to be registered for individual events.

```javascript
function OnNewShellUI( shellUI )
{
	/// <summary>Executed by the UIX when a ShellUI module is started.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>
	
	// This is the start point of a ShellUI module.

	// Register to be notified when a new shell frame (Event_NewShellFrame) is created.
	shellUI.Events.Register(
		Event_NewShellFrame,
		function(shellFrame)
		{
			// The shell frame was created.
		} );
}
```

<p class="note">Often objects cannot be accessed until they are started; attempting to use them before this point will result in an error.  In this case, register for the <code class="highlighter-rouge">OnStarted</code> event to be notified when the object can be used.</p>

```javascript
// Execute some code when the shell frame is created and available.

function OnNewShellUI( shellUI )
{
	/// <summary>Executed by the UIX when a ShellUI module is started.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>
	
	// This is the start point of a ShellUI module.

	// Register to be notified when a new shell frame (Event_NewShellFrame) is created.
	shellUI.Events.Register(
		Event_NewShellFrame,
		function(shellFrame)
		{
			// The shell frame was created but it cannot be used yet.
			// The following line would throw an exception ("The object cannot be accessed, because it is not ready."):
			// shellFrame.ShowMessage("A shell frame was created");

			// Register to be notified when the shell frame is started.
			shellFrame.Events.Register(
				Event_Started,
				function()
				{
					// The shell frame is now started and can be use.
					// Note: we are using the shellFrame from the outer function here.
					shellFrame.ShowMessage("A shell frame is available for use.");
				} );
		} );
}

```

Sometimes these nested registrations can lead to code lines getting excessively long.  Alternatively, the code above could be written in a slightly different way:

```javascript
// Execute some code when the shell frame is created and available.
var g_shellFrame = null;

function OnNewShellUI( shellUI )
{
	/// <summary>Executed by the UIX when a ShellUI module is started.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>

	// This is the start point of a ShellUI module.

	// Register to be notified when a new shell frame (Event_NewShellFrame) is created.
	shellUI.Events.Register(
		Event_NewShellFrame,
		handleNewShellFrame );
}

function handleNewShellFrame(shellFrame)
{
	/// <summary>Handles the OnNewShellFrame event for an IShellUI.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The shell frame object which was created.</param>

	// The shell frame was created but it cannot be used yet.
	// The following line would throw an exception ("The object cannot be accessed, because it is not ready."):
	// shellFrame.ShowMessage("A shell frame was created");

	// Update global scope variable to point to new shell frame.
	g_shellFrame = shellFrame;

	// Register to be notified when the shell frame is started.
	// This time pass a reference to the function to call when the event is fired.
	shellFrame.Events.Register(
		Event_Started,
		handleShellFrameStarted );
}

function handleShellFrameStarted()
{
	/// <summary>Handles the OnStarted event for an IShellFrame.</summary>

	// The shell frame is now started and can be used.
	// Note: we need to use the global-scope variable.
	g_shellFrame.ShowMessage("A shell frame is available for use.");
}
```

## Module entry points

Modules must contain correctly-named methods to be informed when they been started.  The method name varies according to the [type of module being instantiated]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#module-types).  Each method receives the main module object as a parameter:

### ShellUI modules

```javascript
function OnNewShellUI( shellUI )
{
	/// <summary>Executed by the UIX when a ShellUI module is started.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>

	// This is the start point of a ShellUI module.
}
```

<p class="note">More information on <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#shellui">ShellUI modules can be found here</a>.</p>

### VaultUI modules

```javascript
function OnNewVaultUI( vaultUI )
{
	/// <summary>Executed by the UIX when a VaultUI module is started.</summary>
	/// <param name="vaultUI" type="MFiles.VaultUI">The vault UI object which was created.</param>

	// This is the start point of a VaultUI module.
}
```

<p class="note">More information on <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#vaultui">VaultUI modules can be found here</a>.</p>

### VaultCore modules

```javascript
function OnNewVaultCore( vaultCore )
{
	/// <summary>Executed by the UIX when a VaultCore module is started.</summary>
	/// <param name="vaultCore" type="MFiles.VaultCore">The vault core object which was created.</param>

	// This is the start point of a VaultCore module.
} 
```

<p class="note">More information on <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#vaultcore">VaultCore modules can be found here</a>.</p>

## Dashboard entry points

[Dashboards]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/) are user interfaces that are shown to the user as required.  Dashboard content is held within HTML files which may reference external static content such as CSS files, JavaScript files or image files.

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Dashboard example</title>
		<script>
			function OnNewDashboard(dashboard)
			{
				/// <summary>Executed by the UIX when a dashboard is shown.</summary>
				/// <param name="dashboard" type="MFiles.Dashboard">Information about the dashboard being shown.</param>

				// This is the start point of a dashboard.
				dashboard.ShowMessage("The dashboard was started.");
			}
		</script>
	</head>
<body>
	The dashboard content goes here.
</body>
</html>
```
<p class="note">More information on <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/">dashboards can be found here</a>.</p>