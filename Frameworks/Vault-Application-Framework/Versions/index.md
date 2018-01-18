---
layout: page
title: Versions
includeInSearch: true
---

## Feature Compatibility Matrix

Feature | [Version 1.0](#version-10) | [Version 2.0](#version-20)
--- | ---
[Automatic State Transitions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#automatic-state-transitions) | Yes | Yes
[Background Operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/) | Yes | Yes
[Configuration](../Configuration) | Yes[*](#name-value-storage-configuration) | Yes[*](#configuration-compatibility)
[Event Handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/) | Yes | Yes
[File helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#mffilehelper) | - | Yes
[Licensing](../Licensing) | - | Yes
[ObjVerEx]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#objverex) | Yes | Yes
[Property Calculation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/#property-calculation) | Yes | Yes
[Property Validation]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties/#property-validation) | Yes | Yes
[Search helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/#introducing-mfsearchbuilder) | Yes | Yes
[System helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#sysutils) | Yes | Yes
[Url helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/#urlhelper) | - | Yes
[Vault Extension Methods]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Vault-Extension-Methods/) | Yes | Yes
Workflow [Pre-]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#state-pre-conditions) and [Post-]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#state-post-conditions)Conditions | Yes | Yes
[Workflow State Actions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/#workflow-state-actions) | Yes | Yes
--- | ---

## Version 2.0 (pre-release) <a name="version-20" id="version-20"></a>

Version 2.0 of the Vault Application Framework is currently in limited pre-release.  Alongside numerous internal bugfixes and performance work, this release brings two new major features:

* [Licensing](../Licensing)

* [Compatibility with the M-Files 2018 Administration Configuration interface](../Configuration)

Version 2.0 of the Vault Application Framework is compatible with M-Files 2015.3 upwards.  Please see the [note below](#configuration-compatibility) regarding configuration compatibility with M-Files 2015.3.
{:.note.warning}

### Configuration compatibility

Version 2.0 of the Vault Application Framework introduces a new pattern for exposing [application-specific configuration into the M-Files 2018 Admin interface](../Configuration).  As M-Files 2015.3 (and earlier) do not contain this section within the M-Files Admin interface, it is recommended that the [earlier configuration approach](#name-value-storage-configuration) (which continues to work in Version 2.0) is used for compatibility with M-Files 2015.3 systems.

## Version 1.0

Version 1.0 of the Vault Application Framework was released in early 2016.  This release included a wide variety of functionality, including:

* [Attribute-based]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/) automated installation of scripts into the M-Files vault, including [workflow state actions]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Workflows/), [property calculations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Properties), [event handlers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Event-Handlers/) and more.
* [Background operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/)
* [Helper objects]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/) to aid working with the M-Files vault and Microsoft Windows environment.
* [Search helpers]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Searching/)

### Name-Value Storage Configuration

The initial release of the framework supported [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfconfiguration) that were used to mark up configuration objects used by each application.  These configuration objects were serialised into Name-Value storage, and the [Name-Value Storage Manager](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/0A8D789B-4E2B-4649-B1A1-AF0755B0C444/latest) could be used to alter them at runtime.

The 2.0 release of the framework introduced another approach which integrates with the new configuration administration interface in M-Files 2018.  It is recommended that applications that target M-Files 2018 and upwards migrate to the new version.

## Upgrading versions

### From Version 1.0 to Version 2.0

The current Visual Studio Template allows creation of VAF 1.0 applications.  An updated application will be made available which allows VAF 2.0 applications to be created.  Until that time, please follow the steps below to convert a VAF 1.0 application to VAF 2.0.
{:.note}

To upgrade a VAF 1.0 application to 2.0, the following steps need to be taken.

* Unzip the VAF 2.0 release into a new folder.  This zip contains a number of files.
* Open the existing VAF 1.0 application in Visual Studio:
	* Update the references
		* Expand the `References` node in `Solution Explorer`.
		* Locate and delete the existing `MFiles.VAF.dll` reference.
		* Add a reference to `MFiles.VAF.dll`, `MFiles.VAF.Configuration.dll` and `MFiles.Crypto.dll` from the VAF 2.0 release.
		* [Use nuget to update](https://docs.microsoft.com/en-us/nuget/tools/package-manager-ui#updating-a-package) the `Newtonsoft.JSON` reference from `6.0.x` to `10.0.3`.
	* Resolve any namespace issues, for example:
		* `MFIdentifier` (and other [configuration attributes](/Frameworks/Vault-Application-Framework/Attributes/Configuration/)) have moved from `MFiles.VAF.Common` to `MFiles.VAF.Configuration`.

At this point the VAF application can be altered to support 2.0 features such as [icensing](../Licensing) and [integration into the M-Files 2018 Administration Configuration interface](../Configuration).
