$(document).ready(function()
{
	$("aside#sidebar ul a, ul.quicklinks a, body #in-page-nav a")
		.each(function(i, o)
		{
			var $this = $(this);
			
			// When we move, do something.
			$this
				.mousemove(function(e)
				{
					// Calculate the offset;
					var offset = parseInt($this.offset().left);
					var halfWidth = parseInt($this.outerWidth()) / 2;

					// Calculate the delta.
					var delta = (parseInt(e.clientX) - offset) - halfWidth;

					// Update the CSS.
					$this.css({
						backgroundPositionX: delta + "px"
					});
				})
				.mouseout(function()
				{
					$(this).css("background-position-x", "0px");
				});
		});
});