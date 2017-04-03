---
layout: page
title: Visual Studio Template
---

M-Files provides partners with a Visual Studio 2015 template that can be used to rapidly develop Vault Application Framework Applications using C#.  If you would like to use VB.NET then you will need to follow [these instructions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/using-vb.net/).

## Downloading the Template

The template can be downloaded from the [M-Files Partner Portal](https://partners.cloudvault.m-files.com/openfile.aspx?vault=CE7643CB-C9BB-4536-8187-707DB78EAF2A&objtype=0&docid=1262&fileid=3005&filever=-1), which is available to all M-Files Partners.  If you are a partner and do not have access to the M-Files Partner Portal, then please contact your Channel Account Manager.  To install the template, simply double-click on the ".vsix" file, which will then guide you through installing the template into the version of Visual Studio that you have installed.

## Building your first application ("hello, world")

In this example we will create a basic Vault Application Framework application and install it into the Sample Vault, running on the local machine.

<p class="note">Note: If you do not have M-Files installed on the same machine as Visual Studio, then you must [deploy the zip file manually](#manual-deployment).  Debugging can be undertaken on remote applications by [following these instructions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Debugging/#Remote-Debugging)</p>

### Creating an application from the template

Creating a new Vault Application Framework application can be done from within Visual Studio by clicking `File`, `New`, `Project`, then selecting `M-Files Vault Application` From the list of Visual C# templates:

![Creating a new project](create-new-project.png)

### An overview of the project contents

![The project contents](solution-explorer.png)

The default project contains a number of items:

* `src\VaultApplication.cs`
The actual Vault Application Framework application.
* `appdef.xml`
The application manifest file, containing information such as the publisher details and the current version number.
* `MFVaultApplicationInstaller.exe`
Used by the [build event](#adjusting-the-build-event) to create the installation package and, optionally, to deploy it to the local M-Files server.
* `packages.conf`
The packages configuration file details the [Nuget packages that are required](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore) for the Vault Application Framework to run.

### Adjusting the build event

Details on the build event can be found by viewing the project properties (right-click on `MFVaultApplication`, or the name of your project, and select `Properties`) and selecting the `Build Events` tab on the left:

![Finding the build event](build-event.png)

By default, the post-build event command line is set to the following:
`start "Installing Vault Application" /D "$(TargetDir)" "MFVaultApplicationInstaller.exe" "Sample Vault"`

This instructs Visual Studio, after the build process has completed, to execute the M-Files Vault Application Installer.  This installer will create a zip file within the output folder and then attempt to deploy the application to the vault named "Sample Vault".  This can be altered to the name of the vault you wish to install to.  For example, the following will instruct the installer to deploy the application into a vault named "My Test Vault".
`start "Installing Vault Application" /D "$(TargetDir)" "MFVaultApplicationInstaller.exe" "My Test Vault"`

<p class="note">Note: The name passed to the installer is the name of the vault on the server, not the name of the vault configured within the M-Files Desktop Settings application.</p>

If you do not have an M-Files server running locally, the build event command line can be altered to avoid the deploy step.  In this scenario the application zip will still be created, and the path to the zip output for manual deployment.  This is done by simply removing the final argument from the command line:
`start "Installing Vault Application" /D "$(TargetDir)" "MFVaultApplicationInstaller.exe"`

### Building and deploying

### Observing the output

### Debugging

## Tips and tricks

### Manual deployment

If you do not have an M-Files server running on your local machine, then the build event command cannot automatically deploy your code to the vault.  In this instance, you must manually copy the zip file created by the build event to the server, and install it using the M-Files Admin software.

### Nuget packages and versions

The current Vault Application Framework release (1.0.128.0) requires Newtonsoft.Json (JSON.NET) version 6.0.8.  If this is upgraded to a later version then your Vault Application Framework application will not correctly load.

### Application GUIDs

Whenever an application is created from the Visual Studio template, the `<guid></guid>` element in `appdef.xml` is automatically set to be a new Globally Unique IDentifier.  This GUID is used to uniquely identify each application, as each M-Files vault can only have one application with each GUID installed.

If you manually create an `appdef.xml` file, or copy it from another location, you must ensure that the guid is altered to be unique.  There are a number of [online tools](https://www.bing.com/search?q=guid+generator) that can be used to generate GUIDs.  Note that the GUID should be entered into the `<guid></guid>` element without braces, but with hyphens (e.g. `<guid>f7fbe39a-2031-4b42-9856-05444ecce446</guid>`).