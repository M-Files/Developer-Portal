---
layout: page
title: Retrieving Objects — External Storage API
includeInSearch: true
breadcrumb: Retrieving Objects
---

## Get a single object

```
GET /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}
```

Returns the latest version of an object with its metadata, file list, and permissions.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |

### Request

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}" \
  -H "Authorization: Bearer <token>"
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
  "object": {
    "version": {
      "version": { "version": 1 },
      "title": "Quarterly Report Q1 2025",
      "singleFile": true,
      "files": [
        {
          "fileVer": { "type": "", "fileId": { "type": "", "internalId": 1 }, "internalVersion": 1 },
          "title": "report",
          "extension": "pdf",
          "logicalSize": "1048576",
          "fileGuid": "{EA17457E-7F7B-48F2-BB4C-3E0E0E2900EF}"
        }
      ],
      "class": 94,
      "versionGuid": "{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}"
    },
    "object": {
      "objId": { "objType": 162, "id": 1 },
      "objectGuid": "{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}",
      "latestCheckedInVersion": { "version": 1 }
    }
  },
  "propertyValues": [
    {
      "propertyDef": 0,
      "value": { "dataType": "text", "value": { "text": "Quarterly Report Q1 2025" } }
    }
  ],
  "deleted": false,
  "securityContextObject": {
    "objType": 101,
    "id": 23
  },
  "objectPermissions": {
    "currentUserCanSee": true,
    "currentUserCanEdit": false,
    "currentUserCanDelete": false,
    "currentUserCanChangePermissions": false
  }
}
```

## List objects by type (paginated)

```
GET /storage/external/v1/vaults/{vaultId}/objects/{typeId}
```

Returns the latest versions of all objects of the specified type. Results are paginated.

| Parameter | Type | In | Description |
|-----------|------|----|-------------|
| `vaultId` | GUID | path | The vault identifier |
| `typeId` | int | path | The object type ID |
| `limit` | int | query | Page size (number of objects to return) |
| `ct` | string | query | Continuation token from a previous response |

### Request

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}?limit=50" \
  -H "Authorization: Bearer <token>"
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
  "objects": [
    { ... },
    { ... }
  ],
  "continuationToken": "eyJjdCI6Ik5leH..."
}
```

To fetch the next page, pass the `continuationToken` as the `ct` query parameter:

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}?limit=50&ct=eyJjdCI6Ik5leH..." \
  -H "Authorization: Bearer <token>"
```

When no more results are available, the `continuationToken` will be `null` or absent.

## Get object versions

```
GET /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/versions
```

Returns all versions of an object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |

### Request

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/versions" \
  -H "Authorization: Bearer <token>"
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "object": {
      "version": { "version": { "version": 2 } },
      "object": { "objId": { "objType": 162, "id": 1 } }
    },
    "propertyValues": [ ... ],
    "deleted": false,
    "securityContextObject": { "objType": 101, "id": 23 }
  },
  {
    "object": {
      "version": { "version": { "version": 1 } },
      "object": { "objId": { "objType": 162, "id": 1 } }
    },
    "propertyValues": [ ... ],
    "deleted": false,
    "securityContextObject": { "objType": 101, "id": 23 }
  }
]
```
