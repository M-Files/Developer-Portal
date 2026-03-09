---
layout: page
title: Deleting Objects — External Storage API
includeInSearch: true
breadcrumb: Deleting Objects
---

```
DELETE /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}
```

Performs a **soft-delete** of an object. The object metadata is marked as deleted, and all associated files are permanently removed.

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID to delete |

File deletion is permanent and cannot be undone. The object metadata remains and the object may be recoverable through undelete operations, but the file contents are permanently removed.
{:.note.warning}

### Request

```bash
curl -X DELETE \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}" \
  -H "Authorization: Bearer <token>"
```

### HTTP response

```text
HTTP/1.1 204 No Content
```

The operation is **idempotent** — deleting an object that does not exist or is already deleted returns 204 without error.
