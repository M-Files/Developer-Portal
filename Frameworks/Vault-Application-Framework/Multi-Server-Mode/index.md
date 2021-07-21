---
layout: page
title: The Vault Application Framework and M-Files Multi-Server Mode
includeInSearch: true
breadcrumb: Multi-Server Mode
requiredMFilesServerVersion: 20.5
---

The approach shown below is only compatible with version 2.3 (and higher) of the Vault Application Framework, where the target audience runs M-Files Online 20.5 or higher.
{:.note.warning}

M-Files Multi-Server Mode is an architectural implementation pattern available from M-Files 20.5 onwards.

Previous M-Files "High Availability" implementations used an active-passive arrangement for M-Files servers, with a load balancer in front of the servers and a Microsoft SQL Server configured as a High Availability Group as the vault database.  With this configuration the load balancer would react to the active server becoming unavailable and attach the vault to the passive vault, before then transferring users across to this secondary server.  A small downtime will be perceived by users whilst this failover occurs.

M-Files Multi-Server Mode instead allows multiple servers to concurrently have the M-Files vault attached, with the load balancer distributing users across these active servers.  If one server becomes unavailable then its users are automatically migrated to other servers; the perceived downtime is much lower as the vault is already active on the other servers, and only users on the unavailable server are affected.

This change in architecture impacts Vault Application Framework applications: **in order for your Vault Application Framework application to run on M-Files Multi-Server Mode, you must make some changes to the structure of the application**.

Applications that are compatible with Multi-Server Mode will also install and function correctly in single-server environments, provided they are running M-Files 20.5 or higher.  It is recommended that you use the approaches listed on this page for all new M-Files Developments.
{:.note}

## Concepts

* Installing an application on one server will automatically install it onto the other servers.

* Note that your vault application may be run concurrently on all servers.  If there are three M-Files servers in the multi-server configuration then there will be up to three instances of your application running.

* Where a user performs an action in one server (e.g. they create an object), that server will execute any reactive code such as event handlers or property calculations.

* Your application **should not attempt to maintain state in memory**; a property set on one server will not be available in the application running on another server.  You can, however, use Named Value Storage as a persistence mechanism.

* **Background operations must not be used in applications that support Multi-Server Mode**.  Instead, you must alter your code to use one of the [task queue approaches](#task-queues) instead.

* *If you are not using the Vault Application Framework Multi-Server Mode template (e.g. you are upgrading/converting an existing application)*, then your [`appdef.xml` must be manually updated](#appdefxml-changes).

### Task queues

Task queues should be used in place of background operations when targeting Multi-Server Mode.  This ensures that the operations are correctly processed when multiple M-Files servers may be connected to a vault.

Information on the various task queue types and how to use them is available on the [page dedicated to task queues](../Task-Queues).
{:.note}

There are three primary types of task queue:

* [Broadcast task queues](../Task-Queues/Broadcast) contain instructions that should be broadcast to all servers in the availability group.
* [Sequential task queues](../Task-Queues/Sequential) contain a list of instructions that should be executed on-by-one, starting at the first one added and working down to the latest one added.
* [Concurrent task queues](../Task-Queues/Concurrent) contain a list of instructions that can potentially be executed concurrently.  The order in which the server(s) execute the tasks is not guaranteed.

## Converting an existing Vault Application Framework project

If inheriting from `ConfigurableVaultApplicationBase`, the Vault Application Framework will only find and resolve `MFIdentifier` instances created on your `Configuration` class.  If you are using `MFIdentifier` instances in other locations (e.g. directly on your `VaultApplication` class) then these should be moved into your `Configuration` class to continue to be resolved automatically.  Alternatively you can call `MFIdentifier.Resolve` at runtime to manually resolve the items.
{:.note.warning}

### Minimum code changes

You will need to alter the code of any existing Vault Application Framework application to support Multi-Server M-Files implementations.  The required changes will depend on the exact structure and complexity of your application.  At a minimum you will need to:

* Update your VAF reference to target the [VAF 2.3](https://www.nuget.org/packages/MFiles.VAF),
* *Optional* Update your VAF Extensions library reference to target the [1.2 release branch](https://www.nuget.org/packages/MFiles.VAF.Extensions).
* [Update your appdef.xml](#appdefxml-changes) to mark compatibility,
* [Remove any in-memory state](#handling-of-in-memory-state),
* [Convert background operations to use task queues instead](#migration-of-background-processes-to-task-queues), and

### appdef.xml changes

* It must reference the v3 XSD (`http://www.m-files.com/schemas/appdef-server-v3.xsd`).
* It must have a `multi-server-compatible` element with a value of `true`.
* It must define an appropriate minimum M-Files version (`20.5` upwards).

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
  <required-mfiles-version>20.5.0.0</required-mfiles-version>
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

### Migration of background processes to task queues

The concept of a background operation is more awkward in situations where more than one M-Files server is involved.  As a Vault Application Framework background operation is simply a .NET `Task`, and vault actions performed by the background operation are typically run outside of a transaction, it is fairly easy for background operations to cause unexpected side-effects within the vault.

Details on the [types of task queues and how to migrate your code from background processes to task queues is available here](../Task-Queues/Recurring-Tasks).

### Handling of in-memory state

In general in-memory state (e.g. cached lists of content) should be avoided, as it's easy to have situations where the cache on one server has different data to the cache on another server.  However, there are some situations where this may be required.  This can be achieved in a number of ways, but the recommended best practice is the use of named value storage.

Details on the [handling in-memory state is available here](In-Memory-State).