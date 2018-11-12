---
layout: mfws
title: RepositoryAuthenticationTarget
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/repositoryauthenticationtarget.html"
---

# RepositoryAuthenticationTarget

Structure defining one external repository authentication target.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | DisplayName | Display name of the target repository.
`string` | IconID | Icon id of the target repository.
`string` | ID | ID of the target repository.
[PluginInfoConfiguration](../plugininfoconfiguration/) | PluginInfoConfigurations | Array of plugin configurations.
`string` | RequiresUserSpecificAuthentication | Flag indicating if user specific authentication is required.
[RepositoryAuthenticationStatus](../repositoryauthenticationstatus) | RepositoryAuthenticationStatus | Current authentication status.