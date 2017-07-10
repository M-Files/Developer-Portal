---
layout: page
title: Application Structure
breadcrumb: Structure
---

User Interface Extensibility Framework applications consist of a number of files:

## Application manifest file (appdef.xml)

The application definition/manifest file contains information that the M-Files server uses to register and execute your application, such as the unique identifier for the application (its GUID), publisher information, information on the platforms it targets (desktop or web), and the modules and dashboards that make up the application itself.

### Schema Versions

<p class="note warning">There are two versions of the XML that can be used, each using a different schema.  It is recommended that you use the <a href="#v3-schema">'V3' schema</a> for applications that target M-Files 2015.2 and higher.</p>

#### V3 schema

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
 `master-application-guid` | Optional | 
 `platforms` | Required | Which platforms the application is designed to run on.  Currently supports Desktop and Web.
 `modules` | Required (at least one) | A list of the modules that contain this application's logic.  There is more [information on modules on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/).
`dashboards` | Optional | A list of dashboards registered within the application.  The dashboard `id` is used to refer to the dashboard within code (e.g. to show it).  There is more [information on dashboards on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/).
`install-command` | Optional |
`uninstall-command` | Optional | 

#### V1 schema

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
 `modules` | Required (at least one) | A list of the modules that contain this application's logic.  There is more [information on modules on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/).
`dashboards` | Optional | A list of dashboards registered within the application.  The dashboard `id` is used to refer to the dashboard within code (e.g. to show it).  There is more [information on dashboards on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/).


<p class="note">This application definition file version should be used when targeting M-Files versions lower than 11.2.4320.49, as it does not support the new <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/#v3-schema">V3 schema</a>.</p>

## Modules (.js files)

These modules contain the application code.  There are three types of module: `VaultCore` modules, `VaultUI` modules, and `ShellUI` modules.  Most modules are `ShellUI` modules.  

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Modules/">More information on modules is available in the dedicated page.</a></p>

## Dashboards (.js, .css, .html files)

Dashboards are user interfaces that are shown to the user, either when the module starts or on an associated event (e.g. an object of a specific type is selected).

<p class="note"><a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Dashboards/">More information on dashboards file is available in the dedicated page.</a></p>

Each application can contain one or more dashboards.  Each dashboard is declared within the application definition and provided with a unique ID.  This ID is used to reference the dashboard when [showing or hiding it](#showing-and-hiding-dashboards).

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

<p class="note">Typical web development practices encourage the use of content delivery networks for static resources such as JavaScript libraries.  In context of User Interface Extensibility Framework applications it is often best to download the library and refer to it locally, so that the application continues to function even if a public internet connection is not available.</p>

#### Allowing links to function within dashboards

Links to content are treated in the same way as remote content: they will not function unless they are whitelisted.  To whitelist [M-Files URLs]({{ site.baseurl }}/Built-In/URLs/), the following XML could be used:

```xml
<dashboard id="myFirstDashboard">
	<content>myFirstDashboard.html</content>
	<trusted-content>m-files:</trusted-content>
</dashboard>
```

