```csharp
using System;
using System.Net;
using System.Runtime.Serialization.Json;
using MFiles.Mfws.Structs;

public class CheckOutSample
{
	public static void CheckOut( string authToken, int type, int id, int version )
	{
		// Create the web request.
		// Use the _method parameter to tunnel PUT through POST.
		var url = string.Format(
			"http://example.org/REST/objects/{0}/{1}/{2}/checkedout?_method=PUT",
			type, id, version );

		var request = WebRequest.Create( url );
		request.Headers[ "X-Authentication" ] = authToken;
		request.Method = "POST";

		// Serialize the authentication details into the request.
		var status = new PrimitiveType<MFCheckOutStatus> { Value = MFCheckOutStatus.CheckedOutToMe };
		var serializer = new DataContractJsonSerializer( status.GetType() );
		serializer.WriteObject( request.GetRequestStream(), status );

		var response = request.GetResponse();

		var deserializer = new DataContractJsonSerializer( typeof( ObjectVersion ) );
		var result = (ObjectVersion) deserializer.ReadObject( response.GetResponseStream() );

		Console.WriteLine( result.Title );
	}
}
```