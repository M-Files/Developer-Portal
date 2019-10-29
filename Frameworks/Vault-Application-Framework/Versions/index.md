---
layout: page
title: Versions
includeInSearch: true
---

## Feature Compatibility Matrix

Feature | [Version 1.0](#version-10) | [Version 2.0](#version-20) | [Version 2.1](#version-21)
--- | ---
[Automatic State Transitions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#automatic-state-transitions) | Yes | Yes | Yes
[Background Operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/) | Yes | Yes | Yes
[Configuration](../Configuration) | Yes[*](#name-value-storage-configuration) | Yes[*](#configuration-compatibility) | Yes[*](#configuration-compatibility)
[Event Handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/) | Yes | Yes | Yes
[File helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#mffilehelper) | - | Yes | Yes
[Licensing](../Licensing) | - | Yes | Yes
[ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#objverex) | Yes | Yes | Yes
[Property Calculation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/#property-calculation) | Yes | Yes | Yes
[Property Validation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/#property-validation) | Yes | Yes | Yes
[Search helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/#introducing-mfsearchbuilder) | Yes | Yes | Yes
[System helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#sysutils) | Yes | Yes | Yes
[Url helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#urlhelper) | - | Yes | Yes
[Vault Extension Methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Vault-Extension-Methods/) | Yes | Yes | Yes
Workflow [Pre-]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#state-pre-conditions) and [Post-]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#state-post-conditions)Conditions | Yes | Yes | Yes
[Workflow State Actions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#workflow-state-actions) | Yes | Yes | Yes
--- | ---

## Version 2.1

Alongside numerous internal bugfixes and performance work, this release brings three new major features:

* [Buttons within dashboards](../Configuration/Custom-Dashboards/#using-commands-within-dashboards)

* [Ability to define security constraints in configuration](../Attributes/Configuration/Security)

* The Vault Application Framework is now [published to NuGet](https://www.nuget.org/packages/MFiles.VAF).

Version 2.1 of the Vault Application Framework is compatible with M-Files 19.1 upwards.  To target earlier versions of M-Files, please use an earlier version of the Vault Application Framework.
{:.note.warning}

## Version 2.0

Alongside numerous internal bugfixes and performance work, this release brings two new major features:

* [Licensing](../Licensing)

* [Compatibility with the M-Files 2018 Administration Configuration interface](../Configuration)

Version 2.0 of the Vault Application Framework is compatible with M-Files 2015.3 upwards.  Please see the [note below](#configuration-compatibility) regarding configuration compatibility with M-Files 2015.3.
{:.note.warning}

### Configuration compatibility

Version 2.0 of the Vault Application Framework introduces a new pattern for exposing [application-specific configuration into the M-Files 2018 Admin interface](../Configuration).  As M-Files 2015.3 (and earlier) do not contain this section within the M-Files Admin interface, it is recommended that the [earlier configuration approach](#name-value-storage-configuration) (which continues to work in Version 2.0) is used for compatibility with M-Files 2015.3 systems.

## Version 1.0

Version 1.0 of the Vault Application Framework was released in early 2016.  This release included a wide variety of functionality, including:

* [Attribute-based]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/) automated installation of scripts into the M-Files vault, including [workflow state actions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/), [property calculations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/), [event handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/) and more.
* [Background operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/)
* [Helper objects]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/) to aid working with the M-Files vault and Microsoft Windows environment.
* [Search helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/)

M-Files have published to partners a [Visual Studio 2015/2017 template for use when creating VAF 1.0 applications]({{ site.baseurl}}/Frameworks/Vault-Application-Framework/Visual-Studio/VAF1.0/).
{:.note}

### Name-Value Storage Configuration

The initial release of the framework supported [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfconfiguration) that were used to mark up configuration objects used by each application.  These configuration objects were serialised into Name-Value storage, and the [Name-Value Storage Manager](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/0A8D789B-4E2B-4649-B1A1-AF0755B0C444/latest) could be used to alter them at runtime.

The 2.0 release of the framework introduced another approach which integrates with the new configuration administration interface in M-Files 2018.  It is recommended that applications that target M-Files 2018 and upwards migrate to the new version.

M-Files have published to partners a [Visual Studio 2015/2017 template for use when creating VAF 1.0 applications]({{ site.baseurl}}/Frameworks/Vault-Application-Framework/Visual-Studio/VAF2.0/).
{:.note}

## Upgrading versions

When you upgrade the Vault Application Framework you may need to make some small changes due to changes in class namespaces or method signatures.
{:.note.warning}

### From Version 2.0 to Version 2.1

New VAF 2.0 applications can be created using the [M-Files Online Visual Studio template](https://partners.cloudvault.m-files.com/Default.aspx?#CE7643CB-C9BB-4536-8187-707DB78EAF2A/object/D93538F9-B429-44DE-9840-553A67964438/latest).  Projects using the existing Vault Application Framework 2.0 template need to be manually upgraded to use the Vault Application Framework 2.1 runtime:

* Open the existing project in Visual Studio.
* Locate the `Solution Explorer` window, and find the VAF project within the solution.
* Expand the project's `References` node and **delete** the existing references to:
	* `MFiles.Crypto`
	* `MFiles.VAF`
	* `MFiles.VAF.Configuration`
	* `MFilesAPI`
* Right-click on the project name and select `Manage NuGet Packages...`
* Select the existing `M-Files.VAF` reference and click the `Update` button to upgrade to the latest published version.

You may choose to optionally update your entry point class (typically `VaultApplication`) to [use the new base class]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/#inheriting-from-the-new-base-class).  This will require some changes to your code but is required to enable some of the new VAF 2.1 functionality.

### From Version 1.0 to Version 2.0

New VAF 2.0 applications can be created using the [M-Files Online Visual Studio template](https://partners.cloudvault.m-files.com/Default.aspx?#CE7643CB-C9BB-4536-8187-707DB78EAF2A/object/D93538F9-B429-44DE-9840-553A67964438/latest).  To upgrade an existing VAF 1.0 application to 2.0, the following steps need to be taken.

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
