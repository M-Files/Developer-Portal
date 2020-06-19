(function($){
	document.body.classList.add("has-js");
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
			
			var id = $heading.attr("id");
			if(typeof(id) == "undefined")
				return;
			
			var $anchor = $("<a></a>")
				.attr("href", "#" + id)
				.addClass("public-anchor")
				.attr("title", $heading.text())
				.append($("<span class='iconify' data-icon='mdi:link-variant'></span>"));
			$heading.append($anchor);
		});

		var $inPageNavItems = $("#in-page-nav #in-this-article > ul li a");
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
			// Find one to select.
			var scrollOffset = $(window).scrollTop() + 5;
			var $navItemToSelect = null;
			$.each(pairs, function(i, o)
			{
				if($navItemToSelect != null)
					return;
				if(o.offset <= scrollOffset)
				{
					$navItemToSelect = o.navItem;
				}
			});

			// Select the first if none match.
			if($navItemToSelect == null)
			{
				$navItemToSelect = pairs[pairs.length-1].navItem;
			}
			// If the selection has changed then reflect it.
			if($navItemToSelect != $selectedNavItem)
			{
				// Deselect, if we had one selected.
				if($selectedNavItem != null)
				{
					$selectedNavItem.parents("LI").removeClass("current");
				}
				
				// Select it.
				$navItemToSelect.parents("LI").addClass("current");
				$selectedNavItem = $navItemToSelect;
			}

		}

		// Set up the selection to run on window scroll.
		$(window).scroll(selectInPageNavItem);

		// And run it now.
		selectInPageNavItem();

    });
})(jQuery);