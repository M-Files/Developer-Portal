---
layout: page
title: Creating Objects — External Storage API
includeInSearch: true
breadcrumb: Creating Objects
---

```
POST /storage/external/v1/vaults/{vaultId}/objects/{typeId}
```

Creates a new object in the vault. Two content types are supported: JSON-only (no files) and multipart (with files).

Every request must include `propertyValues` and `securityContextObject`. The security context object determines which Advanced object's ACL controls access to the new object. See [Concepts]({{ site.baseurl }}/APIs/EXTERNAL-API/Concepts/) for details.
{:.note.warning}

## Option 1 — JSON only (no files)

Use `Content-Type: application/json` when creating an object without files.

### Request

```bash
curl -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyValues": [
      {
        "propertyDef": 0,
        "value": { "dataType": "text", "value": { "text": "Quarterly Report Q1 2025" } }
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

### HTTP request

```text
POST /storage/external/v1/vaults/c01ca488-fab5-42b9-b90e-ebd2479c7a09/objects/162 HTTP/1.1
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json
Host: <host>

{
  "propertyValues": [
    {
      "propertyDef": 0,
      "value": { "dataType": "text", "value": { "text": "Quarterly Report Q1 2025" } }
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
}
```

### HTTP response

```text
HTTP/1.1 201 Created
Content-Type: application/json
Location: /external/v1/vaults/c01ca488-fab5-42b9-b90e-ebd2479c7a09/objects/162/a1b2c3d4-e5f6-7890-abcd-ef1234567890

"a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

The response body contains the new object's GUID. The `Location` header contains the full URI for retrieving the object.

## Option 2 — Multipart (with files)

Use `Content-Type: multipart/form-data` when creating an object with files (up to 25 MB per file).

### Request

```bash
curl -X POST \
  "https://<host>/storage/external/v1/vaults/{vaultId}/objects/{typeId}" \
  -H "Authorization: Bearer <token>" \
  -F 'propertyValues=[
    {"propertyDef":0,"value":{"dataType":"text","value":{"text":"Quarterly Report Q1 2025"}}},
    {"propertyDef":25,"value":{"dataType":"lookup","value":{"lookups":[{"name":"John Smith","guid":"e98c7224-8ee5-417b-8ca9-f8ba04bb0352","objId":{"objType":6,"id":20}}]}}},
    {"propertyDef":100,"value":{"dataType":"lookup","value":{"lookups":[{"name":"TestBasicObject","guid":"1BD819F8-33B8-47B8-8157-10EBF403AB53","objId":{"objType":1,"id":94}}]}}}
  ]' \
  -F 'securityContextObject={"objType":101,"id":23}' \
  -F "file=@/path/to/report.pdf" \
  -F "file=@/path/to/attachment.docx"
```

### HTTP request

```text
POST /storage/external/v1/vaults/c01ca488-fab5-42b9-b90e-ebd2479c7a09/objects/162 HTTP/1.1
Authorization: Bearer eyJhbGciOi...
Content-Type: multipart/form-data; boundary=----boundary123
Host: <host>

------boundary123
Content-Disposition: form-data; name="propertyValues"
Content-Type: application/json

[
  {
    "propertyDef": 0,
    "value": { "dataType": "text", "value": { "text": "Quarterly Report Q1 2025" } }
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
]
------boundary123
Content-Disposition: form-data; name="securityContextObject"
Content-Type: application/json

{"objType": 101, "id": 23}
------boundary123
Content-Disposition: form-data; name="file"; filename="report.pdf"
Content-Type: application/pdf

<binary file data>
------boundary123--
```

### HTTP response

```text
HTTP/1.1 202 Accepted
Content-Type: application/json
Location: /external/v1/vaults/c01ca488-fab5-42b9-b90e-ebd2479c7a09/objects/162/a1b2c3d4-e5f6-7890-abcd-ef1234567890

"a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

Multipart requests are processed asynchronously. The 202 status indicates the request has been accepted and will be processed. The object may not be immediately available via GET.

## Multipart rules

* The `propertyValues` part **must come before** the file parts
* The `securityContextObject` part **must come before** the file parts
* Metadata part name must be `propertyValues` or `data`
* Security context part name must be `securityContextObject`
* File part name must be `file` or `files`
* The `propertyValues` JSON must be a bare array `[...]`
* Multiple files can be included in a single request
* PropertyDef 22 (Single file) is auto-calculated from file count — **do not send it**
* Max file size for direct upload: **25 MB** (use the [SAS token flow]({{ site.baseurl }}/APIs/EXTERNAL-API/Large-File-Upload/) for larger files)

## Request body reference

### CreateObjectRequest (JSON)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `propertyValues` | PropertyValue[] | Yes | Array of property values. Must include PropertyDefId 0, 25, and 100. |
| `securityContextObject` | ObjId | Yes | The parent object whose ACL controls access to this object. |

### ObjId

| Field | Type | Description |
|-------|------|-------------|
| `objType` | int | Object type ID of the security context object |
| `id` | int | Object ID of the security context object |

## Full metadata example

The following example uses values from a test vault. Adjust property IDs, class IDs, and GUIDs to match your vault.
{:.note}

```json
{
  "propertyValues": [
    {
      "propertyDef": 0,
      "value": {
        "dataType": "text",
        "value": { "text": "Quarterly Report Q1 2025", "isNull": false }
      }
    },
    {
      "propertyDef": 25,
      "value": {
        "dataType": "lookup",
        "value": {
          "isNull": false,
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
          "isNull": false,
          "lookups": [
            {
              "objId": { "objType": 1, "id": 94 },
              "guid": "1BD819F8-33B8-47B8-8157-10EBF403AB53",
              "name": "TestBasicObject"
            }
          ]
        }
      }
    },
    {
      "propertyDef": 1078,
      "value": {
        "dataType": "multiSelectLookup",
        "value": {
          "isNull": false,
          "lookups": [
            {
              "name": "Austin District Redevelopment",
              "guid": "f3474d95-f93b-4f43-b41a-bd3cfc030688",
              "objId": { "objType": 101, "id": 23 }
            }
          ]
        }
      }
    },
    {
      "propertyDef": 116,
      "value": {
        "dataType": "multiSelectLookup",
        "value": {
          "isNull": false,
          "lookups": [
            {
              "name": "John Smith",
              "guid": "e98c7224-8ee5-417b-8ca9-f8ba04bb0352",
              "objId": { "objType": 6, "id": 20 }
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
}
```
