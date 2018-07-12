---
layout: page
title: Vault Application Framework Samples
includeInSearch: true
breadcrumb: VAF
---

Please note that these samples and libraries are provided "as-is" and with no warranty, explicit or otherwise. You should ensure that the functionality of these libraries meet your requirements, and thoroughly test them, prior to using in any production scenarios.  The items linked below are designed as teaching tools and may not be fully complete.
{:.note.warning}

M-Files has published a number of public samples within our [MFilesSamplesAndLibraries GitHub repository](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples#readme), which focus on achieving specific tasks using our public APIs or Frameworks.

## Introductory

The [Visual Studio Template page]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/) contains a walkthrough of creating your first VAF application.

## Sample applications

 Title | Source | Details
--- | --- | ---
Event Tracing | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/EventTracing#readme) | Hooks into various Vault Application Framework lifecycle events and vault events and logs when they occur into the Windows Event Log.  Can be used to identify which vault events occur in various situations.
Simple Configuration (VAF 2.0) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/VAF/SimpleConfiguration) | Implements a simple VAF 2.0 configuration object which can be altered using the M-Files admin software.  This implementation contains a fairly basic implementation to show the plumbing required to get the configuration up and running.{:.samples .vaf}
Complex Configuration (VAF 2.0) | [GitHub](https://github.com/M-Files/MFilesSamplesAndLibraries/tree/master/Samples/VAF/ComplexConfiguration) | Implements a VAF 2.0 configuration object showing a variety of features that are supported, including custom dashboards, server-side validation, customising the configuration layout (e.g. using labels and help text), etc.
{:.samples .vaf}
