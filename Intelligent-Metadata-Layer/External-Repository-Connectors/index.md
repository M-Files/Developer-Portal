---
layout: page
title: External Repository Connectors
includeInSearch: true
---

External Repository Connectors allow content stored within other repositories to be shown within the M-Files interface.  This functionality is available on M-Files Desktop, M-Files Web, and our mobile applications.  Users can use the full-text search (or navigate a folder structure) to find this `Unmanaged` content without leaving M-Files.

Users can choose to `Promote` this unmanaged content to become `Managed`.  By becoming `Managed`, the object becomes a first-class citizen within the M-Files system.  Managed objects can have metadata (such as a class), appear within dynamic views, and can even participate in workflows.  All the time their respective file data continues to reside on the source system.

Developers build connections to their own data sources by [building their own external repository connectors]({{ site.baseurl }}/Intelligent-Metadata-Layer/External-Repository-Connectors/).

## Locating External Repository Connectors

External Repository Connectors built by M-Files or one of our Certified Application Partners can be found on the [M-Files Solution Catalog](https://catalog.m-files.com/product-category/iml-connectors-to-external-repositories/).
{:.note.store}

## Installing and configuring External Repository Connectors

External Repository Connectors are installed and configured in an identical way to [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) applications; by using the M-Files Admin tool.  The online user guide [details how to install an External Repository Connector](https://www.m-files.com/user-guide/latest/eng/adding_a_connector.html).

External Repository Connectors may or may not require an additional licence to run.  Licences are installed using the M-Files Admin tool, in the same `Applications` dialog used to install the service itself.
{:.note}

Once installed, the M-Files Admin tool can be used to then configure the External Repository Connector.  Whilst the `Service-specific` configuration process may differ for each individual component, our online user guide [details how to configure External Repository Connectors](https://www.m-files.com/user-guide/latest/eng/configuring_a_connector.html).

## Custom External Repository Connectors

M-Files is proactively supporting partners looking to build their own External Repository Connectors.  External Repository Connectors can be [created using the Visual Studio template](Visual-Studio).

External Repository Connectors built by [Certified Application Partners](https://www.m-files.com/en/cap) can be published into the [M-Files Solution Catalog](https://catalog.m-files.com/product-category/iml-connectors-to-external-repositories/).
{:.note}