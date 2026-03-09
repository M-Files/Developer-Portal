---
layout: page
title: M-Files External Storage API
includeInSearch: true
breadcrumb: External API
---

The M-Files External Storage API provides a REST interface for importing and managing objects in M-Files external storage (Master Storage). It is designed for bulk data import, integration, and migration scenarios where objects need to be created, updated, and managed programmatically in M-Files Cloud vaults.

This API is separate from the [M-Files Web Service (REST API)]({{ site.baseurl }}/APIs/REST-API/) and the [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/). It connects directly to the cloud storage layer rather than through the M-Files Server.
{:.note}

## Key features

* **Object import** — Create and update objects with metadata and files in a single request
* **Multipart file upload** — Upload files inline with object creation (up to 25 MB per file)
* **Large file upload** — SAS token flow for files exceeding 25 MB, uploading directly to Azure Blob Storage
* **Security context** — Every imported object is linked to a security context object that controls access rights
* **Tag-based relationships** — Lookup properties automatically generate tags for efficient relationship queries
* **Async processing** — Write operations are processed asynchronously and return 202 Accepted

## Base URL

```
/storage/external/v1/vaults/{vaultId}/objects/{typeId}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier, e.g. `c01ca488-fab5-42b9-b90e-ebd2479c7a09` |
| `typeId` | int | The object type ID, e.g. `162` |

## Endpoints overview

### Object operations

| Method | Route | Purpose | Success |
|--------|-------|---------|---------|
| `POST` | `.../objects/{typeId}` | [Create a new object]({{ site.baseurl }}/APIs/EXTERNAL-API/Creating-Objects/) | 201 / 202 |
| `PUT` | `.../objects/{typeId}/{objectId}` | [Create or update an object]({{ site.baseurl }}/APIs/EXTERNAL-API/Updating-Objects/) | 202 |
| `GET` | `.../objects/{typeId}` | [List objects by type]({{ site.baseurl }}/APIs/EXTERNAL-API/Retrieving-Objects/) | 200 |
| `GET` | `.../objects/{typeId}/{objectId}` | [Get a single object]({{ site.baseurl }}/APIs/EXTERNAL-API/Retrieving-Objects/) | 200 |
| `GET` | `.../objects/{typeId}/{objectId}/versions` | [Get all versions]({{ site.baseurl }}/APIs/EXTERNAL-API/Retrieving-Objects/#get-object-versions) | 200 |
| `DELETE` | `.../objects/{typeId}/{objectId}` | [Soft-delete an object]({{ site.baseurl }}/APIs/EXTERNAL-API/Deleting-Objects/) | 204 |

### File operations

| Method | Route | Purpose | Success |
|--------|-------|---------|---------|
| `POST` | `.../objects/{typeId}/{objectId}/files` | [Upload file to object]({{ site.baseurl }}/APIs/EXTERNAL-API/File-Operations/) | 200 |
| `GET` | `.../objects/{typeId}/{objectId}/files/{fileId}/content` | [Download a file]({{ site.baseurl }}/APIs/EXTERNAL-API/File-Operations/#download-a-file) | 200 / 206 |
| `PATCH` | `.../objects/{typeId}/{objectId}/files/{fileId}/content` | [Update file content/metadata]({{ site.baseurl }}/APIs/EXTERNAL-API/File-Operations/#update-a-file) | 200 |
| `DELETE` | `.../objects/{typeId}/{objectId}/files/{fileId}` | [Delete a file]({{ site.baseurl }}/APIs/EXTERNAL-API/File-Operations/#delete-a-file) | 200 |

### Large file upload (SAS token flow)

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `.../objects/{typeId}/{objectId}/files/initialize` | [Get SAS upload URL]({{ site.baseurl }}/APIs/EXTERNAL-API/Large-File-Upload/) |
| `POST` | `.../objects/{typeId}/{objectId}/files/{fileId}/complete` | [Signal upload complete]({{ site.baseurl }}/APIs/EXTERNAL-API/Large-File-Upload/#step-3--complete) |
| `GET` | `.../objects/{typeId}/{objectId}/files/{fileId}/status` | [Poll for completion]({{ site.baseurl }}/APIs/EXTERNAL-API/Large-File-Upload/#step-4--poll-for-status) |

## Getting started

1. [Obtain an access token]({{ site.baseurl }}/APIs/EXTERNAL-API/Authentication/)
2. [Understand core concepts]({{ site.baseurl }}/APIs/EXTERNAL-API/Concepts/) (security context, property values, tags)
3. [Create your first object]({{ site.baseurl }}/APIs/EXTERNAL-API/Creating-Objects/)
