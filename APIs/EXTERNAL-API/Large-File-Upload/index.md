---
layout: page
title: Large File Upload (SAS Token Flow) — External Storage API
includeInSearch: true
breadcrumb: Large File Upload
---

For files larger than 25 MB, use the SAS (Shared Access Signature) token flow. This uploads the file directly to Azure Blob Storage, bypassing the API's request size limits.

The flow has four steps:

1. [Initialize](#step-1--initialize) — Get a SAS upload URL
2. [Upload](#step-2--upload-to-azure-blob-storage) — Upload the file directly to Azure
3. [Complete](#step-3--complete) — Signal the upload is done
4. [Poll](#step-4--poll-for-status) — Wait for processing to finish

## Step 1 — Initialize

```
POST /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/initialize
```

Creates an upload session and returns a SAS URL for direct blob upload.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID |

### Request

```bash
curl -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/initialize" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "large-archive.zip",
    "contentType": "application/zip",
    "sizeBytes": 104857600
  }'
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fileName` | string | Yes | Name of the file (must not contain `..`, `/`, or `\`) |
| `contentType` | string | No | MIME type (defaults to `application/octet-stream`) |
| `sizeBytes` | long | Yes | File size in bytes (must be non-negative) |

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
  "uploadUrl": "https://storageaccount.blob.core.windows.net/container/path?sv=...&sig=...",
  "fileId": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "expiresAt": "2025-03-15T14:30:00Z"
}
```

| Field | Description |
|-------|-------------|
| `uploadUrl` | SAS URL for direct upload to Azure Blob Storage |
| `fileId` | File reference ID — use this in subsequent steps |
| `expiresAt` | When the SAS token expires |

## Step 2 — Upload to Azure Blob Storage

Upload the file directly to the `uploadUrl` returned in Step 1. This request goes to Azure Blob Storage, not to the M-Files API.

```bash
curl -X PUT "<uploadUrl>" \
  -H "x-ms-blob-type: BlockBlob" \
  -H "Content-Type: application/zip" \
  --data-binary @/path/to/large-archive.zip
```

The upload URL includes a SAS token that grants temporary write access. The token expires at the time indicated by `expiresAt`. Upload must complete before expiry.
{:.note.warning}

## Step 3 — Complete

```
POST /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/complete
```

Signals that the blob upload is finished and triggers background processing to attach the file to the object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fileId` | GUID | The file reference ID from Step 1 |

### Request

```bash
curl -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/complete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "large-archive.zip"
  }'
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fileName` | string | No | Override the filename from the initialize step |

### HTTP response

```text
HTTP/1.1 202 Accepted
Content-Type: application/json

{
  "status": "processing",
  "fileId": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "message": "File upload is being processed",
  "statusUrl": "/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/status"
}
```

The request is idempotent — calling complete multiple times for the same upload returns the current status without creating duplicate operations.

## Step 4 — Poll for status

```
GET /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/status
```

Check the progress of a file upload.

### Request

```bash
curl -X GET \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/{fileId}/status" \
  -H "Authorization: Bearer <token>"
```

### HTTP response

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
  "fileId": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "status": "completed",
  "success": true,
  "fileGuid": "ea17457e-7f7b-48f2-bb4c-3e0e0e2900ef",
  "createdAt": "2025-03-15T14:25:00Z",
  "lastUpdatedAt": "2025-03-15T14:27:30Z"
}
```

### Status values

| Status | Meaning |
|--------|---------|
| `initialized` | Upload session created; waiting for blob upload |
| `processing` | File received; being processed and attached to object |
| `completed` | Done — `fileGuid` is available in the response |
| `failed` | Upload failed — check `errorMessage` for details |
| `expired` | SAS token expired before upload completed |

### Polling strategy

Poll at intervals (e.g. every 2-5 seconds) until `status` is `completed` or `failed`. Implement exponential backoff to avoid rate limiting:

```bash
# Example polling loop
while true; do
  STATUS=$(curl -s -H "Authorization: Bearer <token>" \
    "https://<host>/storage/external/v1/vaults/.../files/{fileId}/status" \
    | jq -r '.status')

  if [ "$STATUS" = "completed" ] || [ "$STATUS" = "failed" ]; then
    echo "Final status: $STATUS"
    break
  fi

  sleep 5
done
```

## Complete example

```bash
# 1. Initialize upload
INIT=$(curl -s -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/initialize" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"fileName":"large-archive.zip","contentType":"application/zip","sizeBytes":104857600}')

UPLOAD_URL=$(echo $INIT | jq -r '.uploadUrl')
FILE_ID=$(echo $INIT | jq -r '.fileId')

# 2. Upload to Azure
curl -X PUT "$UPLOAD_URL" \
  -H "x-ms-blob-type: BlockBlob" \
  -H "Content-Type: application/zip" \
  --data-binary @/path/to/large-archive.zip

# 3. Signal completion
curl -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/$FILE_ID/complete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d "{\"fileName\":\"large-archive.zip\"}"

# 4. Poll for status
curl -s \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}/files/$FILE_ID/status" \
  -H "Authorization: Bearer <token>"
```
