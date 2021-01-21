---
layout: page
title: The Vault Application Framework in the M-Files Cloud
includeInSearch: true
breadcrumb: M-Files Cloud
---

This page refers to running Vault Application Framework applications within the M-Files Cloud infrastructure.  These notes may not be applicable when running code within other cloud infrastructures, such as those provided by our partners.
{:.note}

In order to maintain a high quality of service for customers within our Cloud infrastructure, any code (Vault Application Framework or VBScript) must first be validated by our Cloud Ops department before it can be run within the M-Files Cloud.  This applies to both premium and standard cloud offerings.  Please note that code validation incurs a charge depending upon the complexity of the code needing validation.  For more information please speak to our support team who can organise an estimate.

## Validation process

To request code validation, please open a support ticket via [support@m-files.com](mailto:support@m-files.com).  The support team will request details on the vault it is to be installed into and your code to be validated.

* **The time required for validation will depend _heavily_ on the complexity of the application**. If the application is large or complex then this may be worth discussing with the support team prior to initial development.
* **There will be some "lead time" on the validation** so ensure that this is noted within your project plans.  Try to reserve at least two weeks, but longer may be needed for complex applications, situations where validation takes a number of iterations, or during common vacation times.  If you have specific deployment deadlines then please let us know as early as possible so that we can allocate resources.
* **Validation is done "per version"**; if you make changes in the future then these may be subject to additional validation.
* **The validation team will require the source code to your VAF applications, including the source code of any libraries** .  Common libraries (e.g. Newtonsoft) can be referenced from nuget.  Libraries provided by a trusted entity (e.g. libraries signed by Microsoft or other reputable sources) may be accepted without source code.  If in doubt, please contact us prior to initiating the validation process.  We reserve the right to make minor changes to enable validation to pass.
* **The validation team will compile the code themselves**, and it is this compiled code which will be delivered to the cloud operations team to install.  Ensure that all solution files, project files, resources, imagery, libraries or other references are included in the supplied package.  Good practice is to take the package you are delivering onto another machine and attempt to compile it using just the files in the package.  If it does not compile for you there then it will not compile for us here.

## Rules of thumb

* Do not provide source code that includes credentials.  We will store your application inside our source control system (for quicker validation of changes), and our Quality Management procedures prohibit us from storing code that includes credentials.
* Be aware that code may run in a shared environment, so try and be as lightweight as possible.
* Ensure that you do not touch anything outside of the vault (e.g. filesystem, registry, etc.), as the host Windows machine can be switched out and your changes will be lost.
* Be careful when designing solutions that use external resources; connections to external network addresses are typically denied, and sending email could be a potential avenue for abuse.
* Process objects in a batched way ([GetPropertiesOfMultipleObjects](https://www.m-files.com/api/documentation/latest/MFilesAPI~VaultObjectPropertyOperations~GetPropertiesOfMultipleObjects.html), [CheckOutMultipleObjects](https://www.m-files.com/api/documentation/latest/MFilesAPI~VaultObjectOperations~CheckOutMultipleObjects.html), [CheckInMultipleObjects](https://www.m-files.com/api/documentation/latest/MFilesAPI~VaultObjectOperations~CheckInMultipleObjects.html), etc.), where possible, as this is vastly more efficient than processing individual items.
* If you need multiple properties on an object, consider retrieving [all the properties in one call](https://www.m-files.com/api/documentation/latest/MFilesAPI~VaultObjectPropertyOperations~GetProperties.html) rather than one-by-one, as this is vastly more efficient.
* Do not perform operations that have a significant overhead in a frequently-called background operation.
* If working with files, consider accessing the content via a byte array ([DownloadFileInBlocks](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectFileOperations.html)), rather than downloading and then re-reading the file. 

## Cloud checklist

This checklist is provided for initial guidance only and details the common items that will be checked by the validation process.  Adherence to this checklist does not ensure validation will be successful, but should reduce the time (and potential iterations) required.
{:.note}

If a vault application does not comply with the validation checklist then we will - where feasible - provide guidance on how to modify the application so that it will be compatible.  **It is your responsibility to implement these changes and to confirm that the application continues to work as expected.**

This checklist is a living document and is periodically updated with feedback from our Cloud Operations and Product Development teams.

The validation team will check a number of items in the source code, including: 

<div class="checklist" markdown="1">

1. The application **must not attempt to modify any Windows-level settings**.
1. The application **must not install any Windows applications or reboot the server**.
1. The application **must not excessively use server resources**, even in dedicated environments.
	1. Note that many cloud implementations use shared environments, so any intensive operation might be cause for concern.
1. The application **must not access the file system**, aside from utilizing short-lived temporary files.  Treat the filesystem as transient as changes will be lost as the host machine is upgraded/migrated.
	1. The application **should not access the registry**.
	1. Use temporary folders for storing temporary files.
	1. **Temporary files, handles, and other resources must be properly disposed of**.
	1. File operations (upload/download) using the M-Files API are typically restricted.
1. The application **must not attempt to access or modify any server-level settings in M-Files** (login accounts, scheduled jobs, etc.).
1. The application **must not connect to arbitrary internet addresses.  Connections to specific addresses may be allowed**. *Note that connections may be allowed where the web address is [only configurable by the M-Files Cloud Ops teams]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/Security/#restricting-who-can-change-configuration-elements) - please contact support for more details*.
1. If the application must send emails directly then it **must use the customer's own mail servers** for doing so.
1. The application **must not attempt to establish separate connections to the vault**.
1. The application **must not attempt to alter anything outside of the vault during the initialization routines**.
1. The application **must not run input as code**.
1. **Do not log errors to the Windows event log**.
1. Your application must be [Multi-Server Mode-compatible]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/) to run in the New Cloud, and is **highly recommended** for new M-Files Vault Application Development in general.  *After a short transition period this will become a mandatory requirement for all applications that are to be installed in cloud.*



</div>
