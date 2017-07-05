---
layout: page
title: The Application Definition File in the User Interface Extensibility Framework
breadcrumb: appdef.xml
---

The application definition/manifest file contains information that the M-Files server uses to register and execute your application.

## Application Definition Schema Versions

<p class="note warning">There are two versions of the XML that can be used, each using a different schema.  It is recommended that you use the <a href="#v3-schema">'V3' schema</a> for applications that target M-Files 2015.2 and higher.</p>

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
 `master-application-guid` | Optional | 
 `platforms` | Required | Which platforms the application is designed to run on.  Currently supports Desktop and Web.
 `modules` | Required (at least one) | A list of the modules that contain this application's logic.  There is more [information on modules on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/Modules/).
`dashboards` | Optional | A list of dashboards registered within the application.  The dashboard `id` is used to refer to the dashboard within code (e.g. to show it).  There is more [information on dashboards on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/Dashboards/).
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
 `modules` | Required (at least one) | A list of the modules that contain this application's logic.  There is more [information on modules on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/Modules/).
`dashboards` | Optional | A list of dashboards registered within the application.  The dashboard `id` is used to refer to the dashboard within code (e.g. to show it).  There is more [information on dashboards on their dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/Dashboards/).


<p class="note">This application definition file version should be used when targeting M-Files versions lower than 11.2.4320.49, as it does not support the new <a href="{{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Structure/AppDef/#v3-schema">V3 schema</a>.</p>