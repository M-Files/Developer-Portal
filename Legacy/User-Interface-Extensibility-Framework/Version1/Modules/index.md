---
layout: page
title: Modules in the User Interface Extensibility Framework
breadcrumb: Modules
redirect_from:
 - /Frameworks/User-Interface-Extensibility-Framework/Modules/
legacy: true
---

These modules contain the application code.  There are three types of module: `VaultCore` modules, `VaultUI` modules, and `ShellUI` modules.  Most modules are `ShellUI` modules.

Modules are defined within the [Application Definition (manifest) file]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Application-Definition/), and more information can be found in the dedicated page.
{:.note}

## Module types

### VaultCore

`VaultCore` modules run within `MFClient.exe`, and the lifetime of the module follows a connection to a vault within Windows; the module is started when the user logs into the vault, and stops when the user logs out.  These modules:

  * Are executed as a _Windows system user_ and may have wider rights than the current user.
  * Can interact with other system processes.
  * Can write into protected areas, such as _Program Files_.
  * Can install software components.
  * Typically do not show an interface, but can interact with `VaultUI` modules, so can display popup dashboards.

### VaultUI

`VaultUI` modules run within `MFStatus.exe`, and the lifetime of the module follows a connection to a vault within Windows; the module is started when the user logs into the vault, and stops when the user logs out.  These modules:

  * Are executed as the _current Windows user_ and can only access system resources that the current Windows user can access.
  * Can interact with `VaultCore` modules.
  * Display popup dashboards.
  * React to vault events, such as to validate object properties, trace vault usage, or block check-in requests. 

### ShellUI

`ShellUI` modules are bound to the M-Files Shell component.  Each shell window or Windows common dialog runs its own insance of the module.  The lifetime of modules instantiated by the ShellUI module (e.g. the `ShellFrame`) may be shorter.  These modules:

  * Are executed as the current Windows user and can only access system resources that the current Windows user can access.
  * Can access the M-Files Shell interface.
  * Can add custom commands (e.g. buttons in the task area, or context-menu items).
  * Can launch dashboards, either as popups, inside the integrated windows (e.g. to replace the shell listing, the preview panes), or as separate tabs on the right-hand section.
  * Can send synchronous messages to `VaultUI` and `VaultCore` modules.

## Module entry points

Each module must have a specifically-named function declared within it, which acts as the module entry point.  More information on module entry points and event registration is [found on the dedicated page]({{ site.baseurl }}/Frameworks/User-Interface-Extensibility-Framework/Development-Practices/Event-Registration-And-Entry-Points/).