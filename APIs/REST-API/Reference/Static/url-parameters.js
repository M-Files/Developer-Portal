var parameters = {
	"type": {
		"<number>": "Refers to an object type ID"
	},
	"objectid": {
		"<number>": "Refers to an internal object ID",
		"e<string>": "Refers to an external object ID"
	},
	"id": {
		"<number>": "Refers to an ID"
	},
	"path": {
		"<path>" : "Any number of path segments separated with '/'.\r\nSee Encoding syntax for the path encoding."
	}
};

$(document).ready(function()
{
	$(".url-with-parameters").each(function(i, o)
	{
		var $url = $(this);

		// Extract default text.
		var text = $url.text();

		// Search for parameters.
		$.each(parameters, function(a)
		{
			// If the parameter doesn't exist, die.
			var parameterText = "(" + a + ")";
			var parameterLocation = 0;
			
			while(parameterLocation != -1)
			{
				parameterLocation = text.indexOf(parameterText, parameterLocation+1);
				if(-1 == parameterLocation)
					return;

				// Generate the hover element.
				var $hoverElement = $("<div></div>")
					.addClass("tooltip")
					.attr("id", "tooltip-" + parameterLocation);
				
				// Add in the description(s).
				$.each(parameters[a], function(o)
				{
					var $child = $("<div></div>");
					$child.append($("<b></b>").append($("<tt></tt>").text(o)))
					$child.append($("<br />"))
					var lines = parameters[a][o].split("\r\n");
					for(var e=0; e<lines.length; e++)
					{
						if(e > 0)
							$child.append($("<br />"));
						$child.append("- " + lines[e])
					}
					$hoverElement.append($child);
				});
				$("body").append($hoverElement);
				
				// Build up the link.
				var $link = $("<a></a>")
					.addClass("parameter")
					.attr("href", "#")
					.attr("data-tooltip", "#tooltip-" + parameterLocation)
					.text(parameterText)

				// Replace the text.
				text = text.substring(0, parameterLocation)
					+ $link.prop("outerHTML")
					+ text.substring(parameterLocation + parameterText.length);

				// Move to the end of the string we just altered.
				parameterLocation = parameterLocation + $link.prop("outerHTML").length;

			}

		})

		// Update the text.
		$url.html(text);

		// Attach our event handlers.
		$(".parameter", $url)
			.each(function(i, o)
			{
				// Find out where the parameter is positioned on screen.
				var $this = $(this);
				var offset = $this.offset();

				// Make it appear below the text.
				offset.top += $this.height();

				// Move the tooltip there.
				var $tooltip = $($this.data("tooltip"));
				$tooltip.css({
					left: offset.left + "px",
					top: offset.top + "px"});
			})
			.click(function(){ return false; })
			.mouseenter(function()
			{
				$($(this).data("tooltip"))
					.addClass("active");
			})
			.mouseleave(function()
			{
				$(".tooltip").removeClass("active")
			});

	});
})
