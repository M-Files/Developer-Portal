(function($){
    var $document = $(document);
    var $body = $("body");
    var $expandCollapseIcon = $("<i class='zmdi expandCollapseIcon'></i>");
    function expandCollapse($node)
    {
        $node.toggleClass("expanded");
    }
    function setupNode($node)
    {
        var $icon = $expandCollapseIcon.clone();
        $node.append($icon);
        $icon.click(function()
        {
            expandCollapse($node);
            return false;
        })
    }
    $("ul.treeview li").each(function(i, o)
    {
        var $li = $(this);
        if($(">ul", $li).length > 0)
        {
            setupNode($li);
        }
    });

    // Get the links in the treeview.
    var $navLinks = $("li a", "ul.treeview");

    // When one is clicked, highlight it.
    function highlightLink(i, o)
    {
        // Unhighlight any existing ones.
        console.log($navLinks.filter(".current"));
        $navLinks.filter(".current").removeClass("current");

        // Highlight the clicked one.
        $(this).addClass("current").parents("li").addClass("expanded");
        return true;
    }
    $navLinks.click(highlightLink);

    // Highlight the current page.
    var currentPageAddress = window.location.pathname;
    $($navLinks).filter("a[href='" + currentPageAddress + "']").each(highlightLink);

})(jQuery);