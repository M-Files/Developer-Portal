---
layout: page
title: Versions
includeInSearch: true
---

## Feature Compatibility Matrix

Feature | [Version 1.0](#version-10) | [Version 2.0](#version-20) | [Version 2.1](#version-21) | [Version 2.2](#version-22) | [Version 2.3](#version-23)
--- | ---
Minimum M-Files Server Version | 2015 | 2015.3 | 19.9 | 20.5 | 20.5
[Automatic State Transitions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#automatic-state-transitions) | Yes | Yes | Yes | Yes | Yes
[Background Operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/) | Yes | Yes | Yes | Yes | Yes
[Configuration](../Configuration) | Yes | Yes | Yes | Yes | Yes
[Configuration commands and buttons](../Configuration/Commands) | - | - | Yes | Yes | Yes
[Event Handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/) | Yes | Yes | Yes | Yes | Yes
[File helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#mffilehelper) | - | Yes | Yes | Yes | Yes
[Licensing](../Licensing) | - | Yes | Yes | Yes | Yes
[ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#objverex) | Yes | Yes | Yes | Yes | Yes
[Property Calculation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/#property-calculation) | Yes | Yes | Yes | Yes | Yes
[Property Validation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/#property-validation) | Yes | Yes | Yes | Yes | Yes
[Search helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/#introducing-mfsearchbuilder) | Yes | Yes | Yes | Yes | Yes
[System helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#sysutils) | Yes | Yes | Yes | Yes | Yes
[Url helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#urlhelper) | - | Yes | Yes | Yes | Yes
[Vault Extension Methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Vault-Extension-Methods/) | Yes | Yes | Yes | Yes | Yes
Workflow [Pre-]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#state-pre-conditions) and [Post-]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#state-post-conditions)Conditions | Yes | Yes | Yes | Yes | Yes
[Workflow State Actions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#workflow-state-actions) | Yes | Yes | Yes | Yes | Yes
[Multi-Server Mode helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/) | - | - | - | Yes | Yes
--- | ---

## Version 2.3

This release brings huge improvements around the utilisation of task queues.  These improvements include improved stability and retry logic/control, but the primary visible improvement is the removal of almost all boilerplate code required to implement and use [task queues]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Task-Queues/).  The [previous method]({{ site.baseurl }}/Legacy/Vault-Application-Framework/VAF2.2/Multi-Server-Mode/Task-Queues/) for using task queues is still available, but you may wish to consider migrating to the new approach.

Note that when upgrading existing projects to VAF 2.3 you will need to re-install the `Newtonsoft.JSON` package and potentially alter long-running task queue processes.  More details [are below](#from-version-22-to-version-23).
{:.note}

## Version 2.2

Alongside numerous internal bugfixes and performance work, this release brings compatibility with the [M-Files Multi-Server Mode functionality]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/).  This version can also be used on single-server implementations of M-Files, provided the M-Files server version is at least 20.5.

In this release, if inheriting from `ConfigurableVaultApplicationBase`, the Vault Application Framework will only find and resolve `MFIdentifier` instances created on your `Configuration` class.  If you are using `MFIdentifier` instances in other locations (e.g. directly on your `VaultApplication` class) then note that these will not automatically be resolved at vault startup.
{:.note}

## Version 2.1

Alongside numerous internal bugfixes and performance work, this release brings four new major features:

* The Vault Application Framework is now [published to NuGet](https://www.nuget.org/packages/MFiles.VAF).  This allows us to publish more easily - and faster - Vault Application Framework versions, and for code to be upgraded to use these new versions.

* Ability to define [security constraints in configuration](../Attributes/Configuration/Security).

* [Commands can be added](../Configuration/Commands) to various built-in areas in the M-Files Admin Configurations area screens.

* [Buttons within dashboards](../Configuration/Custom-Dashboards/#using-commands-within-dashboards) can call server-side code when clicked.

In addition, please note that there are two changes in method signatures from [version 2.0](#version-20).  Both of these changes are implemented to work around situations where code attempts to start background operations when the vault may not yet be fully operational:

* `BackgroundOperationManager.StartRecurringBackgroundOperation` now returns a `Task<BackgroundOperation>`, a change from `BackgroundOperation` in VAF 2.0.
* `BackgroundOperationManager.RunOnce` now returns a `Task`, a change from `void` in VAF 2.0.

## Version 2.0

Alongside numerous internal bugfixes and performance work, this release brings two new major features:

* [Licensing](../Licensing)

* [Compatibility with the M-Files 2018 Administration Configuration interface](../Configuration)

### Configuration compatibility

Version 2.0 of the Vault Application Framework introduces a new pattern for exposing [application-specific configuration into the M-Files Admin](../Configuration).  As M-Files 2015.3 (and earlier) do not contain this section within the M-Files Admin interface, it is recommended that the [earlier configuration approach](#name-value-storage-configuration) (which continues to work in Version 2.0) is used where compatibility is required with legacy versions.

Version 2.1 of the Vault Application Framework extends this configuration ability, allowing [developers to instruct the user interface to mask values that are entered (e.g. passwords), to restrict sections of configuration so that only server administrators (not vault administrators) can change the values](../Attributes/Configuration/Security), and to add [buttons to the dashboard which run server-side code](../Configuration/Custom-Dashboards/#using-commands-within-dashboards).

It is recommended that you use the [new approach to configuration](../Configuration) for new VAF applications, and upgrade older approaches where possible.
{:.warning}

## Version 1.0

Version 1.0 of the Vault Application Framework was released in early 2016.  This release included a wide variety of functionality, including:

* [Attribute-based]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/) automated installation of scripts into the M-Files vault, including [workflow state actions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/), [property calculations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/), [event handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/) and more.
* [Background operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/)
* [Helper objects]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/) to aid working with the M-Files vault and Microsoft Windows environment.
* [Search helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/)

### Name-Value Storage Configuration

The initial release of the framework supported [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfconfiguration) that were used to mark up configuration objects used by each application.  These configuration objects were serialised into Name-Value storage, and the [Name-Value Storage Manager](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/0A8D789B-4E2B-4649-B1A1-AF0755B0C444/latest) could be used to alter them at runtime.

The 2.0 release of the framework introduced another approach which integrates with the new configuration administration interface in M-Files 2018.  It is recommended that applications that target M-Files 2018 and upwards migrate to the new version.

## Upgrading versions

When you upgrade the Vault Application Framework you may need to make some small changes due to changes in class namespaces or method signatures.
{:.note.warning}

### From Version 2.2 to Version 2.3

#### Newtonsoft.JSON reinstallation

Due to a change in the way in which references are used, upgrading from VAF 2.2 (or older) to VAF 2.3 may cause the application to not be able to find the `Newtonsoft.JSON` DLL.  New projects created from the VAF 2.3 Visual Studio template are not affected.  **When upgrading an existing project to VAF 2.3, you must**:

* Click the `Tools` menu in Visual Studio, select `NuGet Package Manager`, and then `Package Manager Console`
* In the NuGet Package Manager Console, ensure that the "Default Project" is your VAF project.
* Enter the following command: `Update-Package -id Newtonsoft.JSON -reinstall`.  This will reinstall the current version of the package to the project.

#### Migrate to VAF 2.3 task queues

Migrate older background operations, or VAF 2.2-style task queues, across to the new [VAF 2.3 approach]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Task-Queues/).  Note that in VAF 2.3 the task processors run, by default, in [`Hybrid` transaction mode]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Task-Queues/#using-the-hybrid-default-transaction-mode).

### From Version 2.1 to Version 2.2

New VAF 2.2 applications can be created using the [M-Files Online Visual Studio template](https://marketplace.visualstudio.com/items?itemName=M-Files.MFilesVisualStudioExtensions).  Projects using the Vault Application Framework 2.1 nuget package can be manually upgraded to use the Vault Application Framework 2.2 runtime:

* Right-click on the project name and select `Manage NuGet Packages...`
* Select the existing `M-Files.VAF` reference and click the `Update` button to upgrade to the latest published 2.2 version.

To upgrade your VAF 2.2 application to be compatible with M-Files Multi-Server Mode, please follow the [online conversion guidance]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/#converting-an-existing-vault-application-framework-project).

If inheriting from `ConfigurableVaultApplicationBase`, the Vault Application Framework will only find and resolve `MFIdentifier` instances created on your `Configuration` class.  If you are using `MFIdentifier` instances in other locations (e.g. directly on your `VaultApplication` class) then these should be moved into your `Configuration` class to continue to be resolved automatically.  Alternatively you can call `MFIdentifier.Resolve` at runtime to manually resolve the items.
{:.note}

### From Version 2.0 to Version 2.1

New VAF 2.1 applications can be created using the [M-Files Online Visual Studio template](https://marketplace.visualstudio.com/items?itemName=M-Files.MFilesVisualStudioExtensions).  Projects using the existing Vault Application Framework 2.0 template need to be manually upgraded to use the Vault Application Framework 2.1 runtime:

* Open the existing project in Visual Studio.
* Locate the `Solution Explorer` window, and find the VAF project within the solution.
* Expand the project's `References` node and **delete** the existing references to:
	* `MFiles.Crypto`
	* `MFiles.VAF`
	* `MFiles.VAF.Configuration`
	* `MFilesAPI`
* Right-click on the project name and select `Manage NuGet Packages...`
* Select the existing `M-Files.VAF` reference and click the `Update` button to upgrade to the latest published 2.1 version.

It is recommended to update your entry point class (typically `VaultApplication`) to [use the new base class]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/#inheriting-from-the-new-base-class).  This will require some changes to your code but is required to enable some of the new VAF 2.1 functionality.  A sample on [how to convert a VAF 2.0 application to VAF 2.1]({{ site.baseurl }}/Samples-And-Libraries/Samples/Vault-Application-Framework/Upgrading-VAF2.0-To-2.1/) is also available.
{:.note}

### From Version 1.0 to Version 2.0

New VAF 2.0 applications can be created using the [M-Files Online Visual Studio template](https://marketplace.visualstudio.com/items?itemName=M-Files.MFilesVisualStudioExtensions).  To upgrade an existing VAF 1.0 application to 2.0, the following steps need to be taken.

* Create a blank VAF 2.0 application from the updated template.
	* From the new application, locate the `MFiles.VAF.dll`, `MFiles.VAF.Configuration.dll` and `MFiles.Crypto.dll` files.
* Open the existing VAF 1.0 application in Visual Studio:
	* Update the references
		* Expand the `References` node in `Solution Explorer`.
		* Locate and delete the existing `MFiles.VAF.dll` reference.
		* Add a reference to `MFiles.VAF.dll`, `MFiles.VAF.Configuration.dll` and `MFiles.Crypto.dll` from the VAF 2.0 release.
		* [Use nuget to update](https://docs.microsoft.com/en-us/nuget/tools/package-manager-ui#updating-a-package) the `Newtonsoft.JSON` reference from `6.0.x` to `10.0.3`.
	* Resolve any namespace issues, for example:
		* `MFIdentifier` (and other [configuration attributes](/Frameworks/Vault-Application-Framework/Attributes/Configuration/)) have moved from `MFiles.VAF.Common` to `MFiles.VAF.Configuration`.

At this point the VAF application can be altered to support 2.0 features such as [licensing](../Licensing) and [integration into the M-Files 2018 Administration Configuration interface](../Configuration).
