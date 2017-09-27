```csharp
using System;
using System.Net;
using System.Runtime.Serialization.Json;
using MFiles.Mfws.Structs;

public class RootViewSample
{
	public static void GetRootView( string authToken )
	{
		// Create the web request.
		var request = WebRequest.Create( "http://example.org/REST/views/items" );
		request.Headers[ "X-Authentication" ] = authToken;

		// Get the response.
		var response = request.GetResponse();

		// Deserialize the view.
		var deserializer = new DataContractJsonSerializer( typeof( FolderContentItems ) );
		var result = (FolderContentItems) deserializer.ReadObject( response.GetResponseStream() );

		foreach( var folderItem in result.Items )
		{
			if( folderItem.FolderContentItemType == MFFolderContentItemType.ViewFolder )
				Console.WriteLine( folderItem.View.Name );
		}
	}
}
```