```javascript
var getRootItems = function () {

    // Post the object data.
    $.ajax({
        url: "http://example.org/REST/views/items.aspx",
        type: "GET",
        dataType: "json",
        success: processView
    });
};

var processView = function (folderContents) {
    $.each( folderContents, function (i, item) {

        // Ignore this if the item is not a view.
        if( item.FolderContentItemType !== 1 ) return;

        alert( item.View.Name );
    });
};
```