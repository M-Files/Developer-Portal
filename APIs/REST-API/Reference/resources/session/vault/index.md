---
layout: mfws
title: Vault
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/session/vault.html"
---

# Session

## /session/vault
{:.url-with-parameters}

The document vault attached to the current session. 
{:.description}

### GET
{:.method}

{:.method}
Output: | [Vault]({{ site.baseurl }}/APIs/REST-API/Reference/structs/vault/)
| Retrieves the current session information. 

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the `_method` querystring parameter, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [Vault]({{ site.baseurl }}/APIs/REST-API/Reference/structs/vault/)
Output: | [Vault]({{ site.baseurl }}/APIs/REST-API/Reference/structs/vault/)
| Sets the current vault.
| The request must have either the GUID or the Name of the vault filled. In case both of these are filled the GUID is used. If only the name is filled and there are multiple vaults with the same name, the server will respond with 409. 
