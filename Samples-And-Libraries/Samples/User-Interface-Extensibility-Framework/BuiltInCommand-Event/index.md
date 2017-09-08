---
layout: page
title: Reacting when built-in commands are clicked
includeInSearch: true
breadcrumb: Built-in commands
---

This sample creates a basic User Interface Extensibility Framework application consisting of one [ShellUI module]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#shellui) which reacts when built-in commands are clicked.

The source code for this sample is available within our <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/BuiltInCommandEvent">GitHub Samples and Libraries repository</a>.
{:.note}

## Overview

This sample does not show how to create a [local development folder]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Local-Development-Folder/) or to [deploy the code to the M-Files server]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/).  It is assumed that a local development folder already exists, and that is the location in which the development is occurring.

## Creating the application structure

### Creating the application definition file

Into this folder we will create an [application definition file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/).  This file must be named `appdef.xml`.  The application will use [version 3 of the client schema]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/#v3-schema) (as we are only targeting newer M-Files versions), and the [supported platform will be set as desktop only]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/#declaring-compatibility-with-only-the-m-files-desktop-client).  The application will declare a single Shell UI module (with its code in `main.js`), and no dashboards.

```xml
<?xml version="1.0"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v3.xsd">
	<guid>BDB8D786-74AB-44E9-8F92-BF1FDDBB1FAE</guid>
	<name>Built-in Command Demonstration</name>
	<version>1.0</version>
	<description>Simple M-Files built-in command demonstration</description>
	<publisher>M-Files Corporation</publisher>
	<copyright>(c) M-Files Corporation 2015</copyright>
	<required-mfiles-version>11.1.4310.46</required-mfiles-version>
  <platforms>
    <platform>Desktop</platform>
  </platforms>
	<modules>
		<module environment="shellui">
			<file>main.js</file>
		</module>		
	</modules>
</application>
```

Ensure that your application has a unique GUID by using a GUID generator, such as <a href="https://guidgenerator.com/">this one</a>.
{:.note}

### Creating the module

Next we will create a [module file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/) to contain our actual application logic.  At this point we will just register to be notified of main lifecycle events:

* We will declare a [default entry point]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/#shellui-modules) for the ShellUI module.
* We will react to the `NewShellFrame` event and obtain a reference to the shell frame.
* We will react to the shell frame's `Started` event (as using the shell frame before this point will result in an exception).

```javascript
// NOTE! This code is for demonstration purposes only and does not contain any kind of
// 		 error handling. MUST be revised before using in production.

"use strict";
 
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
	/// <summary>Handles the OnNewNormalShellFrame event for an IShellUI.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The shell frame object which was created.</param>
 
	// The shell frame was created but it cannot be used yet.
	// The following line would throw an exception ("The object cannot be accessed, because it is not ready."):
	// shellFrame.ShowMessage("A shell frame was created");
 
	// Register to be notified when the shell frame is started.
	shellFrame.Events.Register(
		Event_Started,
		getNewShellListingHandler( shellFrame ) );
}
 
function getShellFrameStartedHandler(shellFrame)
{
	/// <summary>Gets a function to handle the OnStarted event for an IShellFrame.</summary>
 
	// The shell frame is now started and can be used.
	return function(){};
}
```

## Reacting to built-in commands

Once the `ShellFrame` is available for use, our code can register to be notified when the `BuiltinCommand` event is raised.  This event occurs whenever standard M-Files client functionality is used, such as clicking buttons to create new objects, or to log out.

To register, we provide a callback function which defines two parameters:

* `commandId` (long) - one of the built-in commands from the [BuiltinCommand enumeration](https://www.m-files.com/UI_Extensibility_Framework/#MFClientScript~BuiltinCommand.html).
* `param` (long) - either:
	* If the commandId is `BuiltinCommand_NewObject` then the ID of the object type being created (or -100 if not known), or
	* `-2` otherwise.

In this sample we will simply show the values in a message box:

``` javascript
// NOTE! This code is for demonstration purposes only and does not contain any kind of
// 		 error handling. MUST be revised before using in production.

"use strict";

function OnNewShellUI(shellUI)
{
	/// <summary>The entry point of ShellUI module.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The new shell UI object.</param> 

	// Register to be notified when a new shell frame is created.
	shellUI.Events.Register(
		Event_NewShellFrame,
		handleNewShellFrame );
}

function handleNewShellFrame(shellFrame)
{
	/// <summary>Handles the OnNewShellFrame event.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The new shell frame object.</param> 

	// Register to be notified of the started event.
	shellFrame.Events.Register(
		Event_Started,
		getShellFrameStartedHandler( shellFrame ) );
}

function getShellFrameStartedHandler(shellFrame)
{
	/// <summary>Gets a function to handle the Started event for shell frame.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The current shell frame object.</param> 
	/// <returns type="MFiles.Events.OnStarted">The event handler.</returns>

	// Return the handler function for Started event.
	return function()
	{
		// Register to be notified when a built-in command is executed.
		shellFrame.Commands.Events.Register(
			Event_BuiltinCommand,
			function(commandId, param)
			{
				/// <summary>Executed whenever a built-in command is clicked.</summary>
				/// <param name="commandId" type="BuiltinCommand">
				/// One of the built-in commands from the BuiltinCommand enumeration.
				/// ref: https://www.m-files.com/UI_Extensibility_Framework/#MFClientScript~BuiltinCommand.html
				/// </param> 
				/// <param name="param">
				/// If the <paramref name="commandId"/> is BuiltinCommand_NewObject then contains the object type id of the object to create (or -100 if not specified).
				/// Otherwise, returns -2.
				/// </param>
				/// <returns>A boolean defining whether the action should continue (true) or be cancelled (false).</returns>

				// Display every built-in command as message box.
				shellFrame.ShowMessage( "Command ID: " + commandId + ", param: " + param );

				// UI ext app should return true when nothing is processed and want to continue default command behaviour.
				// Although default value is true when nothing is returned.
				// Return false to cancel the standard command execution.
				return true;
			} );
	};
}
```

## Stopping the action from occurring

Occasionally, the action may need to be prevented from occurring.  To do this, return `false` from the handler rather than `true`.