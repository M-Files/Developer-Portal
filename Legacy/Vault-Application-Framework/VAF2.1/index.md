---
layout: page
title: The Vault Application Framework Visual Studio Template
includeInSearch: true
breadcrumb: Visual Studio Template
legacy: true
latest_version: /Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.3/
---

M-Files provides developers with a Visual Studio 2017/2019 template that can be used to rapidly develop Vault Application Framework Applications using C#.

## Downloading the Template

The Vault Application Framework 2.1 template is part of the `M-Files Online Visual Studio template package`, which can be downloaded from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=M-Files.MFilesVisualStudioExtensions).

Different versions of the Vault Application Framework template are available in this package.  You should use the latest one that is compatible with the version of M-Files that you are targeting.  Older versions should only be used if targeting older installations.
{:.note}

## Building your first application

In this example we will create a basic Vault Application Framework application and install it into the Sample Vault, running on the local machine.

If you do not have M-Files installed on the same machine as Visual Studio, then you must [deploy the zip file manually](#manual-deployment).  Debugging can be undertaken on remote applications by [following these instructions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Development-Practices/Debugging/#Remote-Debugging).
{:.note}

### Creating an application from the template

Creating a new Vault Application Framework application can be done from within Visual Studio by clicking `File`, `New`, `Project`, then selecting `M-Files Vault Application 2.1` From the list of Visual C# templates:

![Creating a new project](create-new-project.png)

### An overview of the project contents

![The project contents](solution-explorer.png)

The default project contains a number of items:

* `appdef.xml`
The application manifest file, containing information such as the publisher details and the current version number.
* `Configuration.cs`
The configuration class used by the Vault Application Framework application.
* `install-application.ps1`
A PowerShell script used to deploy the installation package to the local M-Files server.
* `VaultApplication.cs`
The actual Vault Application Framework application.
* `packages.conf`
The packages configuration file details the [Nuget packages that are required](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore) for the Vault Application Framework to run.

### The default application

![The default application](default-application.png)

The template automatically creates a `VaultApplication` class, which is the entry point to your application.  This class derives from the VAF 2.1 base class and defines that the `Configuration` class is used for [configuration]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/#vaf-21).

To customise this default application, check out our samples and libraries or other tutorials.

### The PowerShell script

The PowerShell script has not changed from the [VAF 2.0 version]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.0/#the-powershell-script).
{:.note}

### Building and deploying

Building and deploying has not changed from the [VAF 2.0 version]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.0/#building-and-deploying).
{:.note}

## Debugging

Debugging has not changed from the [VAF 2.0 version]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.0/#debugging).
{:.note}

## Tips and tricks

Please also see the [tips and tricks for the VAF 2.0 version](/Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.0/#tips-and-tricks), as they also apply here.
{:.note}

### Nuget packages and versions

The Vault Application Framework 2.1 release requires Newtonsoft.Json (JSON.NET) version 10.0.3.
