(function($){
	// Not legacy then die.
	if(false == document.body.classList.contains("legacy"))
		return;

	// We are viewing legacy content.  Get a reference to the legacy statement.
	var $legacyStatement = $("body, div.legacy");
	
	// Shows the lightbox-style full-screen legacy statement.
	function fullscreenLegacy(){
		$legacyStatement.addClass("shown");
	}

	// Collapses the legacy statement.
	function collapseLegacy()
	{
		$legacyStatement.removeClass("shown");
	}

	// When the close button is clicked, collapse the statement.
	$("button.close", $legacyStatement).click(collapseLegacy)

	// When the background of the overlay is clicked, collapse the statement.
	$legacyStatement.click(collapseLegacy);

	// By default show the statement.
	fullscreenLegacy();
})(jQuery);