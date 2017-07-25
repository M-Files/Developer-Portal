(function($){
    $(document).ready(function(){
        // Get a reference to all the page headings.
        var $ul = $("<ul></ul>");
        var $headings = $("h2, h3, h4", $("article.page"));

        // If there are none then die now (show no in-page-nav).
        if(0 == $headings.length)
            return;
        
        // Get references to the individual headings (so we can scroll to them),
        // and create links to each of them in memory for the navigation.
        var headingLookups = [];
        $headings.each(function(i, o)
        {
            var $heading = $(this);
            var $li = $("<li></li>")
                .addClass($heading.get(0).nodeName.toLowerCase())
                .append($("<a></a>").attr("href", "#" + $heading.attr("id")).text($heading.text()));
            $ul.append($li);
			
			var $anchor = $("<a></a>")
				.attr("href", "#" + $heading.attr("id"))
				.addClass("public-anchor")
				.append($("<i class='zmdi zmdi-link'></i>"));
			$heading.append($anchor);
        });

		// Create the expand/collapse bits.
		var $expandCollapse = $("<div></div>").addClass("expand-collapse");
		$expandCollapse.append($('<div class="expand">Show in-page links <i class="zmdi zmdi-long-arrow-up"></i></div>'));
		$expandCollapse.append($('<div class="collapse">Hide in-page links <i class="zmdi zmdi-long-arrow-down"></i></div>'));
		$expandCollapse.click(function(){
			$("BODY #in-page-nav").toggleClass("open");
		});

        // Append the navigation to the page.
        $("BODY")
            .addClass("has-in-page-nav")
            .append($("<div></div>")
            .attr("id", "in-page-nav")
			.append($expandCollapse)
            .append($ul));
		
		// When an in-page-nav link is clicked, collapse the nav (if on this breakpoint).
		$("BODY #in-page-nav a").click(function(){
			$("BODY #in-page-nav").removeClass("open");
		});

		// When the user presses esc, close the in-page nav.
		$("BODY").on("keyup", function(e)
		{
			if(e.keyCode == 27)
			{
				$("BODY #in-page-nav").removeClass("open");
			}
		});

		// Close the in-page nav when article is clicked.
		$("article.page").click(function()
		{
			$("BODY #in-page-nav").removeClass("open");
		})

    });
})(jQuery);