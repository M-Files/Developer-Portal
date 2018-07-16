---
layout: page
title: Intelligent Metadata Layer
includeInSearch: true
breadcrumb: IML
---

The Intelligent Metadata Layer, first made available with M-Files 2018, consists of two broad sets of technologies: [External Repository Connectors]({{ site.baseurl }}/Intelligent-Metadata-Layer/External-Repository-Connectors) and [Intelligence Services]({{ site.baseurl }}/Intelligent-Metadata-Layer/Intelligence-Services).  Custom Intelligent Metadata Layer components are written using .NET, can be developed by partners, and can be run by M-Files customers with the Intelligent Metadata Layer Core module.  Each custom component can, additionally, require its own licence to function.

## External Repository Connectors

External Repository Connectors allow content stored within other repositories to be shown within the M-Files interface.  This functionality is available on M-Files Desktop, M-Files Web, and our mobile applications.  Users can use the full-text search (or navigate a folder structure) to find this `Unmanaged` content without leaving M-Files.

Users can choose to `Promote` this unmanaged content to become `Managed`.  By becoming `Managed`, the object becomes a first-class citizen within the M-Files system.  Managed objects can have metadata (such as a class), appear within dynamic views, and can even participate in workflows.  All the time their respective file data continues to reside on the source system.

Developers build connections to their own data sources by [building their own external repository connectors]({{ site.baseurl }}/Intelligent-Metadata-Layer/External-Repository-Connectors).

External Repository Connectors built by M-Files or one of our Certified Application Partners can be found on the [M-Files Solution Catalog](https://catalog.m-files.com/product-category/iml-connectors-to-external-repositories/).
{:.note.store}

## Intelligence Services

Intelligence Services analyse files being added to M-Files and can suggest values for items on the object's metadata card.  This functionality is available on M-Files Desktop, M-Files Web, and our mobile applications.  Developers provide their own suggestions by [building their own intelligence services]({{ site.baseurl }}/Intelligent-Metadata-Layer/Intelligence-Services) which utilising online services, AI techniques, or their own custom logic.

![Intelligence service processing](intelligence_services.png)

Intelligence Services built by M-Files or one of our Certified Application Partners can be found on the [M-Files Solution Catalog](https://catalog.m-files.com/product-category/intelligence-services/).
{:.note.store}