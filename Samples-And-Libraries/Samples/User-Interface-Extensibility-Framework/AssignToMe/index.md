---
layout: page
title: Creating assignments for selected objects
includeInSearch: true
breadcrumb: Assign to me
---

This sample creates a basic User Interface Extensibility Framework application consisting of one [ShellUI module]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#shellui) which shows a dialog box to the user when the [shell frame (section 2.6)](https://www.m-files.com/UI_Extensibility_Framework/index.html#DevGuide.htm) is available.  The shell frame is a useful object as it allows us to interact with the shell listings and commands (such as buttons) within the user interface.

<p class="note">The source code for this sample is available within our <a href="https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/Commands">GitHub Samples and Libraries repository</a>.</p>

## Overview

This sample does not show how to create a [local development folder]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Local-Development-Folder/) or to [deploy the code to the M-Files server]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Deployment/).  It is assumed that a local development folder already exists, and that is the location in which the development is occurring.

## Creating the application structure

### Creating the application definition file

Into this folder we will create an [application definition file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/).  This file must be named `appdef.xml`.  The application will use [version 3 of the client schema]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/#v3-schema) (as we are only targeting newer M-Files versions), and the [supported platform will be set as desktop and web]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/#declaring-compatibility-with-only-the-m-files-desktop-client).  The application will declare a single Shell UI module (with its code in `main.js`), and no dashboards.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v3.xsd">
	<guid>1B9552B3-C1C5-44b9-905F-D4ABAC5E7FF2</guid>	
	<name>Assign to me UIX sample</name>
	<version>1.1</version>
	<description>A demonstration application for reacting to selected items and assigning them via a command.</description>
	<publisher>M-Files Corporation</publisher>
	<copyright>(c) M-Files Corporation 2017</copyright>
	<required-mfiles-version>11.3.0000.0</required-mfiles-version>
	<platforms>
		<platform>Desktop</platform>
		<platform>Web</platform>
	</platforms>
	<modules>
		<module environment="shellui">
			<file>main.js</file>
		</module>
	</modules>
</application>
```
<p class="note">Ensure that your application has a unique GUID by using a GUID generator, such as <a href="https://guidgenerator.com/">this one</a>.</p>

### Creating the module

Next we will create a [module file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/) to contain our actual application logic.

```javascript
// NOTE! This code is for demonstration purposes only and does not contain any kind of
// 		 error handling. MUST be revised before using in production.
//		 Created by: Craig Hawker / M-Files

"use strict";

var currentlySelectedItems = null;

function OnNewShellUI(shellUI) {
	/// <summary>The entry point of ShellUI module.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The new shell UI object.</param> 

	// Register to listen new shell frame creation event.
	shellUI.Events.Register(
		Event_NewShellFrame,
		newShellFrameHandler );
}

function newShellFrameHandler(shellFrame)
{
	/// <summary>Handles the OnNewShellFrame event.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The new shell frame object.</param> 

	// Register to listen to the started event.
	shellFrame.Events.Register(
		Event_Started,
		getShellFrameStartedHandler( shellFrame ) );
}

function getShellFrameStartedHandler(shellFrame) {
	/// <summary>Gets a function to handle the Started event for shell frame.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The current shell frame object.</param> 
	/// <returns type="MFiles.Events.OnStarted">The event handler.</returns>

	// Return the handler function for ShellFrame's Started event.
	return function ()
	{
		// Create a command for "assign to me".
		var assignCommandId = shellFrame.Commands.CreateCustomCommand( "Assign to me" );

		// Add the command to the task pane.
		// ref: http://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ITaskPane~AddCustomCommandToGroup.html
		shellFrame.TaskPane.AddCustomCommandToGroup( assignCommandId, TaskPaneGroup_Main, 0 );

		// Hide the command.  We will show it when the selected items change.
		shellFrame.Commands.SetCommandState( assignCommandId, CommandLocation_All, CommandState_Hidden );
		
		// Register to listen to when new shell listings are created.
		shellFrame.Events.Register(
			Event_NewShellListing,
			getNewShellListingHandler( shellFrame, assignCommandId ) );

		// Register to respond to commands being clicked.
		shellFrame.Commands.Events.Register(
			Event_CustomCommand,
			function(command)
			{
				// We only care about our command.
				// If the command being clicked is something else then return.
				if (command != assignCommandId)
				{
					return;
				}

				// Ensure we have items to process.
				if (null == currentlySelectedItems)
				{
					return;
				}

				// Create the assignment object.
				createAssignmentObject( shellFrame );
			} );
	};
}

function getNewShellListingHandler(shellFrame, assignCommandId) {
	/// <summary>Gets a function to handle the NewShellListing event for shell frame.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The current shell frame object.</param> 
	/// <returns type="MFiles.Events.OnNewShellListing">The event handler.</returns>

	// Return the handler function for NewShellListing event.
	return function (shellListing) {

		// Listen for selection change events on the listing.
		shellListing.Events.Register(
			Event_SelectionChanged,
			function(selectedItems)
			{
				// Sanity.
				if (false == shellListing.IsActive)
				{
					return false;
				}

				// Set the currently-selected items to null (assume nothing selected).
				currentlySelectedItems = null;

				// Has the user got any object versions selected?
				if (selectedItems.ObjectVersions.Count == 0)
				{
					// Hide the menu item - there's nothing selected.
					shellFrame.Commands.SetCommandState( assignCommandId, CommandLocation_All, CommandState_Hidden );
					return false;
				}

				// Show the menu item.
				shellFrame.Commands.SetCommandState( assignCommandId, CommandLocation_All, CommandState_Active );

				// Store the selected items.
				currentlySelectedItems = selectedItems;

				// We succeeded; return true.
				return true;
			} );
	};
}

function getExceptionHandler()
{
	/// <summary>Returns a generic exception handler for exceptions occurring in async calls.</summary>

	return function(shorterror, longerror, errorObject)
	{
		// Failed. Report the error.
		// ref: http://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/#reporting-exceptions
		MFiles.ReportException( errorObject );
	};
}

function retrieveRelationshipPropertyValues(shellFrame, selectedItems, callback)
{
	/// <summary>Retrieves property values representing relationships to the selecteed items.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The current shell frame object.</param> 
	/// <param name="selectedItems" type="MFiles.IShellItems">The items that are selected (https://www.m-files.com/UI_Extensibility_Framework/#MFClientScript~IShellItems.html).</param> 
	/// <param name="callback">A function to be called back when the data is loaded.</param> 

	// Note the number of items that we expect to retrieve data for.
	var totalItems = selectedItems.ObjectVersions.Count - 1; // Note 1-based index.

	// The number of items that have been retrieved is zero.
	var itemsComplete = 0;

	// Create an array to store the property values.
	var relationshipPropertyValues = [];

	// Returns a function that can be called when the object type is loaded from GetObjectType.
	function getSuccessHandler(selectedItem)
	{
		return function(objectType)
		{
			// Get the default property definition of this object type.
			// ref: https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~ObjType~DefaultPropertyDef.html
			var defaultPropertyDef = objectType.DefaultPropertyDef;

			// Do we have a property value already?
			// Will happen if they select two of the same object type.
			var propertyValue = null;
			for (var e = 0; e < relationshipPropertyValues.length; e++)
			{
				if (relationshipPropertyValues[e].PropertyDef == defaultPropertyDef)
				{
					// If so then we can use this existing property value.
					propertyValue = relationshipPropertyValues[e];
					break;
				}
			}

			// If there isn't already a property value for this object type, we need to create it.
			if (propertyValue == null)
			{
				// Create the property value and initialise.
				propertyValue = new MFiles.PropertyValue();
				propertyValue.PropertyDef = defaultPropertyDef;
				propertyValue.Value.SetValue( MFDatatypeMultiSelectLookup, new MFiles.Lookups() );

				// Ensure that the new property value is added to the array.
				relationshipPropertyValues.push( propertyValue );
			}

			// Retrieve the current lookups (if there are any).
			var lookups = propertyValue.Value.GetValueAsLookups();

			// Add this item to the lookup.
			var lookup = new MFiles.Lookup();
			lookup.Item = selectedItem.ObjVer.ID; // The ID of the item selected.
			lookup.ObjectType = selectedItem.ObjVer.Type; // The type of the item selected.
			lookups.Add( -1, lookup );

			// Update the lookups in the property value.
			propertyValue.Value.SetValue( MFDatatypeMultiSelectLookup, lookups );
		}
	}

	// Returns a function that runs whether the call to getobjectype worked or not.
	// This will increment the number of items returned and call the callback if required.
	function getCleanupHandler()
	{
		return function()
		{
			// Increment the items returned.
			itemsComplete++;

			// If we hit the number of items that we expected then execute the callback.
			if (itemsComplete >= totalItems)
			{
				callback( relationshipPropertyValues );
			}
		}
	}

	// Iterate over the objects and populate the properties for the assignment.
	for (var i = 0; i < selectedItems.ObjectVersions.Count; i++)
	{
		// Get the item.
		var selectedItem = selectedItems.ObjectVersions[i];

		// Load the object type (async) and use the handlers to handle the returned data.
		shellFrame.ShellUI.Vault.Async.ObjectTypeOperations.GetObjectType(
			selectedItem.ObjVer.Type,
			getSuccessHandler( selectedItem ),
			getExceptionHandler(),
			getCleanupHandler()
		);
	}
}

function createAssignmentObject(shellFrame)
{
	/// <summary>Creates an assignment for the currently-selected items, assigning it to the current user.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The current shell frame object.</param> 
	/// <returns type="MFiles.ObjectVersionAndProperties">The event handler.</returns>

	// Create the property values for the new object.
	var propertyValues = new MFiles.PropertyValues();

	// Class property value.
	var classPropertyValue = new MFiles.PropertyValue();
	classPropertyValue.PropertyDef = 100; // Built-in property for class.
	classPropertyValue.Value.SetValue( MFDatatypeLookup, -100 ); // Built-in class for assignment.
	propertyValues.Add( -1, classPropertyValue );

	// Name or title property.
	var nameOrTitlePropertyValue = new MFiles.PropertyValue();
	nameOrTitlePropertyValue.PropertyDef = 0; // Built-in property for name or title.
	nameOrTitlePropertyValue.Value.SetValue( MFDatatypeText, "Assignment" );
	propertyValues.Add( -1, nameOrTitlePropertyValue );

	// Single-file-document property.
	var singleFileDocumentPropertyValue = new MFiles.PropertyValue();
	singleFileDocumentPropertyValue.PropertyDef = 22; // Built-in property for single file document.
	singleFileDocumentPropertyValue.Value.SetValue( MFDatatypeBoolean, false );
	propertyValues.Add( -1, singleFileDocumentPropertyValue );

	// Assigned to property.
	var assignedToPropertyValue = new MFiles.PropertyValue();
	assignedToPropertyValue.PropertyDef = 44; // Built-in property for assigned to.
	var userLookups = new MFiles.Lookups();
	var userLookup = new MFiles.Lookup();
	userLookup.Item = shellFrame.ShellUI.Vault.SessionInfo.UserID;
	userLookups.Add( -1, userLookup );
	assignedToPropertyValue.Value.SetValue( MFDatatypeMultiSelectLookup, userLookups );
	propertyValues.Add( -1, assignedToPropertyValue );

	function getRelationshipPropertyValuesLoadedHandler()
	{
		/// <summary>Returns a handler to be called when the relationship property values are loaded.</summary>
		/// <returns type="MFiles.ObjectVersionAndProperties">The event handler.</returns>

		return function(relationshipPropertyValues)
		{
			/// <summary>Handles property values being loaded for the relationships, and creates the object in the vault.</summary>
			/// <param name="relationshipPropertyValues">An array of the property values for the object relationships.</param> 

			// Add the relationship property values to the property values for the assignment.
			for (var i = 0; i < relationshipPropertyValues.length; i++)
			{
				propertyValues.Add( -1, relationshipPropertyValues[i] );
			}

			// Create the default values for the assignment.
			var assignmentObjectTypeId = 10;
			var sourceObjectFiles = new MFiles.SourceObjectFiles();
			var accessControlList = new MFiles.AccessControlList();

			// If we are running in web then use the async operation.
			// CurrentApplicationPlatform returns a 2 in web mode, but nothing on desktop.
			if (2 == MFiles.CurrentApplicationPlatform)
			{
				shellFrame.ShellUI.Vault.Async.ObjectOperations.CreateNewObject(
					assignmentObjectTypeId,
					propertyValues,
					sourceObjectFiles,
					accessControlList,
					function(objectVersionAndProperties)
					{
						// Check it in.
						shellFrame.ShellUI.Vault.Async.ObjectOperations.CheckIn(
							objectVersionAndProperties.ObjVer,
							function()
							{
								// Say that it worked.
								shellFrame.ShowMessage( "Assigned to you." );
							} );
					},
					getExceptionHandler() );
			}
			else
			{
				// If we are running in desktop then use the sync version.
				// This is because SourceObjectFiles is not cloneable on the desktop, but the web deals with it for us.
				var objectVersionAndProperties = shellFrame.ShellUI.Vault.ObjectOperations.CreateNewObject(
					assignmentObjectTypeId,
					propertyValues,
					sourceObjectFiles,
					accessControlList );

				// Check it in.
				shellFrame.ShellUI.Vault.Async.ObjectOperations.CheckIn( objectVersionAndProperties.ObjVer );
				// Say that it worked.
				shellFrame.ShowMessage( "Assigned to you." );
			}
		};
	}

	// For each selected item, we need to create the appropriate property value to reference it.
	// When the data has been loaded, getRelationshipPropertyValuesLoadedHandler will be called.
	retrieveRelationshipPropertyValues(
		shellFrame,
		currentlySelectedItems,
		getRelationshipPropertyValuesLoadedHandler() );
}
```