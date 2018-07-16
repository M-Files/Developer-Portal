---
layout: page
title: Debugging Vault Application Framework applications
includeInSearch: true
breadcrumb: Debugging
---

## Approaches

Occasionally, even the best-written code needs to be debugged, and debugging VBScript code is not a nice process.  Using the Vault Application Framework applications can be easily debugged from within Visual Studio using one of two methods:

### Attaching to a Process

To debug code that executes on an event (e.g. a workflow state action) or on a period (e.g. a background operation), the easiest solution is to attach to the `MFAppPlatform.exe` event.  This can be done within Visual Studio by selecting the `Debug` menu, then `Attach to Process`:

![Attach to Process](attach-to-process.png)

Multiple `MFAppPlatform.exe` processes may be listed in this window; use the Ctrl or Shift keys on your keyboard to select all of them.
{:.note}

Once attached to the process, you can use any of [Visual Studio's debugging features](https://msdn.microsoft.com/en-us/library/k0k771bt.aspx) to debug your code.

A command button can be added to Visual Studio 2015 and Visual Studio 2017 to automate the attaching to the `MFAppPlatform.exe` processes.  See [this page for more information]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Visual-Studio/Attach-To-Processes).
{:.note}

### Launching the Debugger

Code that executes early-on in the application's lifecycle (e.g. on start of the application) cannot easily be debugged by attaching to the process, as the event has typically already fired before the debugger can attach.  In this situation, [System.Diagnostics.Debugger.Launch()](https://msdn.microsoft.com/en-us/library/system.diagnostics.debugger.launch.aspx) can be used to launch and attach a debugger to the current process:

```csharp
public class VaultApplication
	: VaultApplicationBase
{
	public VaultApplication()
	{
		System.Diagnostics.Debugger.Launch();
	}
}
```

## Remote Debugging

Visual Studio allows developers to debug applications that are deployed on different computers.  To do so, you must use the Visual Studio remote debugger.  [Microsoft have published detailed guidance on deploying and configuring the remote debugging tools](https://msdn.microsoft.com/en-us/library/y7f5zaaa.aspx), which can then be used to debug the `MFAppPlatform.exe` process on another machine.

Remote debugging of production systems is not recommended.
{:.note}
