```javascript
var createObject = function () {

    // Post the object data.
    $.ajax({
        url: "http://example.org/REST/objects/0.aspx",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            PropertyValues: [{
                    // Document name
                    PropertyDef: 0,
                    TypedValue: { DataType: 1, Value: "Invoice" }
                }, {
                    // "Single File" property
                    PropertyDef: 22,
                    TypedValue: { DataType: 8, Value: false }
                }, {
                    // Class.
                    PropertyDef: 100,
                    TypedValue: { DataType: 9, Lookup: { Item: 0 } }
                }],
            Files: []
        }),
        success: processDocument
    });
};

var processDocument = function (objectVersion) {
    alert( objectversion.Title + " created successfully." );
};
```