---
layout: page
title:  Using other IDEs to build VAF applications
includeInSearch: true
breadcrumb: Other IDEs
prerelease: true
---

M-Files have [published to nuget](https://www.nuget.org/packages/MFiles.ProjectTemplates) templates for use with the [`dotnet new` CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new).  These templates can be used outside of Visual Studio to create VAF applications that are then maintained using IDEs such as Visual studio Code or JetBrains Rider.

M-Files currently provide a single template (`vaf-latest-empty`), but we may include more in the package in the future.

## Installing and managing the templates

Installing the templates only needs to be done once.
{:.note}

To install the templates, open a command line and use the [`dotnet new --install` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-install):

```text
dotnet new --install MFiles.ProjectTemplates
```

You should see a message indicating that the template(s) were installed.

### Uninstalling the templates

If you ever need to uninstall the templates, open a command line and use the [`dotnet new --uninstall` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-uninstall):

```text
dotnet new --uninstall MFiles.ProjectTemplates
```

### Updating the templates

To check for updates to all templates, open a command line and use the [`dotnet new --update-check` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-update):

```text
dotnet new --update-check
```

To apply any incoming changes to all templates, open a command line and use the [`dotnet new --update-apply` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-update):

```text
dotnet new --update-apply
```

When [creating a project from the template](#creating-projects-from-the-templates), the CLI may indicate whether an update to the template is available.
{:.note}

## Creating projects from the templates

This section deals with using the templates via the command line.  Some IDEs, such as JetBrains Rider, provide user interfaces to allow these templates to be more easily used.
{:.note}

Projects can be created from the templates using the [`dotnet new` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new):

1. Open a command prompt.
2. If using the templates for the first time, [install the templates](#installing-the-templates).
3. Navigate to the folder into which you would like to create your project.  Your folder name will be used for the project name, so ensure that it complies with standard .NET project naming rules (a good rule of thumb is to only use alphanumeric characters, and ensure that your project does not start with a number).
4. Execute `dotnet new vaf-latest-empty` to create the solution, project, and supporting files.

### Using Visual Studio Code

Once a [project is created](#creating-projects-from-the-templates), the folder can be opened using Visual Studio Code.  Visual Studio Code automatically understands the C# project format and should automatically provide IntelliSense for the referenced items.

### Using JetBrains Rider

JetBrains Rider contains deep integration into the `dotnet new` templating system.

Once the [templates have been installed](#installing-and-managing-the-templates), creating a new solution using JetBrains Rider should provide the option of "M-Files Vault Application 2.3" in the list on the left, under "Other".
