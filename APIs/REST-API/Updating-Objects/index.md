---
layout: page
title: Updating objects with the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Updating objects
---

This page focuses on updating objects using the REST API.  Details on updating objects using the COM API can be found [in the dedicated page]({{ site.baseurl }}/APIs/COM-API/Updating-Objects/).
{:.note}

The examples below are written in C# and use objects from the [downloadable code samples](https://developer.m-files.com/APIs/REST-API/Reference/samples.html), which contains an `MFWSStructs.cs` file.  This file contains structures that mimic the JSON structures expected by the M-Files Web Service.  These are used to simplify the creation of objects, but are not directly required for use with the Web Service.  Note the bug mentioned in the [tips and tricks](#tips-and-tricks) section below.
{:.note}

The code below uses [JSON.NET](http://www.newtonsoft.com/json) to serialize and deserialize objects into JSON strings.  This library is used simply to keep the code below as clean as possible, and is not required to use the M-Files Web Service.  Some samples in the official documentation use the built-in [DataContractJsonSerializer](https://msdn.microsoft.com/en-us/library/system.runtime.serialization.json.datacontractjsonserializer(v=vs.110).aspx) class, but this can have issues with JSON-formatted dates.
{:.note}

Objects can be found and modified using endpoints underneath the [object's version endpoint](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version.html).  Each object within M-Files is automatically versioned as it is changed by users or the M-Files system itself.  The object version endpoint represents a specific version of the object within the vault.  For example, `/objects/0/123/1` represents version 1 of a document with ID 123, and `/objects/0/456/2` represents version 2 of a document with ID 456.  The latest version of an object can always be found by replacing the `version` element of the endpoint address with the string `latest`.  For example: `/objects/0/789/latest` always refers to the latest version of an object, even as the object is changed by others within the M-Files vault.

## Setting a property value

Properties for an object can be altered en-masse by making a `POST` or `PUT` request to [/objects/(type)/(objectid)/(version)/properties](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties.html).  Note that a `POST` request can be used to add specific properties to an object, whereas a `PUT` request must always include all object properties, as those not included will be removed from the object.

A specific property can be added, updated, or removed from an object by using the [/objects/(type)/(objectid)/(version)/properties/(id)](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/properties/id.html) endpoint.  In addition, some other endpoints exist (e.g. [/objects/(type)/(objectid)/(version)/comments](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/comments.html), [/objects/(type)/(objectid)/(version)/title](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/title.html), and [/objects/(type)/(objectid)/(version)/workflowstate](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/workflowstate.html)) that allow specific M-Files properties to be updated.

Updating properties still requires the object to be checked out.  The general process should be: check out, update object, check in.  Some endpoints will automatically do this in the background (e.g. [/objects/(type)/(objectid)/(version)/comments](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/comments.html)), but these will be detailed in the documentation.
{:.note}

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Add a comment to the document with ID 459.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
await client.PostAsync(new Uri("http://localhost/REST/objects/0/459/latest/comments.aspx?_method=PUT"),
	new System.Net.Http.StringContent("{ \"Value\" : \"This is a test comment \"}"));
```

### Setting typed value 

When updating a property value, it is important to ensure that the [PropertyValue]({{ site.baseurl }}/APIs/REST-API/Reference/structs/propertyvalue/) object (and the [TypedValue]({{ site.baseurl }}/APIs/REST-API/Reference/structs/typedvalue/) instance within) is populated appropriately.  For almost all data types, this means correctly populating the `Value` property on the TypedValue:

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Update the name or title.
// Note: assumes object already checked out.
await client.PostAsync(new Uri("http://localhost/REST/objects/0/459/latest/properties/0.aspx?_method=PUT"),
	new System.Net.Http.StringContent("{ \"PropertyDef\" : 0, \"TypedValue\": { \"DataType\": 0, \"Value\": \"my object name\" } }"));
```

#### Lookups

For single-select lookup properties ("Choose from list"), you should instead set the `Lookup` property:

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Update the class.
// Note: assumes object already checked out.
await client.PostAsync(new Uri("http://localhost/REST/objects/0/459/latest/properties/100.aspx?_method=PUT"),
	new System.Net.Http.StringContent("{ \"PropertyDef\" : 100, \"TypedValue\": { \"DataType\": 9, \"Lookup\": { \"Item\" : 0, \"Version\": -1 } } }"));
```

#### Multi-select lookups

For multi-select lookup properties ("Choose from list (multi-select)"), you should instead set the `Lookups` property:

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Update a property with two items (objects with internal ID 20 and 30).
// Note: assumes object already checked out.
await client.PostAsync(new Uri("http://localhost/REST/objects/0/459/latest/properties/12345.aspx?_method=PUT"),
	new System.Net.Http.StringContent("{ \"PropertyDef\" : 12345, \"TypedValue\": { \"DataType\": 10, \"Lookups\":  [ { \"Item\" : 20, \"Version\": -1 }, { \"Item\" : 30, \"Version\": -1 } ] } }"));
```

## Updating an existing file

Updating an existing file typically involves a number of steps:

1. [Checking out the existing object](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout.html).
2. Executing a PUT request to [replace the existing file content](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/files/file/content.html).
3. [Checking in the existing object](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout.html).

In the sample below we check out a document (object type 0) with ID 551, then replace the content of the file with a file from the local hard disk, then check it in again.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Create the content for the checkout request.
// NOTE: 2 == "CheckedOutToMe" from https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html.
var httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"2\" }");

// Check out the document with ID 551.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var checkedOutObjectVersion  = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PostAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout.aspx?_method=PUT"), httpContent)).Content.ReadAsStringAsync());

// Upload the file.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var uri =
	new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/files/{checkedOutObjectVersion.Files[0].ID}/content.aspx?_method=PUT");
await client.PostAsync(uri, new System.Net.Http.StreamContent(localFileToUpload.OpenRead()));

// Create the content for the checkin request.
// NOTE: 0 == "CheckedIn" from https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html.
httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"0\" }");

// Check in the object.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PostAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout.aspx?_method=PUT"), httpContent)).Content.ReadAsStringAsync());
```

The [check out status endpoint documentation](https://developer.m-files.com/APIs/REST-API/Reference/resources/objects/type/objectid/version/checkedout.html) states that the PUT request takes an [MFCheckOutStatus](https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html) as an input, but this must be wrapped in a [PrimitiveType](https://developer.m-files.com/APIs/REST-API/Reference/structs/primitivetypet.html); this is the reason that the JSON for the checkout/checkin requests contains the "Value" element and not just the check in enum value.
{:.note}

## Adding a new file to an existing object

Adding a new file to an existing object is similar to replacing the content of an existing file: the object must be checked out, the file added, then checked in again.  There are, however, two additional situations that may need to be considered:

* If a file is being added to an object which is not a document ([see "Creating a New Object Type"](https://www.m-files.com/user-guide/latest/eng/New_object_type.html)) then the object type must support having files.  If not then the request will fail.

* If a file is being added to an existing document, then the document may need to be converted to a [Multi-File Document (MFD)](https://www.m-files.com/user-guide/latest/eng/MFD_SFD.html) as part of the process.  Whether a document is a Multi-File-Document can be found either by checking the [ObjectVersion](https://developer.m-files.com/APIs/REST-API/Reference/structs/objectversion.html) (the "SingleFile" property will be true), or by checking the value of property 22 ("Single file").  This is a built-in property.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication",
	"DummyAuthenticationToken");

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Create the content for the checkout request.
// NOTE: 2 == "CheckedOutToMe" from https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html.
var httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"2\" }");

// Check out the document with ID 551.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var checkedOutObjectVersion  = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PostAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout.aspx?_method=PUT"), httpContent)).Content.ReadAsStringAsync());

Uri uri;

// If it's a single-file-document, update it to multi-file-document.
if (checkedOutObjectVersion.SingleFile)
{
	// Create the content for the "Single file" property.
	httpContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(new PropertyValue()
	{
		PropertyDef = 22, // The built-in "Single file" property.
		TypedValue = new TypedValue()
		{
			DataType = MFDataType.Boolean,
			Value = false // If "single file" is false, then it is a multi-file-document.
		}
	}));

	// Update the property.
	// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
	uri =
		new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/properties/22.aspx?_method=PUT");
	await client.PostAsync(uri, httpContent);
}

// Upload the new file to a temporary location.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
uri =
	new Uri($"http://localhost/REST/files.aspx");
var uploadedFile = Newtonsoft.Json.JsonConvert.DeserializeObject<UploadInfo>(
	await (await client.PostAsync(uri, new System.Net.Http.StreamContent(localFileToUpload.OpenRead()))).Content.ReadAsStringAsync());

// Ensure the extension is correct.
uploadedFile.Extension = localFileToUpload.Extension.Substring(1);
// Ensure that the name is correct.
uploadedFile.Title = localFileToUpload.Name.Substring(0, 
	localFileToUpload.Name.Length-localFileToUpload.Extension.Length);

// Create the content.
httpContent = new System.Net.Http.StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(new[] { uploadedFile }));

// Add the file.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
await
	client.PostAsync(new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/files/upload.aspx"), httpContent);

// Create the content for the checkin request.
// NOTE: 0 == "CheckedIn" from https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html.
httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"0\" }");

// Check in the object.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PostAsync(new Uri($"http://localhost/REST/objects/0/551/{checkedOutObjectVersion.ObjVer.Version}/checkedout.aspx?_method=PUT"), httpContent)).Content.ReadAsStringAsync());
```

There are a number of endpoints that can be used to add files to an existing object.  The approach above uses the same pattern as creating a new object.
{:.note}

## Removing a file

As with adding a new file to an existing object, it is important to maintain the "single file" property on the object that's being altered.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Create the content for the checkout request.
// NOTE: 2 == "CheckedOutToMe" from https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html.
var httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"2\" }");

// Check out the document with ID 551.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var checkedOutObjectVersion  = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PostAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout.aspx?_method=PUT"), httpContent)).Content.ReadAsStringAsync());

// Create the content for the "Single file" property.
httpContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(new PropertyValue()
{
	PropertyDef = 22, // The built-in "Single file" property.
	TypedValue = new TypedValue()
	{
		DataType = MFDataType.Boolean,
		Value = 1 == checkedOutObjectVersion.Files.Length - 1 // Does it now only have one file?
	}
}));

// Update the property.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
Uri uri =
	new Uri(
		$"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/properties/22.aspx?_method=PUT");
await client.PostAsync(uri, httpContent);

// Delete the first file.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
uri = new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/files/{checkedOutObjectVersion.Files[0].ID}.aspx?_method=DELETE");
await client.PostAsync(uri);

// Create the content for the checkin request.
// NOTE: 0 == "CheckedIn" from https://developer.m-files.com/APIs/REST-API/Reference/enumerations/mfcheckoutstatus.html.
httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"0\" }");

// Check in the object.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
uri = new Uri($"http://localhost/REST/objects/0/551/{checkedOutObjectVersion.ObjVer.Version}/checkedout.aspx?_method=PUT")
Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(await (await client.PostAsync(uri, httpContent)).Content.ReadAsStringAsync());
```

## Tips and Tricks

### .NET

* When using the [downloadable code samples](https://developer.m-files.com/APIs/REST-API/Reference/samples.html), the .NET version includes a set of sample classes for JSON serialization and deserialization (in both `MFWSStructs.cs` and `MFWSStructs (no DataContracts).cs`).  The `Lookup` class has a bug which causes any lookup to incorrectly point to "version 0".  This is most visible when setting the class.  To work around this, either explicitly set the [Version property of the Lookup class](https://developer.m-files.com/APIs/REST-API/Reference/structs/lookup.html) to -1 ("latest version"), or alter the `Lookup` class itself to define the Version property as nullable:

```csharp
/// <summary>
/// Based on M-Files API.
/// </summary>
public class Lookup
{

    /// <summary>
    /// Based on M-Files API.
    /// </summary>
    public bool Deleted { get; set; }

    /// <summary>
    /// Based on M-Files API.
    /// </summary>
    public string DisplayValue { get; set; }

    /// <summary>
    /// Based on M-Files API.
    /// </summary>
    public bool Hidden { get; set; }

    /// <summary>
    /// Based on M-Files API.
    /// </summary>
    public int Item { get; set; }

    /// <summary>
    /// Based on M-Files API.
    /// </summary>
    public int? Version { get; set; }

}
```

* When using the [HttpClient](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx) with .NET, ensure to instantiate the class once and re-use it throughout the lifecycle of the application.  Creating new HttpClient instances can otherwise [exhaust the number of sockets available](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx).

* Using libraries such as [JSON.NET](http://www.newtonsoft.com/json) or [RestSharp](http://restsharp.org/) can simplify interacting with the M-Files Web Service.  Both libraries can easily be installed using [NuGet](https://www.nuget.org/), which is available for Visual Studio 2013 and upwards.

* Failing to set the [UploadInfo](https://developer.m-files.com/APIs/REST-API/Reference/structs/uploadinfo.html)'s Extension property will mean that uploaded files are left with no extension.  Ensure this is set correctly after the temporary upload has completed.

* The .NET [FileInfo.Extension](https://msdn.microsoft.com/en-us/library/system.io.filesysteminfo.extension(v=vs.110).aspx) property includes the period as part of the returned value.  The UploadInfo object expects the file extension without the period.


