```javascript
var checkOut = function (type, id, version) {

    // Construct the URL.
    // .../REST/objects/(type)/(id)/(version)/checkedout?_method=PUT
    var url = "http://example.org/REST/objects/" +
              [type, id, version].join("/") +
              "/checkedout.aspx?_method=PUT";

    // Request an encrypted token with the login information.
    $.ajax({
        url: url, type: "POST", dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ Value: 2 /* Checked out to me */ }),
        success: modifyObject
    });
};

var modifyObject = function (objectVersion) {
    // Object is checked out.
};
```