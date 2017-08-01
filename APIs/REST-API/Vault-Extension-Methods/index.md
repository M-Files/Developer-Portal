---
layout: page
title: Vault Extension Methods via the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Vault Extension Methods
---

Vault Extension Methods are described in more detail on the <a href="{{ site.baseurl }}/Built-In/VBScript/Vault-Extension-Methods/">Vault Extension Method page</a>.
{:.note}

From M-Files 11.1.4310.124, Vault Extension Methods can also be executed through the M-Files Web Service.  A vault extension method can be executed by making a HTTP POST request to the following address format:

`/REST/vault/extensionmethod/<methodName>`

For example, for a vault extension method named `DestroyObject`, a HTTP POST request must be made to `/REST/vault/extensionmethod/DestroyObject`.

The input parameter is passed within the HTTP request body.  The output of the extension method is returned in the HTTP response body.
{:.note}