---
layout: page
title: The Vault Application Framework
---

The Vault Application Framework was created within M-Files to provide a better way to develop and maintain complicated M-Files scripts which, previously, required significant overhead.  The Vault Application Framework is designed to allow you to replace VBScript code within an M-Files vault with .NET code, and is available to all M-Files partners to develop their own solutions against.

Whilst most of the samples on this site use C#, it is also possible to use VB.NET.  If you would like to use VB.NET then you will need to follow [these instructions]({{ site.baseurl }}/Vault-Application-Framework/using-vb.net/).

## Why use the Vault Application Framework?

### Improvements over VBScript

#### Strong typing

Because C# is strongly typed, the compiler will highlight incorrect usages of the API well in advanced of your users.  For example: the compiler can identify if you try and pass a PropertyValue into a method that expects a TypedValue.  This improves the quality of your solution by reducing the number of runtime errors that may be encountered.

#### Reduction in lines of code

Due to the design of the Vault Application Framework, the number of lines of code that you need to write is reduced.  Functionality such as [automated resolution of vault item aliases to internal IDs at runtime]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/), along with helper utilities for building searches or outputting error conditions to the event log, mean that applications can be built faster and with a higher quality.

#### Utilisation of .NET Framework Class Library, and other .NET libraries

Because the Vault Application Framework is based upon .NET 4.5, applications can utilise the functionality available in the .NET [Framework Class Library](https://msdn.microsoft.com/en-us/library/gg145045.aspx).  This includes helpers for serialization and deserialization, as well as Linq, ADO.NET, threading, regular expressions support and more.

What's even better is that other .NET libraries can be referenced for example, using [NuGet](https://www.nuget.org/).  These packages can make complex processes simple such as wrapping access to web services, performing document manipulation, or providing logging frameworks.  The power of these packages are available for you to utilise within your M-Files installations.

#### Better debugging

Debugging complex VBScripting can be time-consuming and frustrating.  When using the Vault Application Framework, applications can instead be [debugged within Visual Studio]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Development-Practices/Debugging/) with full access to Visual Studio tools and resources.  The Vault Application Framework even includes [helper utilities]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helper-Utilities/) for writing exception details to the Windows Event Log, where they can be reported on by standard monitoring software.

#### Simplicity of deployment

Deploying a Vault Application Framework application can be done simply using the M-Files Admin tool, which will automatically install event handlers and other code into their correct places within the M-Files Vault.  Each application can additionally display a version number, which aids in identifying what code is running in each instance.

### Additional functionality

#### Configuration

Built-in attributes such as MFConfiguration and MFIdentitifer reduce the boiler-plate code that is needed to manage tasks such as resolving vault aliases to M-Files IDs.  Using this customisable [configuration]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Configuration/) approach also provides a framework for identifying mandatory vault structure, and reporting out to the event log if the structure is not available.

#### Background Operations

Whereas most processes within M-Files typically operate synchronously, [Background Operations]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Background-Operations/) allow you to execute periodic or time-consuming processes asynchronously, providing a smoother solution for your customers.

#### Helper utilities

Common functions such as building search conditions, or working with search results, are easier using built-in [helper utilities]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Helper-Utilities/).  These extensibile helper utilities reduce the amount of code needed to be written, as well as providing more readable and more maintainable code for the future.
