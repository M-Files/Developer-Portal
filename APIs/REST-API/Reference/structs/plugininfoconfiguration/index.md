---
layout: mfws
title: PluginInfoConfiguration
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/plugininfoconfiguration.html"
---

# PluginInfoConfiguration

The configuration for authentication plugin.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | Name | The name of the plugin configuration.
`bool` | IsDefault | Specifies if this is the default plugin configuration.
`string` | AssemblyName | Assembly name.
`string` | BridgeClassName | Bridge class name.
`bool` | IsScopeIndependent | Specifies if this plugin configuration is independent of scope.
`string` | Protocol | The used protocol for the plug-in, e.g. SAMLv2.0.
`Dictionary<string, string>` | Configuration | The name of the plugin configuration.
`Dictionary<string, string>` | ConfigurationSource | The name of the plugin configuration.