---
layout: page
title: File Operations — External Storage API
includeInSearch: true
breadcrumb: File Operations
---

These endpoints manage files on existing objects. For uploading files during object creation, see [Creating Objects]({{ site.baseurl }}/APIs/EXTERNAL-API/Creating-Objects/). For files larger than 25 MB, see [Large File Upload]({{ site.baseurl }}/APIs/EXTERNAL-API/Large-File-Upload/).

## Upload a file to an existing object

```
POST /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files
```

Uploads a file and attaches it to an existing object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |

### Request

```bash
curl -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files" \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/document.pdf"
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
  "fileGuid": "ea17457e-7f7b-48f2-bb4c-3e0e0e2900ef",
  "fileName": "document.pdf",
  "success": true
}
```

The maximum file size for direct upload is 25 MB. For larger files, use the [SAS token flow]({{ site.baseurl }}/APIs/EXTERNAL-API/Large-File-Upload/).
{:.note}

## Download a file

```
GET /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/content
```

Downloads a file's content as a binary stream.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |
| `fileId` | GUID | The file GUID |

### Request

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/content" \
  -H "Authorization: Bearer <token>" \
  -o downloaded-file.pdf
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"

<binary file data>
```

### Partial downloads (Range requests)

The endpoint supports HTTP Range headers (RFC 7233) for resumable downloads:

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/content" \
  -H "Authorization: Bearer <token>" \
  -H "Range: bytes=0-1023"
```

```text
HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1023/5242880

<first 1024 bytes>
```

## Update a file

```
PATCH /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/content
```

Updates a file's content, title, or content type. Sent as `multipart/form-data` with an optional metadata part and an optional file part. At least one must be provided.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |
| `fileId` | GUID | The file GUID to update |

### Update both content and title

```bash
curl -X PATCH \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/content" \
  -H "Authorization: Bearer <token>" \
  -F 'data={"title":"Updated Report","contentType":"application/pdf"}' \
  -F "file=@/path/to/updated-report.pdf"
```

### Update title only (no file)

```bash
curl -X PATCH \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/content" \
  -H "Authorization: Bearer <token>" \
  -F 'data={"title":"New Display Name"}'
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
  "fileGuid": "ea17457e-7f7b-48f2-bb4c-3e0e0e2900ef",
  "fileName": "Updated Report.pdf",
  "title": "Updated Report",
  "contentType": "application/pdf",
  "newVersionNumber": 2
}
```

### Metadata fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | New display name for the file |
| `contentType` | string | New MIME content type |

The metadata part (`data`) must come before the file part if both are provided.
{:.note}

## Delete a file

```
DELETE /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}
```

Removes a specific file from an object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |
| `fileId` | GUID | The file GUID to delete |

File deletion is permanent and cannot be undone.
{:.note.warning}

### Request

```bash
curl -X DELETE \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}" \
  -H "Authorization: Bearer <token>"
```

### HTTP response

```text
HTTP/1.1 200 OK
```
