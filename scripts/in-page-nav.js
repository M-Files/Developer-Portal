(function($){
    $(document).ready(function(){
        // Get a reference to all the page headings.
        var $ul = $("<ul></ul>");
        var $headings = $("h2, h3, h4", $("article.page"));

        // If there are none then die now (show no in-page-nav).
        if(0 == $headings.length)
			return;
		
        $headings.each(function(i, o)
        {
            var $heading = $(this);
			
			var $anchor = $("<a></a>")
				.attr("href", "#" + $heading.attr("id"))
				.addClass("public-anchor")
				.append($("<i class='zmdi zmdi-link'></i>"));
			$heading.append($anchor);
        });

    });
})(jQuery);