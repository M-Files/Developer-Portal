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
`string` | AuthenticationToken | The authentication token for plugin authentication.
`string` | RefreshToken | The refresh token for plugin authentication.