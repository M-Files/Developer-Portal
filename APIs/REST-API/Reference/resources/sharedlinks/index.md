---
layout: mfws
title: Shared links
includeInSearch: true
minimumVersion: 11.2.4320.57
---

# Shared Links

## /sharedlinks
{:.url-with-parameters}

Gets or creates shared links.
{:.description}

### Methods

### GET
{:.method}

Retrieves all the shared links created by the current user or (if the user is an admin) returns all shared links in the vault.

{:.method}
Output: | [SharedLinkInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/sharedlinkinfo/)[]

### POST
{:.method}

Creates a shared link for the file information provided.

{:.method}
Input: | [SharedLinkInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/sharedlinkinfo/)
Output: | [SharedLinkInfo]({{ site.baseurl }}/APIs/REST-API/Reference/structs/sharedlinkinfo/)
| Information about the new shared link (including the access key).

#### Valid ShareLinkInfo configurations

ObjectVersion Type | File Version Type | Version
--- | ---
[MFObjVerVersionTypeUninitialized]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfobjverversiontype/) | [MFFileVerVersionTypeUninitialized]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffileverversiontype/) | `-1` or latest version number
[MFObjVerVersionTypeUninitialized]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfobjverversiontype/) | [MFFileVerVersionTypeUninitialized]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffileverversiontype/) | specific version number
[MFObjVerVersionTypeSpecific]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfobjverversiontype/) | [MFFileVerVersionTypeUninitialized]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffileverversiontype/) | `-1` or latest version number
[MFObjVerVersionTypeSpecific]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mfobjverversiontype/) | [MFFileVerVersionTypeUninitialized]({{ site.baseurl }}/APIs/REST-API/Reference/enumerations/mffileverversiontype/) | specific version number

*** All other combinations will not work/not supported**

### Sub-Resources

{:#sub-resources}
Item | Description
--- | ---
[Delete a shared link]({{ site.baseurl }}/APIs/REST-API/Reference/resources/sharedlinks/delete/) | Deletes/deactivates an existing shared link.
[Download content of a shared link]({{ site.baseurl }}/APIs/REST-API/Reference/resources/sharedlinks/content/) | Downloads a shared file.
