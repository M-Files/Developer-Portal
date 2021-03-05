---
layout: page
title: Application Definition
breadcrumb: appdef.xml
includeInSearch: true
---

The application definition/manifest file contains information that the M-Files server uses to register and execute your application, such as the unique identifier for the application (its GUID), publisher information, information on the platforms it targets (desktop or web), and the modules and dashboards that make up the application itself.

## Schema Versions

There are three versions of the XML that can be used, each using a different schema.  It is recommended that you target the latest version of the schema supported by the M-Files Server (and Clients) that you using.
{:.note.warning}

### V4 schema

The V4 schema is supported in M-Files 20.12 and higher, and adds compatibility with [fast browsing](../Fast-Browsing/).

### V3 schema

The V3 schema is supported in M-Files 11.2.4320.49 and higher, and adds additional elements that can be used to extend the functionality of the application.  These include:

* `master-application-guid`
* `platforms`
* `install-command`
* `uninstall-command`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef-client-v3.xsd">
	<guid>1B9552B3-C1C5-44b9-905F-D4ABAC5E7AE2</guid>	
	<name>My sample application</name>
	<version>0.1</version>
	<description>A demonstration application.</description>
	<publisher>M-Files Corporation</publisher>
	<copyright>(c) M-Files Corporation 2017</copyright>
	<required-mfiles-version>11.2.4320.49</required-mfiles-version>
	<platforms>
		<platform>Desktop</platform>
		<platform>Web</platform>
	</platforms>
	<modules>
		<module environment="shellui">
			<file>main.js</file>
		</module>
	</modules>
	<dashboards>
		<dashboard id="sampledashb">
			<content>sampledashboard.htm</content>
		</dashboard>
	</dashboards>
</application>
```

 Element | | Description
 --- | --- | ---
 `guid` | Required | The application Globally Unique IDentifier.  This must be unique for each application installed into the server.
 `name` | Required | The name of the application.  Shown within the M-Files Desktop client and M-Files Admin tool.
 `version` | Optional | The version number of the application.  Shown within the M-Files Admin tool.
 `description` | Optional | The description of the application.  Shown within the M-Files Admin tool.
 `publisher` | Optional | The name of the company that publishes the application.  Shown within the M-Files Admin tool.
 `copyright` | Optional | Information on which organisation/individual holds the copyright on the application.
 `required-mfiles-version` | Optional (_Recommended_) | The version number of the minimum version of M-Files Desktop required to run the application.
 `optional` | Optional | If false, the application is *mandatory*.  If the user chooses not to install the application then they cannot log into the vault.
 `enabled-by-default` | Optional |
 `master-application-guid` | Optional | Used to declare another application ([VAF]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) or [UIX]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/)) as the [parent of this application](Master-Application-Guid).
 `platforms` | Required | [Which platforms the application is designed to run on.  Currently supports Desktop and Web]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Platform-Targeting/).
 `modules` | Required (at least one) | A list of the modules that contain this application's logic.  More information on [declaring modules can be found below](#declaring-modules).
`dashboards` | Optional | A list of dashboards registered within the application.  The dashboard `id` is used to refer to the dashboard within code (e.g. to show it).  More information on [declaring dashboards can be found below](#declaring-dashboards).
`install-command` | Optional |
`uninstall-command` | Optional | 

### V1 schema

Below is an example of a 'V1' `appdef.xml` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:noNamespaceSchemaLocation="http://www.m-files.com/schemas/appdef.xsd">
	<guid>1B9552B3-C1C5-44b9-905F-D4ABAC5E7AE3</guid>	
	<name>My sample application</name>
	<version>0.1</version>
	<description>A demonstration application.</description>
	<publisher>M-Files Corporation</publisher>
	<copyright>(c) M-Files Corporation 2017</copyright>
	<required-mfiles-version>11.0.0000.00</required-mfiles-version>
	<modules>
		<module environment="shellui">
			<file>main.js</file>
		</module>
	</modules>
	<dashboards>
		<dashboard id="sampledashb">
			<content>sampledashboard.htm</content>
		</dashboard>
	</dashboards>
</application>
```

 Element | | Description
 --- | --- | ---
 `guid` | Required | The application Globally Unique IDentifier.  This must be unique for each application installed into the server.
 `name` | Required | The name of the application.  Shown within the M-Files Desktop client and M-Files Admin tool.
 `version` | Optional | The version number of the application.  Shown within the M-Files Admin tool.
 `description` | Optional | The description of the application.  Shown within the M-Files Admin tool.
 `publisher` | Optional | The name of the company that publishes the application.  Shown within the M-Files Admin tool.
 `copyright` | Optional | Information on which organisation/individual holds the copyright on the application.
 `required-mfiles-version` | Optional (_Recommended_) | The version number of the minimum version of M-Files Desktop required to run the application.
 `optional` | Optional | If false, the application is *mandatory*.  If the user chooses not to install the application then they cannot log into the vault.
 `enabled-by-default` | Optional |
 `modules` | Required (at least one) | A list of the modules that contain this application's logic.  More information on [declaring modules can be found below](#declaring-modules).
`dashboards` | Optional | A list of dashboards registered within the application.  The dashboard `id` is used to refer to the dashboard within code (e.g. to show it).  More information on [declaring dashboards can be found below](#declaring-dashboards).


This application definition file version should be used when targeting M-Files versions lower than 11.2.4320.49, as it does not support the new <a href="#v3-schema">V3 schema</a>.
{:.note}

## Declaring modules

Each application must contain one or more modules.  Each module is declared within the application definition, and the definition contains both the `environment` and the `file` which contains the module code.

This page focused on the declaration of modules.  For more information on using modules within a User Interface Extensibility Framework application, view <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/">the dedicated Modules page</a>.
{:.note}

The following declares a [ShellUI]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/#module-types) module and states that the source code for the module is within `mymodule.js`:

```xml
<modules>
	<module environment="shellui">
		<file>mymodule.js</file>
	</module>
</modules>
```

Each application may declare multiple modules.  For example, the following declares two modules: one `ShellUI` and one `VaultCore`:

```xml
<modules>
	<module environment="shellui">
		<file>shelluimodule.js</file>
	</module>
	<module environment="vaultcore">
		<file>vaultcoremodule.js</file>
	</module>
</modules>
```

## Declaring dashboards

Each application can contain zero or more dashboards.  Each dashboard is declared within the application definition and provided with a unique ID.  This ID is used to reference the dashboard when [showing or hiding it](#showing-and-hiding-dashboards).

This page focused on the declaration of dashboards.  For more information on using dashboards within a User Interface Extensibility Framework application, view <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/">the dedicated Dashboards page</a>.
{:.note}

The following example declares a single dashboard and assigns it an ID of `myDashboard`.  It also defines the dashboard content to come from a file named `mydashboard.html`:

```xml
<dashboards>
	<dashboard id="myDashboard">
		<content>myDashboard.html</content>
	</dashboard>
</dashboards>
```

Multiple dashboards can be declared within a single application, by repeating the `<dashboard>` element.  Each dashboard must have its own unique ID:

```xml
<dashboards>
	<dashboard id="myFirstDashboard">
		<content>myFirstDashboard.html</content>
	</dashboard>
	<dashboard id="mySecondDashboard">
		<content>mySecondDashboard.html</content>
	</dashboard>
</dashboards>
```
### Loading remote content (allowing trusted content)

By default, dashboards can work with local resources but cannot load content from remote addresses..  To trust content from a remote address, you must manually whitelist the address using a `trusted-content` element:

```xml
<dashboard id="myFirstDashboard">
	<content>myFirstDashboard.html</content>
	<trusted-content>http://www.mydomain.com</trusted-content>
</dashboard>
```

You can provide many domains in the same `<dashboard>`:

```xml
<dashboard id="myFirstDashboard">
	<content>myFirstDashboard.html</content>
	<trusted-content>http://www.mydomain.com</trusted-content>
	<trusted-content>https://ajax.googleapis.com</trusted-content>
</dashboard>
```

It is possible to whitelist an entire URI prefix scheme, although this would allow content to be run from any web resource.  It is best practice to constrain this list to as few addresses as possible:

```xml
<dashboard id="myFirstDashboard">
	<content>myFirstDashboard.html</content>
	<trusted-content>http:</trusted-content>
	<trusted-content>https:</trusted-content>
</dashboard>
```

Typical web development practices encourage the use of content delivery networks for static resources such as JavaScript libraries.  In context of User Interface Extensibility Framework applications it is often best to download the library and refer to it locally, so that the application continues to function even if a public internet connection is not available.
{:.note}

#### Allowing links to function within dashboards

Links to content are treated in the same way as remote content: they will not function unless they are whitelisted.  To whitelist [M-Files URLs]({{ site.baseurl }}/Built-In/URLs/), the following XML could be used:

```xml
<dashboard id="myFirstDashboard">
	<content>myFirstDashboard.html</content>
	<trusted-content>m-files:</trusted-content>
</dashboard>
```

## Tips and tricks

### File formatting

1. Ensure that the file is formatted as UTF-8.
2. Ensure that any [special characters are escaped](https://technet.microsoft.com/en-us/library/ms145315(v=sql.90).aspx).
3. The order of the elements is important; double-check the [schema information](#schema-versions) listed above.

### GUID formatting

Inside the `appdef.xml` file, GUIDs must be formatted without braces and with hyphens ([digit format](https://msdn.microsoft.com/en-us/library/97af8hh4(v=vs.110).aspx)).