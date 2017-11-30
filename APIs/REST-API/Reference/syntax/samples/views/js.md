```javascript
// Root: views/items
$.get( "http://example.org/REST/views/items.aspx", callback, "json" );

// "1. Documents" view of Sample vault.
$.get( "http://example.org/REST/views/V133/items.aspx", callback, "json" );

// "1. Documents\By Customer\ESTT Corporation (IT)" of Sample vault.
$.get( "http://example.org/REST/views/V133/V136/L141/items.aspx", callback, "json" );

// "By Keyword\MFWA / MFWS" view (View ID 123)
$.get( "http://example.org/REST/views/V123/TMFWA&2520%252F%2520MFWS/items.aspx", callback, "json" );
// or
$.get( "http://example.org/REST/views/V123/TMFWA %252F MFWS/items.aspx", callback, "json" );
```