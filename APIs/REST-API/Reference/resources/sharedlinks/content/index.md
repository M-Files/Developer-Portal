---
layout: mfws
title: Download shared file
includeInSearch: true
minimumVersion: 11.2.4320.57
---

# Download shared file

## /sharedlinks/(VaultGUID)/(SharePublicAccessKey)/content
{:.url-with-parameters}

Retrieves the (file) content of a given shared link.  Note that authentication is not required to access this endpoint; provided the vault GUID and access token are valid and not expired, the endpoint will return the shared file's content.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | Stream: `application/octet-stream`

Returns `200` with the file contents if the key is valid, or a `500` status code if the key is invalid.
