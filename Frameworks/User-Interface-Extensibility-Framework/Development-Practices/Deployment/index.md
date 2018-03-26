---
layout: page
title: Deploying User Interface Extensibility Framework Applications
breadcrumb: Deployment
includeInSearch: true
---

To deploy the application:

1. Zip the contents of the local development folder (e.g. `MyApp.zip`).
2. Open the M-Files Admin tool and connect to your M-Files server.
3. Right-click on the vault to install the application to.
4. Select `Applications`.
5. Click `Install...` and select the zip file.
6. Click `Open` and the application should be listed.

If you are testing the deployed application from your local machine then ensure that the local development folder is removed prior to deployment, otherwise it will override the deployed code.
{:.note.warning}

## Tips and tricks

### Deploying a UIX application alongside a VAF application

[User Interface eXtensibility]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/) applications are sometimes deployed alongside [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) applications.  A good example is where a client-side application depends upon a server-side application for some functionality.

An example of distributing applications like this is shown in the [distributing child applications]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Distributing-Child-Applications/) page.

### .mfappx

The zipped file can be renamed to have a `.mfappx` extension (e.g. `MyApp.mfappx`) if you wish to differentiate it from other zip files.  The functionality does not change.

## Pre-approval

This screen can be avoided - and the application forcibly installed - by [pre-approving it using registry keys]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Pre-Approval/).