---
layout: page
title: Vault Application Framework Samples
includeInSearch: true
breadcrumb: VAF
---

<p class="note warning">Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.</p>

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples#readme), which focus on achieving specific tasks using our public APIs or Frameworks.

## Introductory

The [Visual Studio Template page]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio-Template/) contains a walkthrough of creating your first VAF application.

## Sample applications

 Title | Source | Details
--- | --- | ---
Event Tracing | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/EventTracing#readme) | Hooks into various Vault Application Framework lifecycle events and vault events and logs when they occur into the Windows Event Log.  Can be used to identify which vault events occur in various situations.
[Chain Workflows]({{ site.baseurl }}/Samples-And-Libraries/Samples/Processes/Chaining-Workflows/) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/ChainWorkflows#readme) | An example (available as both a [Vault Application Framework]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/) application, and a [VBScript]({{ site.baseurl }}/Built-In/VBScript/) implementation) that shows how to move an object from one workflow to another once it reaches a specific state in a workflow.
{:.samples .vaf}
