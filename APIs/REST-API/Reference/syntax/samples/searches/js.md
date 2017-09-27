```javascript
// Quick search for "specification"
$.get( "http://example.org/REST/objects.aspx?q=specification", callback, "json" );

// Quick search for "web service"
$.get( "http://example.org/REST/objects.aspx?q=web service", callback, "json" );

// Objects where the title contains "m-files"
$.get( "http://example.org/REST/objects.aspx?p0*=m-files", callback, "json" );

// Deleted documents (Object type ID 0).
$.get( "http://example.org/REST/objects.aspx?d=true&o=0", callback, "json" );

// Quick search for "web service". Also include deleted objects.
$.get( "http://example.org/REST/objects.aspx?q=web service&d=include", callback, "json" );

// Note: Searching by external ID can be done with direct object reference.
// Customer with object ID "123A"
$.get( "http://example.org/REST/objects/136/e123A.aspx", callback, "json" );
```