(function($){
    var $body = $("body");

    // Opens the sidebar.
    function openSidebar()
    {
        // Show the sidebar.
        $body.addClass("sidebar-expanded");

        // Update the hash (add an entry to the history).
        window.location.hash = "#menu";
    }

    // Closes the sidebar.
    function closeSidebar()
    {
        // Hide the sidebar.
        $body.removeClass("sidebar-expanded");

        // If the hash is showing "menu", we can go back in the history to close it.
        if(window.location.hash == "#menu")
        {
            history.back();
        }
    }

    // When the user clicks the body, close the sidebar.
    $body.click(closeSidebar);
    // When the user presses esc, close the sidebar
    $body.onkeyup(function(e)
    {
        if(e.keyCode == 27)
        {
            closeSidebar();
        }
    });

    // When the sidebar icon is clicked, toggle the expanded sidebar.
    $("#hamburger").click(function(){

        // If the sidebar is not shown shown...
        if(false == $body.hasClass("sidebar-expanded"))
        {
            // Open the sidebar.
            openSidebar();
        }
        else
        {
            // Close the sidebar.
            closeSidebar();
        }

        return false;
    });

})(jQuery);