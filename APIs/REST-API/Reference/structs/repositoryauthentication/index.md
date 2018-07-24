---
layout: mfws
title: RepositoryAuthentication
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/repositoryauthentication.html"
---

# RepositoryAuthentication

Structure defining authentication data for external repository authentication.

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
`string` | ConfigurationName | Name of the authentication configuration.
`string` | Username | Username used for basic authentication.
`string` | Password | Password used for basic authentication.
`string` | AuthenticationToken | The authentication token for plugin authentication.  *Must be null if using basic username/password authentication*
`string` | RefreshToken | The refresh token for plugin authentication.

`ConfigurationName` is typically retrieved from the [PluginInfoConfiguration.Name]({{ site.baseurl }}/APIs/REST-API/Reference/structs/plugininfoconfiguration/) information returned in [RepositoryAuthenticationTarget]({{ site.baseurl }}/APIs/REST-API/Reference/structs/repositoryauthenticationtarget/).  This must be provided even if basic authentication is being used.
{:.remark}