---
layout: page
title: Creating and updating objects via the M-Files Web Service
includeInSearch: true
---

To create an object via the M-Files Web Service, make a POST request to [/objects/(type)](http://www.m-files.com/mfws/resources/objects/type.html).  This endpoint takes an [ObjectCreationInfo](http://www.m-files.com/mfws/structs/objectcreationinfo.html) containing information for the new object and returns an [ObjectVersion](http://www.m-files.com/mfws/structs/objectversion.html) representing the newly-created object.

The examples below are written in C# and use objects from the [downloadable code samples](http://www.m-files.com/mfws/samples.html), which contains an `MFWSStructs.cs` file.  This file contains structures that mimic the JSON structures expected by the M-Files Web Service.  These are used to simplify the creation of objects, but are not directly required for use with the Web Service.  Note the bug mentioned in the [tips and tricks](#tips-and-tricks) section below.

<p class="note">The code below uses <a href="http://www.newtonsoft.com/json">JSON.NET</a> to serialize and deserialize objects into JSON strings.  This library is used simply to keep the code below as clean as possible, and is not required to use the M-Files Web Service.  Some samples in the official documentation use the built-in <a href="https://msdn.microsoft.com/en-us/library/system.runtime.serialization.json.datacontractjsonserializer(v=vs.110).aspx">DataContractJsonSerializer</a> class, but this can have issues with JSON-formatted dates.</p>

## Creating objects

### Creating an object without files (e.g. a non-document object)

To create a non-document object, execute a POST request to [/objects/(type)](http://www.m-files.com/mfws/resources/objects/type.html) with the property values for the new object.

<p class="note">The sample code includes a dummy authentication token.  For more information on authentication, see <a href="{{ site.baseurl }}/APIs/REST-API/Authentication/">Authentication</a>.</p>

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate using a token that we already have (not shown here).
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");
			
// Build up information for the new object.
// Note: all mandatory properties must be set, but this is likely to be, at a minimum,
// the class (property 100) and the name or title (typically property 0).
var objectCreationInfo = new ObjectCreationInfo()
{
	PropertyValues = new []
	{
		new PropertyValue()
		{
			PropertyDef = 100, // The built-in "Class" property Id.
			TypedValue = new TypedValue()
			{
				DataType = MFDataType.Lookup,
				Lookup = new Lookup()
				{
					Item = 1, // The built-in "Other Document" class Id.
					Version = -1 // Work around the bug detailed below.
				}
			}
		},
		new PropertyValue()
		{
			PropertyDef = 0, // The built-in "Name or Title" property Id.
			TypedValue =  new TypedValue()
			{
				DataType = MFDataType.Text,
				Value = "my test document"
			}
		}
	}
};

// Serialise using JSON.NET (use Nuget to add a reference if needed).
var stringContent = Newtonsoft.Json.JsonConvert.SerializeObject(objectCreationInfo);

// Create the content for the web request.
var content = new System.Net.Http.StringContent(stringContent, Encoding.UTF8, "application/json");

// We are creating a document (multi-file-document with no files).
const int documentObjectTypeId = 0; //

// Execute the POST.
var httpResponseMessage = await client.PostAsync(new Uri("http://localhost/REST/objects/" + documentObjectTypeId), content);

// Extract the value.
var objectVersion = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(await httpResponseMessage.Content.ReadAsStringAsync());

// Output the response.
System.Console.WriteLine("New object Id was: " + objectVersion.ObjVer.ID);
```

<p class="note">The default "Name or Title" property always has the property Id of zero.  However, each class may have the property used for the name or title altered during setup.  Ensure that the property values sent match the expected properties from the class.</p>

### Creating an object with files

To create an object with files, the file content must first be `POST`ed to [/files](http://www.m-files.com/mfws/resources/files.html).  The file will be saved into a temporary location on the server and an [UploadInfo](http://www.m-files.com/mfws/structs/uploadinfo.html) returned containing an ID for the temporary file.  During the file creation, these UploadInfo objects are provided as part of the [ObjectCreationInfo](http://www.m-files.com/mfws/structs/objectcreationinfo.html) and the server automatically attaches the temporary files to the new object.

#### Uploading files

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Upload the file and retrieve the upload information.
var uploadFileResponse = await client.PostAsync(new Uri("http://localhost/REST/files/"),
	new System.Net.Http.StreamContent(localFileToUpload.OpenRead()));
			
// Extract the value.
var uploadInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<UploadInfo>(
	await uploadFileResponse.Content.ReadAsStringAsync());

// Ensure the extension is set.
// NOTE: This must be without the dot!
uploadInfo.Extension = localFileToUpload.Extension.Substring(1);

// Add the upload to the objectCreationInfo.
var objectCreationInfo = new ObjectCreationInfo()
{
	PropertyValues = new PropertyValue[]
	{
		// ...
	}
};
objectCreationInfo.Files = new UploadInfo[]
{
    uploadInfo
};
```

<p class="note">After a file is uploaded to <a href="http://www.m-files.com/mfws/resources/files.html">/files</a>, an <a href="http://www.m-files.com/mfws/structs/uploadinfo.html">UploadInfo</a> will be returned containing the temporary upload given to the file.  If the Extension property on this object is not correctly set (manually, as above) before creating the new object, then the file will not have an extension when it is saved into M-Files.</p>

#### Putting it all together

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Build up information for the new object.
var objectCreationInfo = new ObjectCreationInfo()
{
	PropertyValues = new[]
	{
		new PropertyValue()
		{
			PropertyDef = 100, // The built-in "Class" property Id.
			TypedValue = new TypedValue()
			{
				DataType = MFDataType.Lookup,
				Lookup = new Lookup()
				{
					Item = 1, // The built-in "Other Document" class Id.
					Version = -1 // Work around the bug detailed below.
				}
			}
		},
		new PropertyValue()
		{
			PropertyDef = 0, // The built-in "Name or Title" property Id.
			TypedValue = new TypedValue()
			{
				DataType = MFDataType.Text,
				Value = "my test document"
			}
		}
	}
};

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Upload the file and retrieve the upload information.
var uploadFileResponse = await client.PostAsync(new Uri("http://localhost/REST/files/"),
	new System.Net.Http.StreamContent(localFileToUpload.OpenRead()));
			
// Extract the value.
var uploadInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<UploadInfo>(
	await uploadFileResponse.Content.ReadAsStringAsync());

// Ensure the extension is set.
// NOTE: This must be without the dot!
uploadInfo.Extension = localFileToUpload.Extension.Substring(1);

// Add the upload to the objectCreationInfo.
objectCreationInfo.Files = new[] { uploadInfo };

// What type of object are we creating?
const int documentObjectTypeId = 0;

// Execute the post.
var createObjectResponse = await client.PostAsync(new Uri("http://localhost/REST/objects/" + documentObjectTypeId),
	new System.Net.Http.StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(objectCreationInfo), Encoding.UTF8, "application/json"));

// Extract the value.
var objectVersion = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await createObjectResponse.Content.ReadAsStringAsync());

// Output the response.
System.Console.WriteLine("New object Id was: " + objectVersion.ObjVer.ID);
```

## Updating existing objects

Objects can be found and modified using endpoints underneath the [object's version endpoint](http://www.m-files.com/mfws/resources/objects/type/objectid/version.html).  Each object within M-Files is automatically versioned as it is changed by users or the M-Files system itself.  The object version endpoint represents a specific version of the object within the vault.  For example, `/objects/0/123/1` represents version 1 of a document with ID 123, and `/objects/0/456/2` represents version 2 of a document with ID 456.  The latest version of an object can always be found by replacing the `version` element of the endpoint address with the string `latest`.  For example: `/objects/0/789/latest` always refers to the latest version of an object, even as the object is changed by others within the M-Files vault.

### Setting a property value

Properties for an object can be altered en-masse by making a `POST` or `PUT` request to [/objects/(type)/(objectid)/(version)/properties](http://www.m-files.com/mfws/resources/objects/type/objectid/version/properties.html).  Note that a `POST` request can be used to add specific properties to an object, whereas a `PUT` request must always include all object properties, as those not included will be removed from the object.

A specific property can be added, updated, or removed from an object by using the [/objects/(type)/(objectid)/(version)/properties/(id)](http://www.m-files.com/mfws/resources/objects/type/objectid/version/properties/id.html) endpoint.  In addition, some other endpoints exist (e.g. [/objects/(type)/(objectid)/(version)/properties/comments](http://www.m-files.com/mfws/resources/objects/type/objectid/version/comments.html), [/objects/(type)/(objectid)/(version)/properties/title](http://www.m-files.com/mfws/resources/objects/type/objectid/version/title.html), and [/objects/(type)/(objectid)/(version)/properties/workflowstate](http://www.m-files.com/mfws/resources/objects/type/objectid/version/workflowstate.html)) that allow specific M-Files properties to be updated.

<p class="note">Updating properties still requires the object to be checked out.  The general process should be: check out, update object, check in.  Some endpoints will automatically do this in the background (e.g. <a href="http://www.m-files.com/mfws/resources/objects/type/objectid/version/comments.html">/objects/(type)/(objectid)/(version)/properties/comments</a>), but these will be detailed in the documentation.</p>

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Add a comment to the document with ID 459.
await client.PutAsync(new Uri("http://localhost/REST/objects/0/459/latest/comments"),
	new System.Net.Http.StringContent("{ \"Value\" : \"This is a test comment \"}"));
```

### Updating an existing file

Updating an existing file typically involves a number of steps:

1. [Checking out the existing object](http://www.m-files.com/mfws/resources/objects/type/objectid/version/checkedout.html).
2. Executing a PUT request to [replace the existing file content](http://www.m-files.com/mfws/resources/objects/type/objectid/version/files/file/content.html).
3. [Checking in the existing object](http://www.m-files.com/mfws/resources/objects/type/objectid/version/checkedout.html).

In the sample below we check out a document (object type 0) with ID 551, then replace the content of the file with a file from the local hard disk, then check it in again.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Create the content for the checkout request.
// NOTE: 2 == "CheckedOutToMe" from http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html.
var httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"2\" }");

// Check out the document with ID 551.
var checkedOutObjectVersion  = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PutAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout"), httpContent)).Content.ReadAsStringAsync());

// Upload the file.
var uri =
	new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/files/{checkedOutObjectVersion.Files[0].ID}/content");
await client.PutAsync(uri, new System.Net.Http.StreamContent(localFileToUpload.OpenRead()));

// Create the content for the checkin request.
// NOTE: 0 == "CheckedIn" from http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html.
httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"0\" }");

// Check in the object.
Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PutAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout"), httpContent)).Content.ReadAsStringAsync());
```

<p class="note">The <a href="http://www.m-files.com/mfws/resources/objects/type/objectid/version/checkedout.html">check out status endpoint documentation</a> states that the PUT request takes an <a href="http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html">MFCheckOutStatus</a> as an input, but this must be wrapped in a <a href="http://www.m-files.com/mfws/structs/primitivetypet.html">PrimitiveType</a>; this is the reason that the JSON for the checkout/checkin requests contains the "Value" element and not just the check in enum value.</p>


### Adding a new file to an existing object

Adding a new file to an existing object is similar to replacing the content of an existing file: the object must be checked out, the file added, then checked in again.  There are, however, two additional situations that may need to be considered:

* If a file is being added to an object which is not a document ([see "Creating a New Object Type"](http://www.m-files.com/user-guide/latest/eng/#New_object_type.html)) then the object type must support having files.  If not then the request will fail.

* If a file is being added to an existing document, then the document may need to be converted to a [Multi-File Document (MFD)](http://www.m-files.com/user-guide/latest/eng/#MFD_SFD.html) as part of the process.  Whether a document is a Multi-File-Document can be found either by checking the [ObjectVersion](http://www.m-files.com/mfws/structs/objectversion.html) (the "SingleFile" property will be true), or by checking the value of property 22 ("Single file").  This is a built-in property.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication",
	"DummyAuthenticationToken");

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Create the content for the checkout request.
// NOTE: 2 == "CheckedOutToMe" from http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html.
var httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"2\" }");

// Check out the document with ID 551.
var checkedOutObjectVersion  = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PutAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout"), httpContent)).Content.ReadAsStringAsync());

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
	uri =
		new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/properties/22");
	await client.PutAsync(uri, httpContent);
}

// Upload the new file to a temporary location.
uri =
	new Uri($"http://localhost/REST/files");
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
await
	client.PostAsync(new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/files/upload"), httpContent);

// Create the content for the checkin request.
// NOTE: 0 == "CheckedIn" from http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html.
httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"0\" }");

// Check in the object.
Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PutAsync(new Uri($"http://localhost/REST/objects/0/551/{checkedOutObjectVersion.ObjVer.Version}/checkedout"), httpContent)).Content.ReadAsStringAsync());
```

<p class="note">There are a number of endpoints that can be used to add files to an existing object.  The approach above uses the same pattern as creating a new object.</p>

### Removing a file

As with adding a new file to an existing object, it is important to maintain the "single file" property on the object that's being altered.

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Create the content for the checkout request.
// NOTE: 2 == "CheckedOutToMe" from http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html.
var httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"2\" }");

// Check out the document with ID 551.
var checkedOutObjectVersion  = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await (await client.PutAsync(new Uri("http://localhost/REST/objects/0/551/latest/checkedout"), httpContent)).Content.ReadAsStringAsync());

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
Uri uri =
	new Uri(
		$"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/properties/22");
await client.PutAsync(uri, httpContent);

// Delete the first file.
uri = new Uri($"http://localhost/REST/objects/0/{checkedOutObjectVersion.ObjVer.ID}/{checkedOutObjectVersion.ObjVer.Version}/files/{checkedOutObjectVersion.Files[0].ID}");
await client.DeleteAsync(uri);

// Create the content for the checkin request.
// NOTE: 0 == "CheckedIn" from http://www.m-files.com/mfws/enumerations/mfcheckoutstatus.html.
httpContent = new System.Net.Http.StringContent("{ \"Value\" : \"0\" }");

// Check in the object.
uri = new Uri($"http://localhost/REST/objects/0/551/{checkedOutObjectVersion.ObjVer.Version}/checkedout")
Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(await (await client.PutAsync(uri, httpContent)).Content.ReadAsStringAsync());
```

## Tips and Tricks

### .NET

* When using the [downloadable code samples](http://www.m-files.com/mfws/samples.html), the .NET version includes a set of sample classes for JSON serialization and deserialization (in both `MFWSStructs.cs` and `MFWSStructs (no DataContracts).cs`).  The `Lookup` class has a bug which causes any lookup to incorrectly point to "version 0".  This is most visible when setting the class.  To work around this, either explicitly set the [Version property of the Lookup class](http://www.m-files.com/mfws/structs/lookup.html) to -1 ("latest version"), or alter the `Lookup` class itself to define the Version property as nullable:

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

* Failing to set the [UploadInfo](http://www.m-files.com/mfws/structs/uploadinfo.html)'s Extension property will mean that uploaded files are left with no extension.  Ensure this is set correctly after the temporary upload has completed.

* The .NET [FileInfo.Extension](https://msdn.microsoft.com/en-us/library/system.io.filesysteminfo.extension(v=vs.110).aspx) property includes the period as part of the returned value.  The UploadInfo object expects the file extension without the period.


