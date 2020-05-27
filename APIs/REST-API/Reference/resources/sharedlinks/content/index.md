---
layout: mfws
title: Download shared file
includeInSearch: true
---

# Download shared file

## /sharedlinks/(VaultGUID)/(SharePublicAccessKey)/content
{:.url-with-parameters}

Retrieves the (file) content of a given shared link.
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | Stream: `application/octet-stream`

Returns `200` with the file contents if the key is valid, or a `500` status code if the key is invalid.
