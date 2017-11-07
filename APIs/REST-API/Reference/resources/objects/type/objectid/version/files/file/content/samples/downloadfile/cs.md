```csharp
public string DownloadFile( int type, int id, int version, int fileid )
{
    // Construct the URL by filling type, id, version and file id.
    string url = string.Format(
        "http://example.org/REST/objects/{0}/{1}/{2}/files/{3}/content",
        type, id, version, fileid );

    // Create the web request.
    WebRequest request = WebRequest.Create( url );

    // Fill the authentication information.
    request.Headers["X-Authentication"] = this.AuthenticationToken;

    // Receive the response.
    var response = request.GetResponse();

    return new StreamReader( response.GetResponseStream() ).ReadToEnd();
}
```