```csharp
using System;
using System.Net;

// Requires reference to Systme.Runtime.Serialization assembly.
using System.Runtime.Serialization.Json;

// See the 'Sample code' for a package containing the struct definitions.
using MFiles.Mfws.Structs;

public class AuthenticationSample
{
	public static string Authenticate( string username, string password, string vaultGuid )
	{
		// Create the authentication details.
		var auth = new Authentication
		{
			Username = username,
			Password = password,
			WindowsUser = false,  // Change to 'true' if using Windows-credentials.
			VaultGuid = vaultGuid  // Use GUID format with {braces}.
		};

		// Create the web request.
		var request = WebRequest.Create( "http://example.org/REST/server/authenticationtokens" );
		request.Method = "POST";

		// Serialize the authentication details into the request.
		var serializer = new DataContractJsonSerializer( typeof( Authentication ) );
		serializer.WriteObject( request.GetRequestStream(), auth );

		// Get the response.
		var response = request.GetResponse();

		// Deserialize the authentication token.
		var deserializer = new DataContractJsonSerializer( typeof( PrimitiveType<string> ) );
		var token = (PrimitiveType<string>) deserializer.ReadObject( response.GetResponseStream() );

		// Return the token to the caller for future requests.
		Console.WriteLine( token.Value );
		return token.Value;
	}
}
```