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
		var expiry = new Date();
		expiry.setFullYear(expiry.getFullYear() + 2);
		document.cookie = "accepted-localstorage=1; path=/; expires=" + expiry.toUTCString();
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
			if(kvp[0].trim() == "accepted-localstorage")
			{
				return (kvp[1] + "").trim();
			}
		}
		return null;
	}

	// If we are running on the development server then show a UI.
	if(window.location.hostname == "development.staging.motivesys.com")
	{
		var $notice = $('<div id="notice">This is the internal development version of the M-Files Developer Portal, and may contain content that is incomplete or inaccurate.  Please reference the <a href="https://developer.m-files.com">live M-Files Developer Portal</a> for current public documentation.</div>');
		$body.append($notice)
	}

	// If they've already accepted then die.
	if(getAcceptedCookie() == "1")
	{
		window.IconifyConfig= {
			localStorage: true
		};
		return;
	}

	// Add the cookie statement.
	var $cookieStatement = $("<div id='cookies'>We use cookies on this site to log anonymous statistics on how people use this website.  We may also use local storage to make the site perform better for you.  For more information, see our <a href='https://www.m-files.com/en/privacy-policy-statement' target='_blank' rel='external noopener nofollow'>corporate privacy policy</a>.</div>");
	var $hideButton = $("<button id='cookie-hide'>Hide</button>");
	$hideButton.click(setAcceptedCookie);
	$cookieStatement.append($hideButton);
	$("body").append($cookieStatement);
});