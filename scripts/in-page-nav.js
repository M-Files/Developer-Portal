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

		var $inPageNavItems = $("#in-page-nav > ul li a");
		var pairs = [];
		function recalculateNavItemLocations()
		{
			// Reset the collection.
			pairs = [];

			// Any offset to add?
			var offset = $(window).scrollTop();

			// Iterate over the links and find their current offset.
			$inPageNavItems.each(function(i, o)
			{
				var $navItem = $(this);
				// Find the heading for the nav item.
				var heading = $headings.filter($navItem.attr("href"))[0];

				// Push the pair to the collection.
				pairs.push({ 
					navItem: $navItem,
					offset: parseInt(heading.getBoundingClientRect().top) + offset
				});
				// console.log($navItem.text() + " = " + pairs[pairs.length-1].offset);
				
				// Ensure the array is sorted largest offset to smallest.
				pairs.sort(function(a, b){
					return b.offset - a.offset;
				})
			})
		};

		// Set up recalculation to run on window resize.
		$(window).resize(recalculateNavItemLocations);

		// Calculate now.
		recalculateNavItemLocations();

		var $selectedNavItem = null;
		function selectInPageNavItem()
		{
			// Deselect any existing selected ones.
			if($selectedNavItem != null)
			{
				$selectedNavItem.removeClass("current");
				$selectedNavItem = null;
			}

			// Find one to select.
			var scrollOffset = $(window).scrollTop() + 5;
			$.each(pairs, function(i, o)
			{
				if($selectedNavItem != null)
					return;
				if(o.offset <= scrollOffset)
				{
					// console.log(o.navItem.text() + " (" + o.offset + ", " + scrollOffset + ")" )
					$selectedNavItem = o.navItem;
					$selectedNavItem.addClass("current");
				}
			});

			// Select the first if none match.
			if($selectedNavItem == null)
			{
				$selectedNavItem = pairs[pairs.length-1].navItem;
				$selectedNavItem.addClass("current");
			}
		}

		// Set up the selection to run on window scroll.
		$(window).scroll(selectInPageNavItem);

		// And run it now.
		selectInPageNavItem();

    });
})(jQuery);