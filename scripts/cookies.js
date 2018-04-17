// Polyfill for string.trim not being available (e.g. IE8).
if (!String.prototype.trim)
{
	String.prototype.trim = function ()
	{
	  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

// Add the cookie dialog if needed.
$(document).ready(function()
{
	var $body = $("BODY");
	function setAcceptedCookie()
	{
		// Set the cookie
		document.cookie = "accepted=1; path=/; expires=Fri, 31 Dec 9999 25:59:59 GMT";
		$body.addClass("accepted-cookies");
	}
	function getAcceptedCookie()
	{
		// If there are no cookies then die.
		if(null == document.cookie)
		{
			return null;
		}

		// Find "accepted" and return the value.
		var cookies = document.cookie.split(";");
		for(var i=0; i<cookies.length; i++)
		{
			var kvp = cookies[i].split("=");
			if(kvp.length != 2)
				continue;
			if(kvp[0].trim() == "accepted")
			{
				return (kvp[1] + "").trim();
			}
		}
		return null;
	}

	// If they've already accepted then die.
	if(getAcceptedCookie() == "1")
	{
		return;
	}

	// Add the cookie statement.
	var $cookieStatement = $("<div id='cookies'>We use cookies on this site to log anonymous statistics on how people use this website.  For more information, see our <a href='https://www.m-files.com/en/privacy-policy-statement' target='_blank' rel='external noopener nofollow'>corporate privacy policy</a>.</div>");
	var $hideButton = $("<button id='cookie-hide'>Hide</button>");
	$hideButton.click(setAcceptedCookie);
	$cookieStatement.append($hideButton);
	$("body").append($cookieStatement);
});