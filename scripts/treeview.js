(function($){
    var $document = $(document);
	var $body = $("body");
	// This has to have the svg here as it gets swapped out otherwise and the later click handlers don't fire.
    var $expandCollapseIcon = $('<svg class="iconify expandCollapseIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42z" fill="white"/></svg>');
    function expandCollapse($node)
    {
        $node.toggleClass("expanded");
    }
    function setupNode($node)
    {
        var $icon = $expandCollapseIcon.clone();
        $node.prepend($icon);
        $icon.click(function()
        {
            expandCollapse($node);
            return false;
		});
		var $anchor = $(">a", $node);
		if($anchor.attr("href") == "#")
		{
			$anchor.click(function()
			{
				expandCollapse($node);
				return false;
			})
		}
    }
    $("ul.treeview li").each(function(i, o)
    {
        var $li = $(this);
        if($(">ul", $li).length > 0)
        {
            setupNode($li);
        }
    });

})(jQuery);