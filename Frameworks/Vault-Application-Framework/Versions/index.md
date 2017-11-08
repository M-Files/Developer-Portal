---
layout: page
title: Versions
includeInSearch: true
---

## Versions

## Component Matrix

VAF Version | Compatible M-Files versions | Feature 1 | [Licensing](../Licensing) | [Configuration](../Configuration)
--- | ---
2.0 | 2015.3 onwards[*](#configuration-compatibility) | Yes | Yes | Yes
1.0 | 2015 onwards | Yes | No | Yes[*](#name-value-storage-configuration)

### Version 2.0

Version 2.0 of the Vault Application Framework was released in late 2017, alongside M-Files 2018.  Alongside numerous internal bugfixes and performance work, this release brings two new features:

* [Licensing](../Licensing)

* [Compatibility with the M-Files 2018 Administration Configuration interface](../Configuration)

#### Configuration compatibility



### Version 1.0

Version 1.0 of the Vault Application Framework was released in early 2016.

#### Name-Value Storage Configuration

The initial release of the framework supported [configuration attributes]({{ site.baseurl }}/Frameworks/Vault-Application-Framework/Attributes/Configuration/#mfconfiguration) that were used to mark up configuration objects used by each application.  These configuration objects were serialised into Name-Value storage, and the [Name-Value Storage Manager](https://kb.cloudvault.m-files.com/Default.aspx?#3ECA226F-7B54-428B-B539-DE443E6134EC/object/0A8D789B-4E2B-4649-B1A1-AF0755B0C444/latest) could be used to alter them at runtime.

The 2.0 release of the framework introduced another approach which integrates with the new configuration administration interface in M-Files 2018.  It is recommended that applications that target M-Files 2018 and upwards migrate to the new version.