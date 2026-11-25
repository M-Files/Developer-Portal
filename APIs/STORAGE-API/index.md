---
layout: page
title: M-Files Storage API
includeInSearch: true
breadcrumb: Storage API
---

The M-Files Storage API is a REST API for managing **Records** in M-Files Cloud vaults. It is built for **high-speed ingestion**: bringing large amounts of content, with metadata and files, straight into Records, for example during a migration, without creating Active Content first. For concept of Records, refer to following Partner portal document: https://partners.cloudvault.m-files.com/link/CE7643CB-C9BB-4536-8187-707DB78EAF2A/show?object=EE1EAE39-827A-4BA5-86D3-C65CA65D1262

## Terminology

| Term | Meaning |
|------|---------|
| **Active Content** | Normal M-Files objects that users work with every day |
| **Record** | Content kept in the vault for reference rather than daily work. Users can open Records and their files, but cannot edit them |
| **Workspace** | The object a Record belongs to, such as an account or a project. The Record is listed in that workspace and inherits its permissions |
| **Promote** | Move a Record back to Active Content when it needs full functionality again |

This API works only with Records. To work with Active Content, use the [M-Files Web Service (REST API)]({{ site.baseurl }}/APIs/REST-API/) or the [COM/.NET API]({{ site.baseurl }}/APIs/COM-API/).
{:.note}

## Key features

* **High-speed ingestion** — Write operations are accepted at once (`202 Accepted`) and processed in the background
* **Records with files in one request** — Create a Record with its metadata and files (up to 25 MB per file) in a single request
* **Large files** — Files over 25 MB are uploaded directly with a temporary upload link

## Requirements

* An M-Files Cloud vault. The Storage API is not available for on-premises vaults.
* Records enabled for the vault. M-Files enables it on request.
* A workspace defined for each object type you store as Records (*Indexed reference* on the object type's **General** tab in M-Files Admin).
* Full control of the vault permission. See [Authentication]({{ site.baseurl }}/APIs/STORAGE-API/Authentication/).
* A subscription administrator (**Manage access rights**) to create the client application.

## Base URL

```
https://<vault-name>.cloudvault.api.m-files.com/storage/external/v1/vaults/{vaultId}/objects/{typeId}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier, e.g. `c01ca488-fab5-42b9-b90e-ebd2479c7a09` |
| `typeId` | int | The object type ID, e.g. `162` |

## Endpoints overview

### Object operations

| Method | Route | Purpose | Success |
|--------|-------|---------|---------|
| `POST` | `.../objects/{typeId}` | [Create a new object]({{ site.baseurl }}/APIs/STORAGE-API/Creating-Objects/) | 201 / 202 |
| `PUT` | `.../objects/{typeId}/{objectId}` | [Create or update an object]({{ site.baseurl }}/APIs/STORAGE-API/Updating-Objects/) | 202 |
| `GET` | `.../objects/{typeId}` | [List objects by type]({{ site.baseurl }}/APIs/STORAGE-API/Retrieving-Objects/) | 200 |
| `GET` | `.../objects/{typeId}/{objectId}` | [Get a single object]({{ site.baseurl }}/APIs/STORAGE-API/Retrieving-Objects/) | 200 |
| `GET` | `.../objects/{typeId}/{objectId}/versions` | [Get all versions]({{ site.baseurl }}/APIs/STORAGE-API/Retrieving-Objects/#get-object-versions) | 200 |
| `DELETE` | `.../objects/{typeId}/{objectId}` | [Soft-delete an object]({{ site.baseurl }}/APIs/STORAGE-API/Deleting-Objects/) | 204 |

### File operations

| Method | Route | Purpose | Success |
|--------|-------|---------|---------|
| `POST` | `.../objects/{typeId}/{objectId}/files` | [Upload file to object]({{ site.baseurl }}/APIs/STORAGE-API/File-Operations/) | 200 |
| `GET` | `.../objects/{typeId}/{objectId}/files/{fileId}/content` | [Download a file]({{ site.baseurl }}/APIs/STORAGE-API/File-Operations/#download-a-file) | 200 / 206 |
| `PATCH` | `.../objects/{typeId}/{objectId}/files/{fileId}/content` | [Update file content/metadata]({{ site.baseurl }}/APIs/STORAGE-API/File-Operations/#update-a-file) | 200 |
| `DELETE` | `.../objects/{typeId}/{objectId}/files/{fileId}` | [Delete a file]({{ site.baseurl }}/APIs/STORAGE-API/File-Operations/#delete-a-file) | 200 |

### Large file upload (SAS token flow)

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `.../objects/{typeId}/{objectId}/files/initialize` | [Get SAS upload URL]({{ site.baseurl }}/APIs/STORAGE-API/Large-File-Upload/) |
| `POST` | `.../objects/{typeId}/{objectId}/files/{fileId}/complete` | [Signal upload complete]({{ site.baseurl }}/APIs/STORAGE-API/Large-File-Upload/#step-3--complete) |
| `GET` | `.../objects/{typeId}/{objectId}/files/{fileId}/status` | [Poll for completion]({{ site.baseurl }}/APIs/STORAGE-API/Large-File-Upload/#step-4--poll-for-status) |

## Getting started

1. [Quickstart]({{ site.baseurl }}/APIs/STORAGE-API/Quickstart/): create a client application and make your first call with ready-made scripts
2. [Authentication]({{ site.baseurl }}/APIs/STORAGE-API/Authentication/): how programs get access tokens without anyone signing in
3. [Understand core concepts]({{ site.baseurl }}/APIs/STORAGE-API/Concepts/) (Records, workspaces, property values)
4. [Create your first object]({{ site.baseurl }}/APIs/STORAGE-API/Creating-Objects/)
