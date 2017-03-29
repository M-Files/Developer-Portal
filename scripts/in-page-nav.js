$(document).ready(function(){

    var $ul = $("<ul></ul>");
    var $headings = $("h2, h3, h4", $("article.page"));

    if(0 == $headings.length)
        return;
    
    var headingLookups = [];
    $headings.each(function(i, o)
    {
        var $heading = $(this);
        var $li = $("<li></li>")
            .addClass($heading.get(0).nodeName.toLowerCase())
            .append($("<a></a>").attr("href", "#" + $heading.attr("id")).text($heading.text()));
        $ul.append($li);

        headingLookups.push({
            index: i,
            heading: $heading,
            offset: $heading.offset().top,
            listItem: $li
        })
    });

    function reCalculateHeadingOffsets(){
        $.each(headingLookups, function(i, o)
        {
            o.offset = o.heading.offset().top;
        })
    }
    $(window).resize(reCalculateHeadingOffsets);

    $("BODY")
        .addClass("has-in-page-nav")
        .append($("<div></div>")
        .attr("id", "in-page-nav")
        .append($ul));

    var previouslySelected = null;
    $(document).on("scroll", function(){

        // Go through headings and find the one we're scrolled to.
        var lookup = null;
        var position = $(document).scrollTop();
        for(var i=0; i<headingLookups.length; i++)
        {
            if(position <= headingLookups[i].offset)
            {
                lookup = headingLookups[i];
                break;
            }
        }

        // Remove any active nav items.
        if(null != previouslySelected)
        {
            previouslySelected[0].removeClass("in-page-nav-active");
            previouslySelected[1].removeClass("in-page-nav-active");
        }

        // If nothing to select then die.
        if(null == lookup)
        {
            previouslySelected = null;
            return;
        }

        // Set the current active flag.
        lookup.listItem.addClass("in-page-nav-active");
        lookup.heading.addClass("in-page-nav-active");
        previouslySelected = [lookup.listItem, lookup.heading];

    })
    $(document).scroll();

});
