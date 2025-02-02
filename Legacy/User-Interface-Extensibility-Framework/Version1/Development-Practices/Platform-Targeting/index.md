---
layout: page
title: Platform Targeting
breadcrumb: Platforms
legacy: true
latest_version: /Frameworks/User-Interface-Extensibility-Framework/Reference/
redirect_from: /Frameworks/User-Interface-Extensibility-Framework/Platform-Targeting/
---

The [V3 client application definition schema]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/#v3-schema) introduced the ability for applications to define the platforms in which they should execute.  Prior to V3 of the schema, applications only ever executed within the M-Files Desktop client.

The application must use the <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/#v3-schema">V3 schema</a> **(or later)** to be able to use platform targeting; using the V1 schema will result in an error.
{:.note}

## Available Platforms

There are currently two supported platforms:
* `Desktop` (i.e. the code should execute within the M-Files Desktop client), and
* `Web` (i.e. the code should be executed within the M-Files Classic Web).

The platform that each application supports is defined within the [application definition file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/), in the following ways:

The entire <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/">appdef.xml</a> file is shown, but only the `<platforms></platforms>` element changes in each sample; the rest is shown for completeness.
{:.note}

### Declaring compatibility with only the M-Files Desktop client

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

### Declaring compatibility with only M-Files Classic Web

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

### Declaring compatibility with both platforms

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

## Targeting M-Files Classic Web (aka M-Files Web Access, or MFWA)

Unlike User Extensibility Framework applications running on the M-Files Desktop client - which have full access to the [M-Files COM API model]({{ site.baseurl }}/APIs/COM-API/) (in [client mode]({{ site.baseurl }}/APIs/COM-API/#api-modes-client-vs-server)) - applications that run within M-Files Classic Web have additional constraints:

* [Asynchronous method calls]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Asynchronous-API-Programming/) are required (they are optional when targeting M-Files Desktop).
* Only a [subset of User Interface Extensibility Framework components is supported in M-Files Web](https://www.m-files.com/UI_Extensibility_Framework/index.html#UIExtSupportInMFilesWeb.html).  If a required UIX component is not available in M-Files Web then your application cannot run on the web.
* Only a [subset of the M-Files API is supported in M-Files Web](https://www.m-files.com/UI_Extensibility_Framework/index.html#ApiSupportInMFilesWeb.html).  If a required M-Files API component is not available in M-Files Web then your application may not be able to run.  Note, though, that [Vault Extension Methods]({{ site.baseurl }}/Built-In/VBScript/Vault-Extension-Methods/) can be executed, so some code may be able to be executed server-side and the results returned to the UIX application for display/processing.

## Checking the current platform

The current platform can be checked programmatically by inspecting `MFiles.CurrentApplicationPlatform`.

On M-Files Classic Web, `MFiles.CurrentApplicationPlatform` returns `2`.  On M-Files Desktop, `MFiles.CurrentApplicationPlatform` returns `1`.  In versions of M-Files Desktop less than 12.0.6658.0, the value is incorrectly returned as `undefined`.