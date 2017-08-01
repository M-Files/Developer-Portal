---
layout: page
title: Dashboards in the User Interface Extensibility Framework
breadcrumb: Dashboards
includeInSearch: true
---

Dashboards contain user interfaces that can be shown to the user as required.

## Dashboard content

Dashboard content is held within an HTML file.  This HTML file may refer to external static resources such as CSS files, JavaScript files or image files.  These files are typically packaged inside the User Interface Framework application, although they can be [loaded from remote sources](#loading-remote-content-allowing-trusted-content) if required.

All referenced files must be static; no server-side code (e.g. <a href="https://en.wikipedia.org/wiki/PHP">PHP</a> or <a href="https://www.asp.net/">ASP.NET</a>) can execute within a User Interface Extensibility Framework application.  Any preprocessing required (e.g. <a href="http://sass-lang.com/">SASS</a> or <a href="http://lesscss.org/">LESS</a>) must be processed before the UIX is run.
{:.note}

## Showing and hiding dashboards

More information on using dashboards is available in the <a href="https://www.m-files.com/UI_Extensibility_Framework/#UsingDashboards.html">M-Files UI Extensibility Framework documentation site</a>.
{:.note}

Dashboards are shown in one of a small number of locations within the M-Files client:
* Replacing the current listing.
* Within a tab on the right-hand-side of the screen, alongside the "Metadata" and "Preview" tabs.
* As a pop-up window, optionally [modal](https://en.wikipedia.org/wiki/Modal_window).

When a dashboard is shown, a JavaScript object can be passed to the dashboard for it to use.  This object may contain any information that is of use.  For example: you may decide to pass the currently-selected object(s) to the dashboard for it to process.

### Within a custom tab

Most dashboards are shown within their own custom tabs on the right-hand-section, alongside "Metadata" and "Preview".

{% comment %}
This page does not detail how to create a tab; that is shown in more detail on the <a href="#">Creating tabs page</a>.
{:.note}
{% endcomment %}

Dashboards are shown by calling [IShellPaneTabInterface.ShowDashboard](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IShellPaneTab~ShowDashboard.html).  This takes two arguments:

* The ID of the dashboard, as [defined in the appdef.xml file](#declaration).
* A [custom data object that the dashboard can read](#passing-content-to-dashboards-and-back).

```javascript
// This is the ID of the dashboard, as declared in the appdef.xml file.
var dashboardId = "myDashboardId";

// This is the data (empty) to send to the dashboard.
var customData = {};

// Show the dashboard in the current tab.
// Note: This assumes an IShellPaneTab reference.
shellPaneTab.ShowDashboard(dashboardId, customData);
```

### As a pop-up window

Dashboards can be shown within a pop-up window by calling [IShellFrame.ShowPopupDashboard](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IShellFrame~ShowPopupDashboard.html), [IDashboard.ShowPopupDashboard](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IDashboard~ShowPopupDashboard.html), or [IShellUI.ShowPopupDashboard](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IShellUI~ShowPopupDashboard.html), or [IVaultUI.ShowPopupDashboard](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IVaultUI~ShowPopupDashboard.html).  All methods take three arguments:

* The ID of the dashboard, as [defined in the appdef.xml file](#declaration).
* A boolean, to denote whether the dashboard should be opened as a modal window or not.  Modal windows will stop the user interacting with the M-Files Desktop client until the dashboard is closed.
* A [custom data object that the dashboard can read](#passing-content-to-dashboards-and-back).

```javascript
// This is the ID of the dashboard, as declared in the appdef.xml file.
var dashboardId = "myDashboardId";

// This is the data (empty) to send to the dashboard.
var customData = {};

// Show the dashboard using the current IShellUI (not modal).
// Note: This assumes an IShellUI reference.
shellUI.ShowPopupDashboard(dashboardId, false, customData);
```

### Replacing the current listing

In some situations, it may make sense to show a dashboard within the main listing area within M-Files; i.e. the area where the views and groupings are shown.  The listing area can be replaced with the content of a dashboard by calling [IShellFrame.ShowDashboard](https://www.m-files.com/UI_Extensibility_Framework/MFClientScript~IShellFrame~ShowDashboard.html).  This takes two arguments:

* The ID of the dashboard, as [defined in the appdef.xml file](#declaration).
* A [custom data object that the dashboard can read](#passing-content-to-dashboards-and-back).

```javascript
// This is the ID of the dashboard, as declared in the appdef.xml file.
var dashboardId = "myDashboardId";

// This is the data (empty) to send to the dashboard.
var customData = {};

// Show the dashboard in the listing area.
// Note: This assumes an IShellFrame reference.
shellFrame.ShowDashboard(dashboardId, customData);
```

To revert the listing area to showing the default content, call <a href="https://www.m-files.com/UI_Extensibility_Framework/MFClientScript~IShellFrame~ShowDefaultContent.html">IShellFrame.ShowDefaultContent</a>.
{:.note}

### Replacing the right or bottom panes

In some situations, it may make sense to replace the right and bottom panes.  The right pane can be replaced with the content of a dashboard by calling `IShellPaneContainer.ShowDashboard`.  This takes two arguments:

* The ID of the dashboard, as [defined in the appdef.xml file](#declaration).
* A [custom data object that the dashboard can read](#passing-content-to-dashboards-and-back).

```javascript
// This is the ID of the dashboard, as declared in the appdef.xml file.
var dashboardId = "myDashboardId";

// This is the data (empty) to send to the dashboard.
var customData = {};

// Show the dashboard in the right pane.
// Note: This assumes an IShellFrame reference.
shellFrame.RightPane.ShowDashboard(dashboardId, customData);

// Show the dashboard in the bottom pane.
// Note: This assumes an IShellFrame reference.
shellFrame.BottomPane.ShowDashboard(dashboardId, customData);
```

Replacing the right-pane implicitly creates a tab entitled "Application", into which the dashboard is loaded.  The bottom pane may not be shown by default, but can be made visible by setting <a href="https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IShellPaneContainer~Visible.html">BottomPane.Visible to true</a>.
{:.note}

## Tips and tricks

### Passing content to and from dashboards

#### Passing content from modules to dashboards

When showing a dashboard, a custom data object can be passed to the dashboard.  This custom data object can then be read by the dashboard and processed.

From within the module, call `ShowDashboard` or `ShowPopupDashboard` as appropriate, passing the custom data.  In this scenario I've passed a simple string:
```javascript
shellFrame.RightPane.ShowDashboard("myDashboardId", "hello world");
```

From within the dashboard, create a function named `OnNewDashboard` to react when the dashboard is shown.  This will be passed a [IDashboard](https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~IDashboard.html) object, which the `CustomData` can be read from:

```html
<html>
<head>
<title>Dashboard example</title>
</head>
<body>
<p>The message passed was: <span id="message"></span>.</p>

<script type="text/javascript">
function OnNewDashboard( dashboard )
{
	// Retrieve the dashboard custom data and display it on-screen.
	document.getElementById("message").innerHTML = dashboard.CustomData;
}
</script>
</body>
</html>
```

#### Passing content from dashboards to modules

The custom data object passed to the dashboard can contain simple data types, complex objects (e.g. M-Files API objects), functions, or almost any other type of content.  Passing a function to the dashboard allows that function to be used as a callback when certain events occur within the dashboard.

From within the module, call `ShowDashboard` or `ShowPopupDashboard` as appropriate, passing a custom data object containing a function:
```javascript
// Create the custom data object.
var customDataObject = {
	// Create a property named "myFunction" and assign it the function to call.
	// This function defines one parameter, but it could have any number.
	myFunction: function(param)
	{
		// Show the message.
		shellFrame.ShowMessage(param);
	}
};

// Show the dashboard.
shellFrame.RightPane.ShowDashboard("myDashboardId", customDataObject);
```

From within the dashboard, store a reference to the function passed, and call it when you need to pass content back to the module.  In this scenario, clicking the button will cause the module to show a message box with the text from the input:
```html
<html>
<head>
<title>Dashboard example</title>
</head>
<body>

<div>
	Text to send: <input type="text" id="textToSend" />
</div>
<div>
	<button onclick="return sendContent(event);">Send</button>
</div>

<script type="text/javascript">
var myFunctionReference = null;
function OnNewDashboard( dashboard )
{
	// Hold a reference to the callback function.
	myFunctionReference = dashboard.CustomData.myFunction;
}
function sendContent(e)
{
	// Get the text to send.
	var text = document.getElementById("textToSend").value;

	// Call the function.
	myFunctionReference(text);

	return false;
}
</script>
</body>
</html>
```