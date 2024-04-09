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
				.attr("aria-label", $heading.text())
				.addClass("public-anchor")
				.attr("title", $heading.text())
				.append($('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.3569 2.8501C10.8487 2.35834 11.3951 2.07837 11.9095 2.02683C12.4075 1.97694 12.9274 2.13461 13.4141 2.62133C13.9009 3.10805 14.0585 3.62796 14.0086 4.12592C13.9571 4.64033 13.6771 5.18677 13.1854 5.67853L10.1906 8.67333C9.70104 9.16285 9.26172 9.33985 8.86933 9.32796C8.46934 9.31584 8.00105 9.10428 7.46612 8.56935C7.27086 8.37408 6.95427 8.37408 6.75901 8.56935C6.56375 8.76461 6.56375 9.08119 6.75901 9.27645C7.39565 9.91309 8.0918 10.3049 8.83904 10.3275C9.59385 10.3504 10.2845 9.99357 10.8977 9.38044L13.8925 6.38563C14.5034 5.77473 14.9236 5.0248 15.0036 4.22562C15.0854 3.40999 14.8061 2.59907 14.1212 1.91422C13.4364 1.22937 12.6255 0.950095 11.8098 1.03182C11.0107 1.11189 10.2607 1.53209 9.64983 2.14299L9.48345 2.30937L8.31881 3.47402C8.12354 3.66928 8.12354 3.98586 8.31881 4.18112C8.51407 4.37639 8.83065 4.37639 9.02591 4.18112L10.1906 3.01648L10.3569 2.8501ZM6.031 7.17585C6.52052 6.68633 6.95983 6.50934 7.35223 6.52123C7.75222 6.53335 8.2205 6.7449 8.75544 7.27984C8.9507 7.4751 9.26729 7.4751 9.46255 7.27984C9.65781 7.08458 9.65781 6.76799 9.46255 6.57273C8.82591 5.9361 8.12976 5.54433 7.38252 5.52169C6.62771 5.49881 5.93703 5.85561 5.32389 6.46875L2.32909 9.46355C1.71819 10.0745 1.29799 10.8244 1.21791 11.6236C1.13619 12.4392 1.41547 13.2501 2.10032 13.935C2.78517 14.6198 3.59608 14.8991 4.41171 14.8174C5.2109 14.7373 5.96083 14.3171 6.57173 13.7062L7.90275 12.3752C8.09802 12.1799 8.09802 11.8633 7.90275 11.6681C7.70749 11.4728 7.39091 11.4728 7.19565 11.6681L5.86462 12.9991C5.37287 13.4908 4.82643 13.7708 4.31202 13.8224C3.81406 13.8722 3.29415 13.7146 2.80743 13.2279C2.3207 12.7411 2.16304 12.2212 2.21293 11.7233C2.26447 11.2088 2.54444 10.6624 3.0362 10.1707L6.031 7.17585Z" fill="#0A1541"/></svg>'));
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

				// Force selection by clicking.
				$navItem.click(function(){ selectSpecificInPageNavItem($navItem); });
			})
		};

		// Set up recalculation to run on window resize.
		$(window).resize(recalculateNavItemLocations);

		// Calculate now.
		recalculateNavItemLocations();

		var $selectedNavItem = null;
		function selectSpecificInPageNavItem($navItemToSelect)
		{
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

			selectSpecificInPageNavItem($navItemToSelect);
		}

		// Set up the selection to run on window scroll.
		$(window).scroll(selectInPageNavItem);

		// And run it now.
		selectInPageNavItem();

    });
})(jQuery);