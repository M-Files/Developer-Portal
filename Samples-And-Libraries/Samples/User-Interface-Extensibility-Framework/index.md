---
layout: page
title: User Interface Extensibility Framework Samples
includeInSearch: true
breadcrumb: UIX
---

Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.
{:.note.warning}

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples#readme), which focus on achieving specific tasks using our public APIs or Frameworks.

The [Client-To-Server Communication sample]({{ site.baseurl }}/Samples-And-Libraries/Samples/Processes/Client-To-Server-Communication/) may also be of interest.
{:.note}

## Introductory

 Title | Source | Details
--- | --- | ---
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> [Hello, World](HelloWorld) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/HelloWorld/#readme) | Creates a basic UIX ShellUI application that displays a message when the shell frame object becomes available for use.
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> Show/Hide context menu item | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/AlterContextMenuDependingOnSelectedObject/#readme) | Shows and hides a context menu item depending on the selected objects (OnShowContextMenu).
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> [Commands](Commands) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/Commands/#readme) | Creates two commands (buttons) that interact with each other.
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> [Persistent Web Page](Display-Persistent-Web-Page-In-Tab)  | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/DisplayPersistentWebPageInTab/#readme) | Creates a persistent web page and shows the content within a tab on the right-hand-side of the interface.  The navigation within the tab is persisted even as the user interacts with M-Files (e.g. by navigating into a view).
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> Run local application | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/OpenExternalApplicationOnCommand/#readme) | Adds a command (button) to the task area and context menu, opening Notepad when the button is clicked.
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> [Built-in commands](BuiltInCommand-Event) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/BuiltInCommandEvent/#readme) | Shows how to react when built-in functionality (e.g. clicking `Log out`) is executed.
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> Confirm Workflow State Change | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/ConfirmWorkflowStateChange/#readme) | Shows how to react when properties of objects are saved, and to stop the action.  This sample prompts the user to confirm a workflow state transition before it is committed, allowing them to cancel the operation.
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> Show Web Page in tab (iframe) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/ShowWebPageInIFrame/#readme) | Shows how to display a remote web page in a tab, and how to pass data from items selected in the M-Files listings to the web page itself.  This sample searches Microsoft Bing for the title of the currently-selected object(s).
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> View URL Generator | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/ViewURLGenerator/#readme) | Shows how to generate a URL for the currently-selected view via a command and popup dashboard.
{:.samples .uix}

## Advanced

 Title | Source | Details
--- | --- | ---
<span class="platforms" title="Compatible with M-Files Desktop but incompatible with M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify incompatible" data-icon="mdi:web"></span></span> Using Managed Assemblies | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/UsingManagedAssemblies/#readme) | Shows how to interact with a .NET assembly distributed with the UIX application.
{:.samples .uix}

## Compatible with M-Files Web

 Title | Source | Details
--- | --- | ---
<span class="platforms" title="Compatible with M-Files Desktop and M-Files Classic Web"><span class="iconify" data-icon="mdi:windows"></span><span class="iconify" data-icon="mdi:web"></span></span> [Assign to me](AssignToMe) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/UIX%20Applications/AssignToMe/#readme) | Creates a button which is shown only when the user has items selected.  When the button is clicked, a separate assignment is created and assigned to the current user.  Functions in both M-Files Desktop client and M-Files Classic Web.
{:.samples .uix}
