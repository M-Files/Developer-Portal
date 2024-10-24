---
layout: page
title: Fast browsing in the User Interface Extensibility Framework
breadcrumb: Fast browsing
requiredMFilesServerVersion: 20.12
redirect_from:
 - /Frameworks/User-Interface-Extensibility-Framework/Fast-Navigation/
 - /Frameworks/User-Interface-Extensibility-Framework/Fast-Browsing/
legacy: true
---

UI Extensibility Applications that have been updated to v4 schema, using the instructions linked above, will not work with M-Files Desktop versions older than 20.12.  It is important that all of your M-Files Desktop clients are updated to version 20.12 or later before updating your UI Extensibility applications.
{:.note.warning}

M-Files 20.12 brings changes in which the M-Files Desktop Client builds and renders the client interface.  These changes can bring significant performance improvements.  These improvements are only activated if **all** UIX applications are marked as "fast browsing compatible".  **If one or more applications is not fast browsing compatible then you may see this dialog in your M-Files Desktop Client**:

![A dialog shown if one or more UIX applications is not fast-browsing compatible](dialog.png)

The primary difference between the legacy rendering mode and fast-browsing mode is that the [lifecycle](https://www.m-files.com/UI_Extensibility_Framework/#FrontPage.html) for the [ShellFrame](https://www.m-files.com/UI_Extensibility_Framework/#FrontPage.html) instance has changed.

In the legacy rendering mode, a `ShellFrame` instance would be created every time you entered a view, then destroyed when navigating to a new view.  This meant that all UI components that were attached to the `ShellFrame` (such as commands, tabs, etc.) needed to be re-created when the user navigated between views.

In fast-browsing mode the `ShellFrame` is created once - during the `ShellUI` startup process - and is not typically re-created when navigating between views.  The `ShellFrame` instance is created during the `ShellUI` startup process, during offline/online transitions and, in rare cases, during navigation.

For most applications this new behavior will not directly affect the application's functionality.  Some applications - those that rely on the previous `ShellFrame` lifecycle - may need alterations to correctly function in fast-browsing mode.

## How to tell if your application is fast-browsing-compatible

The easiest way to confirm whether your application is fast-browsing-compatible is to use M-Files Admin to export the application from your vault and then to check the application's [manifest file](../Application-Definition/).  You can do this by following these steps:

1. Open M-Files Admin and locate the vault containing your UI applications.
2. Right-click on the vault name and select `Applications`.
3. This will list all applications installed, both client applications and server applications (one column in the list states which is which).  Only client applications need to be updated.
4. Select each application in turn and click `Export...` and export them to your computer.

Some client applications appear as "children" of a server application (e.g. you must expand the server application to see the child).  You can use this process to confirm whether each child application is fast-browsing-compatible, but you should contact the author of the server application to implement the fix.  **The instructions below apply only to client applications which are distributed separately from a vault application.**
{:.note}

Once you have the applications they will have either an `.mfappx` or `.zip` extension.  Both of these files are zip files.  Rename any `.mfappx` files to `.zip` and extract their contents.  For each application you should end up with a folder within which there will be a file named `appdef.xml`.

1. Open this file using a text editor such as Notepad.
2. Locate any and all elements that start "&lt;module".  These XML elements define any modules in the application.  Most applications have a single module, but it is possible for applications to define multiple.
3. Check the "&lt;module&gt;" element attributes.  **If the module contains an attribute named `fast-browsing-compatible`, and the value is `true`, then this application is fast-browsing-compatible.**  If the module does not contain an attribute with this name, or the value is false, then the application is not fast-browsing-compatible.

### Examples

This is a fast-browsing-compatible application.  Note that the module has the `fast-browsing-compatible` attribute and its value is set to `true`:

![A module that is fast-browsing-compatible](fast-browsing-compatible.png)

These are not fast-browsing-compatible applications.  Note that the module either does not have the `fast-browsing-compatible` attribute, or the value is set to `false`:

![A module that is explicitly incompatible with fast browsing](fast-browsing-incompatible1.png)

![A module that is has no fast-browsing attribute](fast-browsing-incompatible2.png)

## New events

As the `ShellFrame`'s lifecycle cannot be used to identify when the user changes view, M-Files 20.12 adds two additional new events to the `ShellFrame`:

 * `Event_ViewLocationChanged`
 * `Event_ViewLocationChangedAsync`

These events are raised automatically when the user navigates into a new view.  The `Async` event is recommended to be used when the handler logic is more complex and should not block the user interface.

If registering to `Event_ContentChanged` within `Event_ViewLocationChanged`, it is possible that you will receive multiple callbacks before the listing is completely ready.  These callbacks may include no items in the list.  Using `Event_ViewLocationChangedAsync` should ensure that your code is only called when the listing is ready.

## Converting applications to fast-browsing compatible

### M-Files version requirements

The v4 client schema is only supported in M-Files 20.12 and higher.  Clients older than this version will not run any applications that target the v4 schema.
{:.note}

When enabling fast-browsing compatibility you may wish to change the `required-mfiles-version` value in the `appdef.xml` file to require M-Files 20.12 or newer:

```xml
<required-mfiles-version>20.12.0.0</required-mfiles-version>
```

### Altering the application

Most applications will not require modification.  If your application does not require modification then you can simply [update the application definition file](#updating-the-application-definition-file).

#### Updating the application definition file

The application definition file (`appdef.xml`) requires two changes:

1. The referenced schema must be changed to `http://www.m-files.com/schemas/appdef-client-v4.xsd`.
2. Any and all `ShellUI` module elements should have a `fast-browsing-compatible` attribute added with a value of `true`.
3. **If upgrading from the [v1 schema](../Application-Definition):** Ensure that you add the &lt;platforms&gt; and &lt;platform&gt; elements as appropriate (example below).

Below is a full example of an updated application definition file:

```xml
<?xml version="1.0"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v4.xsd">
  <guid>ff800931-f24a-aa39-99cf-b04b280e1af4</guid>
  <name>Fast-Browsing Compatible application</name>
  <version>0.1</version>
  <description></description>
  <publisher></publisher>
  <copyright></copyright>
  <required-mfiles-version>20.12.0.0</required-mfiles-version>
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

```javascript
shellFrame.Events.Register
(
	MFiles.Event.Started,
	function () {
		// Show the current path
		shellFrame.ShowMessage(shellFrame.CurrentPath)
	}
);
```

Another typical use-case where the application requires changes is when the application uses the ShellListing's Started event to react to shell listings. Code similar to following is of concern as the ShellListing is not recreated when navigating between views:

```javascript
function OnNewShellUI( shellUI ) {
    return {
        OnNewShellFrame: function ( shellFrame ) {
            return {
                OnNewShellListing: function ( shellListing ) {
                    return {
                        OnStarted: function () {
                            shellFrame.ShowMessage("ShellListing.Count: " + shellListing.Items.Count);
                        }
                    };
                }
            };
        }
    };
}
```

In the legacy rendering mode this would be executed every time the user went into a view; in the fast-browsing mode this would be executed only when the user first opened the M-Files interface.
{:.note}

#### Using the new events

The `ShellFrame` `Started` event will still fire when the user first opens M-Files but, from then on, the `ViewLocationChanged` event will fire instead.  To behave in the same way, code must now be written as:

```javascript
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

And the code for the OnShellListing case must be written as:

```javascript
function OnNewShellUI( shellUI ) {
    return {
        OnNewShellFrame: function ( shellFrame ) {
            return {
                OnNewShellListing: function (shellListing) {
                    return {
                        OnStarted: function () {
                            shellFrame.ShowMessage("ShellListing.Count: " + shellListing.Items.Count);
                        }
                    };
                },
                OnViewLocationChangedAsync: function () {

                    // Register to ContentChanged event in ViewLocationChangedAsync event, so that the
                    // first ContentChanged event includes the full listing.
                    var event = shellFrame.Listing.Events.Register(Event_ContentChanged, function ( shellItems ) {

                        // Do the work related to listing.
                        shellFrame.ShowMessage("ShellListing.Count " + shellItems.Count);

                        // Unregister the event so that this function triggers only once per view. Note also that
                        // if we do not unregister the event, it is not unregistered automatically when changing
                        // the view as the ShellFrame persists. As a result, we would have multiple registrations
                        // leading to multiple messages after changing views.
                        shellFrame.Listing.Events.Unregister( event );
                    });
                }
            };
        }
    };
}
```

If the application is running on a 20.12 (or later) vault but one or more of the applications is not explicitly marked as fast-browsing-compatible, then **all** applications will run in legacy mode.  For this reason it is important that your updated application continues to function using the old event model.  Note that the old event model is also needed when first entering M-Files and when performing online/offline transitions.
{:.note.warning}

For  most applications, all the ShellFrame related components should be created when the ShellFrame is created. There is usually no need to create these components from the new events, but if there is, do note that the components persist until the ShellFrame is recreated. 
{:.note}

#### Checking the rendering mode

Even if your application is marked as fast-browsing-compatible, it is still possible that the M-Files Desktop Client will be running in legacy rendering mode.  This can happen if other applications are installed in the vault and these applications are not fast-browsing-compatible.

If you need to check the current rendering mode then you can do so using the following code style:

```csharp
// Returns true if the client is running in fast browsing mode,
// i.e. all apps in the vault support fast browsing.
if( shellFrame.ShellUI.FastBrowsingActive )
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

### Additional considerations - an example

Consider an application using an approach such as the one below.  In this code the application checks the current path and adds a tab if it matches some expected value.

```javascript
shellFrame.Events.Register( 
      MFiles.Event.Started,
      function () {
            onShellFrameStarted( shellFrame )
} );

function onShellFrameStarted( shellFrame ) {

// Check if we are in the special view.
      if( shellFrame.CurrentPath === MySpecialViewPath ) {

            // Create tab with dashboard for my special view.
            // NOTE: This tab and dashboard will automatically be destroyed
            // when the shellframe location changes.
            var myTab = shellFrame.RightPane.AddTab( "myTab", "My Tab", "_last" );
            myTab.ShowDashboard( "myDashboard", {} );
            myTab.Visible = true;
            myTab.Select();
      }
}

```

If we lifted this code and adapted it so that it instead reacted to the `ViewLocationChanged` event, we could end up with a situation where the code adds multiple tabs to the ShellFrame.  This is because previously all tabs would be removed when the user navigated (and the old ShellFrame destroyed), whereas the tabs would persist with fast-browsing enabled.

In this instance, instead, the code should be modified to ensure that the tab is still only added once, showing and hiding the tab as appropriate as the user navigates between views:

```javascript
shellFrame.Events.Register( 
      MFiles.Event.Started,
      function () {

            // Listen for location changes if necessary.
            // NOTE: We can't access members on shellframe until it has started.
            if( shellFrame.ShellUI.FastBrowsingActive ) {
                  shellFrame.Events.Register( 
                        MFiles.Event.ViewLocationChanged,
                        function () {
                              reactToPathChanging( shellFrame )
                        } );
            }

            // React to initial location of shell frame.
            reactToPathChanging( shellFrame )
      } );

// New global holding our tab if it was already created.
// Would be better as object member, but kept simple for example.
// NOTE: myTab is initialized when there is a new ShellFrame. If
// myTab was defined outside the scope of the ShellFrame (in 
// ShellUI scope), it would need to be reinitialized with a new 
// ShellFrame as the tab that it is referring to is destroyed in
// ShellFrame recreation.
var myTab; 

function reactToPathChanging( shellFrame ) {

      // Check if we are in the special view.
      if( shellFrame.CurrentPath === MySpecialViewPath) {
            // We are in my special view.

            // This shell frame may have visited my special view already,
            // in which case we already would have created the tab, so we
            // need to create it only if we haven't already.
            if( !myTab ){

                  // Create the tab and dashboard.
                  myTab = shellFrame.RightPane.AddTab( "myTab", "My Tab", "_last" );
                  myTab.ShowDashboard( "myDashboard", {} );
            }

            // Make sure the tab is visible.
            myTab.Visible = true;
            myTab.Select();

      } else {

            // We are not in my special view.

            // This shell frame may have visited my special view already,
            // so we need to make sure if myTab was created, that it isn't
            // visible anymore now that we've left my special view.
            if( myTab ) {
                  myTab.Visible = false;
            }
      }
}

```