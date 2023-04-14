---
layout: page
title: The Vault Application Framework in the M-Files Cloud
includeInSearch: true
breadcrumb: M-Files Cloud
---

This page refers to running Vault Application Framework applications within the M-Files Cloud infrastructure.  These notes may not be applicable when running code within other cloud infrastructures, such as those provided by our partners.
{:.note}

## Available cloud architectures

M-Files Cloud offers two distinct architectures: New Cloud and Classic Cloud.  In addition: within each architecture a vault can be configured within an isolated/dedicated instance (e.g. one server/container per vault/customer), or within a shared instance (e.g. many vaults/customers on one server).

M-Files is actively migrating customers from Classic Cloud to New Cloud.  **Applications - including changes to existing applications - submitted for validation that are not multi-server-mode-compatible will be rejected**.
{:.note}

Feature | Shared M-Files Classic Cloud | Shared M-Files New Cloud | Dedicated M-Files Classic Cloud | Isolated M-Files New Cloud
--- | --- | ---
Natively implemented as [M-Files Multi-Server Mode](../Multi-Server-Mode) | No | Yes | No | Yes
Can execute [signed applications](#code-signing) | Yes | Yes | Yes | Yes
Custom code requires [validation](#code-validation) to run | Yes | Yes | Yes | No

## Code signing

Code signing will be available in 2022.
{:.note.warning}

Applications which are signed can be installed on shared M-Files instances without validation.  First-party applications such as the M-Files Compliance Kit are provided as signed packages.  Custom code can be signed by submitting it for [validation](#code-validation).

## Code validation

In order to maintain a high quality of service for customers within our Cloud infrastructure, code (vault applications and VBScripts) may need to be validated by M-Files before they can be run within [some architectures of M-Files Cloud](#available-cloud-architectures).  It is important to note that the validation process focuses primarily on security concerns and does not provide a guarantee that the application will function as designed or expected.

* **Applications must be multi-server-mode-compatible**.  Any new applications submitted for validation must be compatible with [M-Files Multi-Server-Mode]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/).  Incompatible applications will not pass validation.
* **The time required for validation will depend _heavily_ on the complexity of the application**. If the application is large or complex then this may be worth discussing with the support team prior to initial development.
* **There will be some "lead time" on the validation** so ensure that this is noted within your project plans.  Try to reserve at least two weeks, but longer may be needed for complex applications, situations where validation takes a number of iterations, or during common vacation times.  If you have specific deployment deadlines then please let us know as early as possible so that we can allocate resources.
* **Validation is done "per version"**; if you make changes in the future then these may be subject to additional validation.
* **The validation team will require the source code to your VAF applications, including the source code of any libraries** .  Common libraries (e.g. Newtonsoft) can be referenced from nuget.  Libraries provided by a trusted entity (e.g. libraries signed by Microsoft or other reputable sources) may be accepted without source code.  If in doubt, please contact us prior to initiating the validation process.  We reserve the right to make minor changes to enable validation to pass.
* **Source code will be stored in our version control systems**.  You may be asked to authorize this to comply with our internal security requirements.  Ensure that your source code does not include any credentials.
* **The validation team will compile the code themselves**, and it is this compiled code which will be installed to the server.  Ensure that all solution files, project files, resources, imagery, libraries or other references are included in the supplied package.  Good practice is to take the package you are delivering onto another machine and attempt to compile it using just the files in the package.  If it does not compile for you there then it will not compile for us here.
* **Unless specified, the application will be installed into the vault as soon as possible after validation**.  This will require the vault be restarted, which may result in a small time when the vault is unavailable.  To request a specific time when this installation occurs, please liaise with the validation team.  Note that installations are typically only undertaken during the working hours of the validation team assigned.

Once an application has passed validation, a [signed version](#code-signing) of the code will be provided to the party who submitted the code.  This signed application can then be installed into any vault within the M-Files Cloud.  Third parties creating reusable applications that can be run in multiple vaults may consider validating their code package in order to receive a signed version that can easily be installed by clients into any vault.
{:.note}

### Validation process

To request code validation, partners should open an Implementation Support Request using the [Support Portal](https://m-files.force.com/s/).  Customers without access to the Support Portal should email [support@m-files.com](mailto:support@m-files.com).  Ensure that the Implementation Support Request contains a summary of the application you wish to be validated.  If submitting an update to an already-validated application then please include a summary of changes.  A member of the validation team will contact you and guide you through the process, including providing details on how to upload the application source code.

### Rules of thumb

* Do not provide source code that includes credentials.  We will store your application inside our source control system (for quicker validation of changes), and our Quality Management procedures prohibit us from storing code that includes credentials.
* Be aware that code may run in a shared environment, so try and be as lightweight as possible.
* Ensure that you do not touch anything outside of the vault (e.g. filesystem, registry, etc.), as the host Windows machine can be switched out and your changes will be lost.
* Be careful when designing solutions that use external resources; connections to external network addresses are typically denied, and sending email could be a potential avenue for abuse.
* Process objects in a batched way ([GetPropertiesOfMultipleObjects](https://www.m-files.com/api/documentation/MFilesAPI~VaultObjectPropertyOperations~GetPropertiesOfMultipleObjects.html), [CheckOutMultipleObjects](https://www.m-files.com/api/documentation/MFilesAPI~VaultObjectOperations~CheckOutMultipleObjects.html), [CheckInMultipleObjects](https://www.m-files.com/api/documentation/MFilesAPI~VaultObjectOperations~CheckInMultipleObjects.html), etc.), where possible, as this is vastly more efficient than processing individual items.
* If you need multiple properties on an object, consider retrieving [all the properties in one call](https://www.m-files.com/api/documentation/MFilesAPI~VaultObjectPropertyOperations~GetProperties.html) rather than one-by-one, as this is vastly more efficient.
* Do not perform operations that have a significant overhead in a frequently-called processes.
* If working with files, consider accessing the content via a byte array ([DownloadFileInBlocks](https://www.m-files.com/api/documentation/index.html#MFilesAPI~VaultObjectFileOperations.html)), rather than downloading and then re-reading the file. 

### Cloud checklist

This checklist is provided for initial guidance only and details the common items that will be checked by the validation process.  Adherence to this checklist does not ensure validation will be successful, but should reduce the time (and potential iterations) required.
{:.note}

If a vault application does not comply with the validation checklist then we will - where feasible - provide guidance on how to modify the application so that it will be compatible.  **It is your responsibility to implement these changes and to confirm that the application continues to work as expected.**

This checklist is a living document and is periodically updated with feedback from our Cloud Operations and Product Development teams.

The validation team will check a number of items in the source code, including: 

<div class="checklist" markdown="1">

1. Your application must be [Multi-Server-Mode-compatible]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Multi-Server-Mode/) to run in the New Cloud.  In order to ensure that vaults can be migrated to the newer infrastructure, **all newly-submitted vault applications must be multi-server-mode compatible**.
1. The application **must not attempt to modify any Windows-level settings**.
1. The application **must not install any Windows applications or reboot the server**.
1. The application **must not excessively use server resources**, even in dedicated environments.
	1. Note that many cloud implementations use shared environments, so any intensive operation might be cause for concern.
1. The application **must not access the file system**, aside from utilizing short-lived temporary files.  Treat the filesystem as transient as changes will be lost as the host machine is upgraded/migrated.
	1. The application **should not access the registry**.
	1. Use temporary folders for storing temporary files (use the [SysUtils]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helpers/SysUtils/#temporary-file-management) class to obtain temporary files and folders).
	1. **Temporary files, handles, and other resources must be properly disposed of**.
	1. File operations (upload/download) using the M-Files API are typically restricted.
1. The application **must not attempt to access or modify any server-level settings in M-Files** (login accounts, scheduled jobs, etc.).
1. The application **must not connect to arbitrary internet addresses.  Connections to specific addresses may be allowed**. *Note that connections may be allowed where the web address is [only configurable by the M-Files Cloud Ops teams]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/Security/#restricting-who-can-change-configuration-elements) - please contact support for more details*.
1. If the application must send emails directly then it **must use the customer's own mail servers** for doing so.
1. The application **must not attempt to establish separate connections to the vault**.
1. The application **must not attempt to alter anything outside of the vault during the initialization routines**.
1. The application **must not run input as code**.
1. **Do not log errors to the Windows event log**.
1. Ensure that you are using the latest public VAF release.  If you are using the VAF Extensions library then this should be the latest appropriate version.
1. Logging should be undertaken using the [M-Files Vault Application Logging Framework](/Frameworks/Logging/).

</div>

## Vault Application Framework Licensing

Note that Vault Application Framework licensing has limitations when running within the M-Files Cloud infrastructure.  This is because the license assigned to the M-Files server is generic with larger user limits than the specific license that the customer may have.

Specifically:

* You cannot restrict the VAF application license use by the customer's serial number.
* You cannot restrict the VAF application license use by the number of users.
* You **should** restrict the VAF license by the vault GUID.
