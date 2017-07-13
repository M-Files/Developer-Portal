
var $stars = $(".stars")
var currentRating = -1;
var address = document.location.origin + document.location.pathname + document.location.search;

function getAlreadyVotedPages()
{
	var pages = localStorage.getItem("voted-pages");
	if(null == pages)
		pages = "";
	return pages.split("\r\n");
}
function getHasAlreadyVoted()
{
	if(typeof(Storage) != "undefined")
	{
		// Has the user voted for this page?
		var pages = getAlreadyVotedPages();
		for(var i=0; i<pages.length; i++)
		{
			if(pages[i] == address)
				return true;
		}
	}
	return false;
}
function setHasAlreadyVoted(value)
{
	if(typeof(Storage) != "undefined")
	{
		var pages = getAlreadyVotedPages();
		var newValue = "";
		var hasValue = false;
		for(var i=0; i<pages.length; i++)
		{
			if(pages[i] == address)
			{
				// Did we want to add it (value=true) or remove it (value=false)
				if(value)
				{
					// This is okay - page already voted for.
					newValue += "\r\n" + address;
					hasValue = true;
				}
				else
				{
					// We want to remove it, so don't add it to the value.
				}
			}
		}

		// What if we wanted to save but it's not there?
		if(value && hasValue == false)
		{
			newValue += "\r\n" + address;
		}

		// Update local storage.
		localStorage.setItem("voted-pages", newValue.trim());
	}
	return false;
}

function clearRating()
{
	currentRating = -1;
	$stars
		.removeClass("rating-1")
		.removeClass("rating-2")
		.removeClass("rating-3")
		.removeClass("rating-4")
		.removeClass("rating-5");
}
function setRating(i)
{
	clearRating();
	currentRating = i;
	$stars.addClass("rating-" + i);
}
$("> i", $stars).click(function()
{
	setRating($("> i", $stars).index(this) + 1);
})
$(".clear-rating").click(function()
{
	clearRating();
	return false;
})
$(".save-rating").click(function()
{
	// Sanity - no valid value.
	if(currentRating < 1 || currentRating > 5)
		return;
	
	// Log the event.
	ga("send", "event", "Page", "Rating", address, currentRating);

	// Set the user already voted.
	setHasAlreadyVoted(true);
	$("body").addClass("has-voted");

	return false;
})

var hasAlreadyVoted = getHasAlreadyVoted();
if(hasAlreadyVoted)
{
	$("body").addClass("has-voted");
}