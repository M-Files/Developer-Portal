---
layout: page
title: Creating objects with the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Creating objects
redirect_from: /APIs/REST-API/Creating-And-Updating-Objects/
---

This page focuses on creating objects using the REST API.  Details on creating objects using the COM API can be found [in the dedicated page]({{ site.baseurl }}/APIs/COM-API/Creating-Objects/).
{:.note}

To create an object via the M-Files Web Service, make a POST request to [/objects/(type)](http://www.m-files.com/mfws/resources/objects/type.html).  This endpoint takes an [ObjectCreationInfo](http://www.m-files.com/mfws/structs/objectcreationinfo.html) containing information for the new object and returns an [ObjectVersion](http://www.m-files.com/mfws/structs/objectversion.html) representing the newly-created object.

The examples below are written in C# and use objects from the [downloadable code samples](http://www.m-files.com/mfws/samples.html), which contains an `MFWSStructs.cs` file.  This file contains structures that mimic the JSON structures expected by the M-Files Web Service.  These are used to simplify the creation of objects, but are not directly required for use with the Web Service.  Note the bug mentioned in the [tips and tricks](#tips-and-tricks) section below.
{:.note}

The code below uses [JSON.NET](http://www.newtonsoft.com/json) to serialize and deserialize objects into JSON strings.  This library is used simply to keep the code below as clean as possible, and is not required to use the M-Files Web Service.  Some samples in the official documentation use the built-in [DataContractJsonSerializer](https://msdn.microsoft.com/en-us/library/system.runtime.serialization.json.datacontractjsonserializer(v=vs.110).aspx) class, but this can have issues with JSON-formatted dates.
{:.note}

## Creating an object without files (e.g. a non-document object)

To create a non-document object, execute a POST request to [/objects/(type)](http://www.m-files.com/mfws/resources/objects/type.html) with the property values for the new object.

The sample code includes a dummy authentication token.  For more information on authentication, see [Authentication]({{ site.baseurl }}/APIs/REST-API/Authentication/).
{:.note}

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
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var httpResponseMessage = await client.PostAsync(new Uri("http://localhost/REST/objects/" + documentObjectTypeId + ".aspx"), content);

// Extract the value.
var objectVersion = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(await httpResponseMessage.Content.ReadAsStringAsync());

// Output the response.
System.Console.WriteLine("New object Id was: " + objectVersion.ObjVer.ID);
```

The default "Name or Title" property always has the property Id of zero.  However, each class may have the property used for the name or title altered during setup.  Ensure that the property values sent match the expected properties from the class.
{:.note}

### HTTP request

```text
POST http://localhost/REST/objects/0.aspx HTTP/1.1
X-Authentication: DummyAuthenticationToken
Content-Type: application/json; charset=utf-8
Host: localhost
Cookie: ASP.NET_SessionId=3a2wrpaqv42g1qysstp5nmdz
Content-Length: 451
Expect: 100-continue

{
  "PropertyValues": [
    {
      "PropertyDef": 100,
      "TypedValue": {
        "DataType": 9,
        "HasValue": false,
        "Value": null,
        "Lookup": {
          "Deleted": false,
          "DisplayValue": null,
          "Hidden": false,
          "Item": 1,
          "Version": -1
        },
        "Lookups": null,
        "DisplayValue": null,
        "SortingKey": null,
        "SerializedValue": null
      }
    },
    {
      "PropertyDef": 0,
      "TypedValue": {
        "DataType": 1,
        "HasValue": false,
        "Value": "my test document",
        "Lookup": null,
        "Lookups": null,
        "DisplayValue": null,
        "SortingKey": null,
        "SerializedValue": null
      }
    }
  ],
  "Files": null
}
```

### HTTP response

```text
HTTP/1.1 200 OK
Cache-Control: private, must-revalidate, max-age=0
Content-Type: application/json; charset=utf-8
Expires: Wed, 25 Jan 2017 09:44:34 GMT
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains;
Date: Fri, 26 Jan 2018 09:44:34 GMT

{
  "Title": "my test document",
  "EscapedTitleWithID": "my test document (ID 659)",
  "DisplayID": "659",
  "ObjVer": {
    "Version": 1,
    "VersionType": 4,
    "ID": 659,
    "Type": 0
  },
  "Class": 1,
  "CheckedOutAtUtc": "1601-01-01T00:00:00Z",
  "CheckedOutAt": "1601-01-01T00:00:00Z",
  "LastModifiedUtc": "2018-01-26T09:44:33Z",
  "LastModified": "2018-01-26T09:44:33Z",
  "ObjectCheckedOut": false,
  "ObjectCheckedOutToThisUser": false,
  "CheckedOutTo": 0,
  "SingleFile": false,
  "ThisVersionLatestToThisUser": true,
  "CreatedUtc": "2018-01-26T09:44:33Z",
  "Created": "2018-01-26T09:44:33Z",
  "Files": [
  ],
  "VisibleAfterOperation": true,
  "PathInIDView": "0\\0-999\\659\\S\\v1",
  "LastModifiedDisplayValue": "26.1.2018 9.44",
  "CheckedOutAtDisplayValue": "1.1.1601 0.00",
  "CreatedDisplayValue": "26.1.2018 9.44",
  "ObjectVersionFlags": 0,
  "Score": 0,
  "LastAccessedByMe": "2018-01-26T09:44:34Z",
  "AccessedByMeUtc": "2018-01-26T09:44:34Z",
  "AccessedByMe": "2018-01-26T09:44:34Z",
  "ObjectGUID": "{351AD1D3-E1DE-44B3-8002-B31E1628AEB9}",
  "ObjectCapabilityFlags": -1,
  "ObjectFlags": 68,
  "propertyID": 0,
  "BaseProperties": [
  ]
}
```

## Creating an object with files

To create an object with files, the file content must first be `POST`ed to [/files](http://www.m-files.com/mfws/resources/files.html).  The file will be saved into a temporary location on the server and an [UploadInfo](http://www.m-files.com/mfws/structs/uploadinfo.html) returned containing an ID for the temporary file.  During the file creation, these UploadInfo objects are provided as part of the [ObjectCreationInfo](http://www.m-files.com/mfws/structs/objectcreationinfo.html) and the server automatically attaches the temporary files to the new object.

### Uploading files

```csharp
// Create a HttpClient.
var client = new System.Net.Http.HttpClient();

// Authenticate.
client.DefaultRequestHeaders.Add("X-Authentication", "DummyAuthenticationToken");

// Which file do we need to upload?
var localFileToUpload = new System.IO.FileInfo(@"C:\temp\test.txt");

// Upload the file and retrieve the upload information.
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var uploadFileResponse = await client.PostAsync(new Uri("http://localhost/REST/files.aspx"),
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

#### HTTP request

```text
POST http://localhost/REST/files.aspx HTTP/1.1
X-Authentication: DummyAuthenticationToken
Host: localhost
Cookie: ASP.NET_SessionId=tsxugyihuwdyj4vtzalt34je
Content-Length: 27
Expect: 100-continue

This is my sample text file
```

#### HTTP response

```text
HTTP/1.1 200 OK
Cache-Control: private, must-revalidate, max-age=0
Content-Type: application/json; charset=utf-8
Expires: Wed, 25 Jan 2017 10:04:26 GMT
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains;
Date: Fri, 26 Jan 2018 10:04:26 GMT
Content-Length: 48

{
  "UploadID": 1,
  "Size": 27,
  "FileInformationType": 0
}
```

After a file is uploaded to [/files](http://www.m-files.com/mfws/resources/files.html), an [UploadInfo](http://www.m-files.com/mfws/structs/uploadinfo.html) will be returned containing the temporary upload given to the file.  If the Extension property on this object is not correctly set (manually, as above) before creating the new object, then the file will not have an extension when it is saved into M-Files.
{:.note}

### Putting it all together

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
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var uploadFileResponse = await client.PostAsync(new Uri("http://localhost/REST/files.aspx"),
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
// NOTE: http://developer.m-files.com/APIs/REST-API/#iis-compatibility
var createObjectResponse = await client.PostAsync(new Uri("http://localhost/REST/objects/" + documentObjectTypeId + ".aspx"),
	new System.Net.Http.StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(objectCreationInfo), Encoding.UTF8, "application/json"));

// Extract the value.
var objectVersion = Newtonsoft.Json.JsonConvert.DeserializeObject<ObjectVersion>(
	await createObjectResponse.Content.ReadAsStringAsync());

// Output the response.
System.Console.WriteLine("New object Id was: " + objectVersion.ObjVer.ID);
```

#### HTTP request

This shows the HTTP request for the object creation, assuming the file(s) have already been uploaded.
{:.note}

```text
POST http://localhost/REST/objects/0.aspx HTTP/1.1
X-Authentication: DummyAuthenticationToken
Content-Type: application/json; charset=utf-8
Host: localhost
Cookie: ASP.NET_SessionId=tsxugyihuwdyj4vtzalt34je
Content-Length: 504
Expect: 100-continue

{
  "PropertyValues": [
    {
      "PropertyDef": 100,
      "TypedValue": {
        "DataType": 9,
        "HasValue": false,
        "Value": null,
        "Lookup": {
          "Deleted": false,
          "DisplayValue": null,
          "Hidden": false,
          "Item": 1,
          "Version": -1
        },
        "Lookups": null,
        "DisplayValue": null,
        "SortingKey": null,
        "SerializedValue": null
      }
    },
    {
      "PropertyDef": 0,
      "TypedValue": {
        "DataType": 1,
        "HasValue": false,
        "Value": "my test document",
        "Lookup": null,
        "Lookups": null,
        "DisplayValue": null,
        "SortingKey": null,
        "SerializedValue": null
      }
    }
  ],
  "Files": [
    {
      "UploadID": 1,
      "Title": null,
      "Extension": "txt",
      "Size": 27
    }
  ]
}
```

#### HTTP response

This shows the HTTP response for the object creation, assuming the file(s) have already been uploaded.
{:.note}

```text
HTTP/1.1 200 OK
Cache-Control: private, must-revalidate, max-age=0
Content-Type: application/json; charset=utf-8
Expires: Wed, 25 Jan 2017 10:04:27 GMT
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains;
Date: Fri, 26 Jan 2018 10:04:26 GMT
Content-Length: 1435

{
  "Title": "my test document",
  "EscapedTitleWithID": "my test document (ID 663).txt",
  "DisplayID": "663",
  "ObjVer": {
    "Version": 1,
    "VersionType": 4,
    "ID": 663,
    "Type": 0
  },
  "Class": 1,
  "CheckedOutAtUtc": "1601-01-01T00:00:00Z",
  "CheckedOutAt": "1601-01-01T00:00:00Z",
  "LastModifiedUtc": "2018-01-26T10:04:26Z",
  "LastModified": "2018-01-26T10:04:26Z",
  "ObjectCheckedOut": false,
  "ObjectCheckedOutToThisUser": false,
  "CheckedOutTo": 0,
  "SingleFile": true,
  "ThisVersionLatestToThisUser": true,
  "CreatedUtc": "2018-01-26T10:04:26Z",
  "Created": "2018-01-26T10:04:26Z",
  "Files": [
    {
      "Name": "my test document",
      "EscapedName": "my test document.txt",
      "Extension": "txt",
      "Size": 27,
      "LastModified": "2018-01-26T10:04:26Z",
      "ChangeTimeUtc": "2018-01-26T10:04:26Z",
      "ChangeTime": "2018-01-26T10:04:26Z",
      "CreatedUtc": "2018-01-26T10:04:26Z",
      "CreatedDisplayValue": "26.1.2018 10.04",
      "LastModifiedDisplayValue": "26.1.2018 10.04",
      "FileGUID": "{EA17457E-7F7B-48F2-BB4C-3E0E0E2900EF}",
      "ID": 678,
      "Version": 1,
      "FileVersionType": 3
    }
  ],
  "VisibleAfterOperation": true,
  "PathInIDView": "0\\0-999\\663\\S\\v1",
  "LastModifiedDisplayValue": "26.1.2018 10.04",
  "CheckedOutAtDisplayValue": "1.1.1601 0.00",
  "CreatedDisplayValue": "26.1.2018 10.04",
  "ObjectVersionFlags": 0,
  "Score": 0,
  "LastAccessedByMe": "2018-01-26T10:04:26Z",
  "AccessedByMeUtc": "2018-01-26T10:04:26Z",
  "AccessedByMe": "2018-01-26T10:04:26Z",
  "ObjectGUID": "{6FA5C6C4-FDDA-44C8-8DFB-4948082F3829}",
  "ObjectCapabilityFlags": -1,
  "ObjectFlags": 68,
  "propertyID": 0,
  "BaseProperties": []
}
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


