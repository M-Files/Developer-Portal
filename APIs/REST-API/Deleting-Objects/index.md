---
layout: page
title: Deleting and destroying objects with the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Deleting objects
---

This page focuses on deleting objects using the REST API.  Details on deleting objects using the COM API can be found [in the dedicated page]({{ site.baseurl }}/APIs/COM-API/Deleting-Objects/).
{:.note}

## Deleting vs destroying

When removing objects from an M-Files vault, it is important to decide whether the object should be [deleted](#deleting-objects) or [destroyed](#destroying-objects).  Deleted objects are simply flagged as deleted and are hidden from most users.  Administrators can access these deleted items (and optionally [undelete/restore](#undeleting-objects) them) by searching for them using the M-Files Desktop client.  Destroyed objects (or destroyed versions of an object) are permanently removed from the system and cannot be restored.

## Deleting objects

To delete an object, execute a HTTP PUT request to [/objects/(type)/(objectid)/deleted](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/deleted.html), with the HTTP body containing a [PrimitiveType&lt;bool&gt;](https://www.m-files.com/mfws/structs/primitivetypet.html).  The value of the primitive type should be `true` to delete the object.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Build up the HTTP body content.
var primitiveType = new PrimitiveType<bool>()
{
	Value = true // true = delete.
};

// What type of object are we deleting?
const int documentObjectTypeId = 0;

// What is the ID of the object that we're deleting?
const int documentId = 8;

// Execute the post.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
await client.PostAsync(new Uri("http://localhost/REST/objects/" + documentObjectTypeId + "/" + documentId + "/deleted.aspx?_method=PUT"),
	new System.Net.Http.StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(primitiveType), Encoding.UTF8, "application/json"));
```

## Undeleting objects

To undelete an object, execute a HTTP PUT request to [/objects/(type)/(objectid)/deleted](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/deleted.html), with the HTTP body containing a [PrimitiveType&lt;bool&gt;](https://www.m-files.com/mfws/structs/primitivetypet.html).  The value of the primitive type should be `false` to undelete the object.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Build up the HTTP body content.
var primitiveType = new PrimitiveType<bool>()
{
	Value = true // false = undelete.
};

// What type of object are we undeleting?
const int documentObjectTypeId = 0;

// What is the ID of the object that we're undeleting?
const int documentId = 8;

// Execute the post.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
await client.PostAsync(new Uri("http://localhost/REST/objects/" + documentObjectTypeId + "/" + documentId + "/deleted.aspx?_method=PUT"),
	new System.Net.Http.StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(primitiveType), Encoding.UTF8, "application/json"));
```

## Destroying objects

Destroying one or more versions of an object is done by executing a HTTP DELETE request to [/objects/(type)/(objectid)/(version)](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version.html).

### Destroying specific object versions

If the `allVersions` parameter is `false` (or not provided) then the version must be checked out to the current user, and performs an equivalent of [UndoCheckout](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~UndoCheckout.html) (or [ForceUndoCheckout](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~VaultObjectOperations~ForceUndoCheckout.html), if the `force` parameter is `true`).
{:.note}

This endpoint can never destroy a specific version of an object which is checked in.
{:.note.warning}

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// What type of object are we destroying?
const int documentObjectTypeId = 0;

// What is the ID of the object that we're destroying?
const int documentId = 8;

// What is the endpoint to hit?
// NOTE: The object must be checked out to this user.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var uri = new Uri("http://localhost/REST/objects/" + documentObjectTypeId + "/" + documentId + "/latest.aspx?_method=DELETE&allVersions=false");

// Execute the post.
await client.PostAsync(uri, null);
```

### Destroying all object versions

If the `allVersions` parameter is `true` then the endpoint does not require the object to be checked out to the current user.
{:.note}

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// What type of object are we destroying?
const int documentObjectTypeId = 0;

// What is the ID of the object that we're destroying?
const int documentId = 8;

// What is the endpoint to hit?
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var uri = new Uri("http://localhost/REST/objects/" + documentObjectTypeId + "/" + documentId + "/latest.aspx?_method=DELETE&allVersions=true");

// Execute the post.
await client.PostAsync(uri, null);
```