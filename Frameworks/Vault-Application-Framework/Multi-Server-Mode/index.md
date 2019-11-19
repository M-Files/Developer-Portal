---
layout: page
title: The Vault Application Framework and M-Files Multi-Server Mode
includeInSearch: true
breadcrumb: Multi-Server Mode
---

M-Files Multi-Server Mode is an architectural implementation pattern available from M-Files 20.2 onwards.

Previous M-Files "High Availability" implementations used an active-passive arrangement for M-Files, with a load balancer in front of the servers and a Microsoft SQL Server configured as a High Availability Group as the vault database.  With this configuration the system could react to the active server becoming unavailable and attach the vault to the passive vault, before then transferring users across to this secondary server.  A small downtime will be perceived whilst waiting for this failover to occur.

M-Files Multi-Server Mode instead allows multiple servers to concurrently have the M-Files vault attached, each able to serve users.  The load balancer can distribute users across these active servers.  If one server becomes unavailable then users are automatically migrated to other servers; the perceived downtime is much lower as the vault is already active on the other servers.

This change in architecture impacts Vault Application Framework applications: **in order for your Vault Application Framework application to run on M-Files Multi-Server Mode, you must make some changes to the structure of the application**.

## Concepts

* Note that your vault application will be run concurrently on all servers.  If there are three M-Files servers in the multi-server configuration then there will be three instances of your application running.

* Where a user performs an action in one server (e.g. they create an object), that server will execute any reactive code such as event handlers or property calculations.

* Your application **must not attempt to maintain state in memory**; a property set on one server will not be available in the application running on another server.  You can, however, use Named Value Storage as a persistence mechanism.

* **Background operations must not be used in applications that support Multi-Server Mode**.  Instead, you must alter your code to use one of the [task queue approaches](#task-queues) instead.

* *If you are not using the Vault Application Framework Multi-Server Mode template (e.g. you are upgrading/converting an existing application)*, then your [`appdef.xml` must be updated](#appdefxml-changes).

### Task queues

#### Sequential task queues

#### Batch task queues

#### Broadcast task queues

## Converting an existing Vault Application Framework project

### Required code changes

You will need to alter the code of any existing Vault Application Framework application to support Multi-Server M-Files implementations.  The required changes will depend on the exact structure and complexity of your application.  At a minimum you will need to [update your appdef.xml](#appdefxml-changes) to mark compatibility, but you may also need to 

### appdef.xml changes

* It must reference the v3 XSD (`http://www.m-files.com/schemas/appdef-server-v3.xsd`).
* It must have a `multi-server-compatible` element with a value of `true`.
* It must define an appropriate minimum M-Files version (`19.9.8227.13` upwards).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<application
			type="server-application"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-server-v3.xsd">
  <guid>1906780f-f8e5-4c37-848a-af13b4e6a9ba</guid>
  <name>MFiles.MSM.VaultApplicationExample</name>
  <description></description>
  <publisher></publisher>
  <version>0.1</version>
  <copyright></copyright>
  <required-mfiles-version>19.9.8227.13</required-mfiles-version>
  <multi-server-compatible>true</multi-server-compatible>
  <extension-objects>
    <extension-object>
      <name>MFiles.MSM.VaultApplicationExample</name>
      <assembly>MFiles.MSM.VaultApplicationExample.dll</assembly>
      <class>MFiles.MSM.VaultApplicationExample.VaultApplication</class>
      <installation-method>Install</installation-method>
      <uninstallation-method>Uninstall</uninstallation-method>
      <initialization-method>Initialize</initialization-method>
      <uninitialization-method>Uninitialize</uninitialization-method>
      <start-operations-method>StartOperations</start-operations-method>
    </extension-object>
  </extension-objects>
</application>
```

### Removal of in-memory state

### Migration of background processes to task queues
