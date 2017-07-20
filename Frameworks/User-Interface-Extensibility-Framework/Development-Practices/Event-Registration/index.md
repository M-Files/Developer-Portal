---
layout: page
title: Event Registration
includeInSearch: true
breadcrumb: Events
---

The User Interface Extensibility Framework is largely event-driven; each module must register a callback function for the events it wishes to be notified about.  There are a [large number of events](https://www.m-files.com/UI_Extensibility_Framework/#Events.html) to which modules can subscribe.  These events are raised as the user interacts with the user interface, or as events occur within the vault itself.

There are [numerous ways to register to be notified (section 3.2.4)](https://www.m-files.com/UI_Extensibility_Framework/#Event_Started.html) when events occur within the User Interface Extensibility Framework.  Our samples primarily use the `IEvents.Register` approach, as this allows multiple handlers to be registered for individual events.

```javascript
// Register to be notified when a new shell frame (Event_NewShellFrame) is created.
shellUI.Events.Register(
		Event_NewShellFrame,
		function(shellFrame)
		{
			// The shell frame was created.
		} );
```

<p class="note">Often objects cannot be accessed until they are started; attempting to use them before this point will result in an error.  In this case, register for the <code class="highlighter-rouge">OnStarted</code> event to be notified when the object can be used.</p>

```javascript
// Execute some code when the shell frame is created and available.

// Register to be notified when a new shell frame (Event_NewShellFrame) is created.
shellUI.Events.Register(
		Event_NewShellFrame,
		function(shellFrame)
		{
			// The shell frame was created.

			// But it cannot be used; this would throw an exception:
			// shellFrame.ShowMessage("A shell frame was created");

			// Register to be notified when the shell frame is started.
			shellFrame.Events.Register(
				Event_OnStarted,
				function(shellFrame)
				{
					// The shell frame is now started and can be use.
					shellFrame.ShowMessage("A shell frame is available for use.");
				} );
		} );
```


## Module entry points

Modules must contain correctly-named methods to be informed when they been started.  The method name varies according to the [type of module being instantiated]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#module-types).  Each method receives the main module object as a parameter:

### ShellUI modules

```javascript
function OnNewShellUI( shellUI )
{
	// This is the start point of ShellUI module.
}
```

### VaultUI modules

```javascript
function OnNewVaultUI( vaultUI )
{
	// This is the start point of VaultUI module.
}
```

### VaultCore modules

```javascript
function OnNewVaultCore( vaultCore )
{
	// This is the start point of VaultCore module.
} 
```

## Dashboard entry points