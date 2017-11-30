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
        // Highlight the clicked one.
        $($(this).parents("li").addClass("expanded").get(0)).addClass("current");
        return true;
    }

    // Highlight the current page.
	var currentPageAddress = window.location.pathname;
	
	$document.ready(function(){
		$($navLinks).filter("a[href='" + currentPageAddress + "']").each(highlightLink);
	})

})(jQuery);