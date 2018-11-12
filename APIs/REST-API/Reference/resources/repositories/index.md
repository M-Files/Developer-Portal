---
layout: mfws
title: Repositories
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/repositories.html"
---

# Repositories

## /repositories
{:.url-with-parameters}

Gets the external repositories.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [RepositoryAuthenticationTarget[]]({{ site.baseurl }}/APIs/REST-API/Reference/structs/repositoryauthenticationtarget/)
| Array of repository authentication target objects showing the current external repository connections and their authentication states.

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Repository session]({{ site.baseurl }}/APIs/REST-API/Reference/resources/repositories/session/) | A single repository session.