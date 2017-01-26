(function(){
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
    })
})();