```csharp
public ObjectVersion[] GetObjectVersion( string searchTerm )
{
    // Construct the URL by filling type, id and version.
    string url = string.Format("http://example.org/REST/objects?q={0}", searchTerm );

    // Create the web request.
    WebRequest request = WebRequest.Create( url );

    // Fill the authentication information.
    request.Headers["X-Authentication"] = this.AuthenticationToken;

    // Receive the response.
    var response = request.GetResponse();

    // Use DataContractJsonSerializer to deserialize the JSON formatted
    // ObjectVersion information from the response stream.
    var serializer = new DataContractJsonSerializer( typeof( Results<ObjectVersion> ) );
    var results = (Results<ObjectVersion>)serializer.ReadObject( response.GetResponseStream() );

    return results.Items;
}
```