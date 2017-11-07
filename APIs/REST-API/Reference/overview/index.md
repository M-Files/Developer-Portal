---
layout: mfws
title: Overview
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/overview.html"
---

# Overview
{:#chpt:overview}

M-Files Web Service consists of several [resources]({{ site.baseurl }}/APIs/REST-API/Reference/resources) and the [types]({{ site.baseurl }}/APIs/REST-API/Reference/structs) that represent these. Most of the resource belong to one of the five major resource hierarchies. These hierarchies are listed below.

The **[objects hierarchy]({{ site.baseurl }}/APIs/REST-API/Reference/objects)** contains the resources used to read and edit individual objects. This includes searching objects, reading and editing metadata, downloading files and creating new objects. 

The **[views hierarchy]({{ site.baseurl }}/APIs/REST-API/Reference/views/path)** contains the resources representing the document vault view hierarchy. These resources enable applications to navigate through M-Files views. These resources are read-only as M-Files Web Service doesn't currently support creating or modifying views.

The **[vault structure hierarchy]({{ site.baseurl }}/APIs/REST-API/Reference/structure)** provides information on the metadata structure of the vault. The hierarchy contains resources for object types, property definitions and workflows for example. Similar to the views hierarchy, the structure hierarchy doesn't currently support modification either.

The **[server hierarchy]({{ site.baseurl }}/APIs/REST-API/Reference/server)** contains the resources representing the server-state. The resources in this hierarchy are also accessible without a document vault level authentication. Some, such as [/server/authenticationtokens]({{ site.baseurl }}/APIs/REST-API/Reference/resources/server/authenticationtokens), can even be accessed without any authentication at all.

The **[session hierarchy]({{ site.baseurl }}/APIs/REST-API/Reference/session)** contains information on the current session. This hierarchy is required for Cookie-based authentication as it provides the [/session]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session) and [/session/vault]({{ site.baseurl }}/APIs/REST-API/Reference/resources/session/vault) resources.


