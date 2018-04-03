---
layout: page
title: Getting started developing for M-Files
includeInSearch: true
breadcrumb: Getting started
redirect_from: /Concepts/
---

This section introduces the concepts and terminology used within the M-Files software, with particular focus upon the terminology and techniques required to interact with an M-Files vault.

Information held within M-Files is held within one or more `Vaults`.  On the M-Files Server, each vault consists of a database and, optionally, separate file storage.  Each vault has a [defined structure](Vault-Structure) - implemented as part of the initial configuration - that controls what types of information can be stored.  By default, M-Files can manage `Documents`, but the system will typically be customised to [manage many types of object](Objects-And-Versions).

Most organizations simply have one vault which contains everything that they need.  Sometimes separate vaults are created to segregate content for performance (e.g. a content archive) or security reasons (e.g. a separate vault for HR information).

In order to work with information within an M-Files vault, you will typically need to obtain a [Vault](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~Vault.html) reference.  When using [VBScript]({{ site.baseurl }}/Built-In/VBScript/) this is often already available as a built-in variable named `Vault`.  When using the [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) this will be provided as part of the `Environment` method parameter, or the `VaultApplicationBase.PermanentVault` reference can be used.  When using the [COM API]({{ site.baseurl }}/APIs/COM-API/), a reference will be obtained as part of the [connection process](/APIs/COM-API/Connecting-And-Authenticating/).  A vault reference is not required when using the [REST API]({{ site.baseurl }}/APIs/REST-API/).
{:.note.api}

## Tips and tricks

### Aliases

When developing applications against M-Files, most API calls require vault structural elements to be referenced by their internal ID.  Aside from built-in properties, these IDs will typically change between vaults, and the ID cannot be defined or altered by code.  To work around this, it is recommended that aliases are assigned to vault structural elements, and used to find the ID of the item at runtime.

More details on aliases are available on their [dedicated page]({{ site.baseurl }}/Getting-Started/Aliases/).

### Internal and External IDs

When using the M-Files API, objects must be referenced by their (unique) internal M-Files object ID.  In certain situations, the ID displayed on an object's metadata card may not be the ID that must be used for API calls.  More details on internal and external IDs are available on the [dedicated page]({{ site.baseurl }}/Getting-Started/InternalAndExternalIDs/).

### Script execution order

The [exection order of scripts is documented in the user guide](https://www.m-files.com/user-guide/latest/eng/execution_order_of_scripts.html).
