$(function () {

    $('input#search').addClass('btn');
    $('input#highlight').attr('checked', 'true');

    // Remove currently click handlers for the search button
    $('input#search').off('click');

    // Add a new click handler for the search button, so we can add the button class to the results
    $('input#search').on('click', function () {
        btnSearch_onclick();
        $('table.searchresults a').addClass('btn');
    });

    $('div#divResults').on("click", "a", function (event) {
        event.preventDefault();

        showSearchResult($(this).attr('href'));

        var webframe = window.parent.parent;
        webframe.postMessage("closeNavigationPane", "*");

        return false;
    });

});