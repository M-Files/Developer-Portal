---
layout: page
title: Updating Objects — External Storage API
includeInSearch: true
breadcrumb: Updating Objects
---

```
PUT /storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}
```

Creates or updates (upserts) an object. If an object with the given GUID exists it is updated; otherwise a new object is created. Supports both JSON-only and multipart formats, identical to [Creating Objects]({{ site.baseurl }}/APIs/EXTERNAL-API/Creating-Objects/).

| Parameter | Type | Description |
|-----------|------|-------------|
| `vaultId` | GUID | The vault identifier |
| `typeId` | int | The object type ID |
| `objectId` | GUID | The object GUID to create or update |

## JSON request (no files)

```bash
curl -X PUT \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyValues": [
      {
        "propertyDef": 0,
        "value": { "dataType": "text", "value": { "text": "Updated Report Title" } }
      },
      {
        "propertyDef": 25,
        "value": {
          "dataType": "lookup",
          "value": {
            "lookups": [
              {
                "name": "John Smith",
                "guid": "e98c7224-8ee5-417b-8ca9-f8ba04bb0352",
                "objId": { "objType": 6, "id": 20 }
              }
            ]
          }
        }
      },
      {
        "propertyDef": 100,
        "value": {
          "dataType": "lookup",
          "value": {
            "lookups": [
              {
                "name": "TestBasicObject",
                "guid": "1BD819F8-33B8-47B8-8157-10EBF403AB53",
                "objId": { "objType": 1, "id": 94 }
              }
            ]
          }
        }
      }
    ],
    "securityContextObject": {
      "objType": 101,
      "id": 23
    }
  }'
```

### HTTP response

```text
HTTP/1.1 202 Accepted
Content-Type: application/json
Location: /external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}

"{objectId}"
```

PUT always returns **202 Accepted** — both for creates and updates. The operation is processed asynchronously.

## Multipart request (with files)

```bash
curl -X PUT \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}/{objectId}" \
  -H "Authorization: Bearer <token>" \
  -F 'propertyValues=[
    {"propertyDef":0,"value":{"dataType":"text","value":{"text":"Updated Report"}}},
    {"propertyDef":25,"value":{"dataType":"lookup","value":{"lookups":[{"name":"John Smith","guid":"e98c7224-8ee5-417b-8ca9-f8ba04bb0352","objId":{"objType":6,"id":20}}]}}},
    {"propertyDef":100,"value":{"dataType":"lookup","value":{"lookups":[{"name":"TestBasicObject","guid":"1BD819F8-33B8-47B8-8157-10EBF403AB53","objId":{"objType":1,"id":94}}]}}}
  ]' \
  -F 'securityContextObject={"objType":101,"id":23}' \
  -F "file=@/path/to/updated-report.pdf"
```

The same [multipart rules]({{ site.baseurl }}/APIs/EXTERNAL-API/Creating-Objects/#multipart-rules) apply as for POST.

## Behavior

* If the object GUID does **not** exist — a new object is created (same as POST)
* If the object GUID **does** exist — the object is updated with the new property values and files
* The `securityContextObject` is required in both cases
* The response always includes a `Location` header with the resource URI
