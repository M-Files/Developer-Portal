```csharp
using System;
using System.Net;
using System.Runtime.Serialization.Json;
using MFiles.Mfws.Structs;

public class CreationSample
{
	public static ObjectVersion CreateObject( string authToken )
	{
		// Create the object creation info.
		var creationInfo = new ObjectCreationInfo
		{
			PropertyValues = new[]
			{
				new PropertyValue
				{
					PropertyDef = 0,
					TypedValue = new TypedValue { DataType = MFDataType.Text, Value = "Invoice" }
				},
				new PropertyValue
				{
					PropertyDef = 22,
					TypedValue = new TypedValue { DataType = MFDataType.Boolean, Value = false }
				},
				new PropertyValue
				{
					PropertyDef = 100,
					TypedValue = new TypedValue
					{
						DataType = MFDataType.Lookup,
						Lookup = new Lookup { Item = 0 }
					}
				}
			}
		};

		// Create the web request.
		var request = WebRequest.Create("http://example.org/REST/objects/0");
		request.Headers[ "X-Authentication" ] = authToken;
		request.Method = "POST";

		// Serialize the authentication details into the request.
		var serializer = new DataContractJsonSerializer(typeof (ObjectCreationInfo));
		serializer.WriteObject(request.GetRequestStream(), creationInfo);

		// Get the response.
		var response = request.GetResponse();

		// Deserialize the information on the created object.
		var deserializer = new DataContractJsonSerializer(typeof (ObjectVersion));
		var createdObject = (ObjectVersion) deserializer.ReadObject( response.GetResponseStream() );

		// Return the created object.
		Console.WriteLine(createdObject.Title);
		return createdObject;
	}
}
```