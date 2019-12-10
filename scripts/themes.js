(function()
{
	var themes = [{
			id : "",
			display : "Normal",
			icon : "brightness-auto",
			stylesheets: []
		},{
			id : "light",
			display : "Light",
			icon : "brightness-7",
			stylesheets: [
				"/styles/themes/light.css"
			]
		},
		{
			id : "dark",
			display : "Dark",
			icon : "brightness-3",
			stylesheets: [
				"/styles/themes/dark.css"
			]
		}];
	function setThemeCookie(theme)
	{
		// Set the cookie
		var expiry = new Date();
		expiry.setFullYear(expiry.getFullYear() + 2);
		document.cookie = "theme=" + escape(theme)+ "; path=/; expires=" + expiry.toUTCString();
	}
	function getThemeCookie()
	{
		// If there are no cookies then die.
		if(null == document.cookie)
		{
			return null;
		}

		// Find "theme" and return the value.
		var cookies = document.cookie.split(";");
		for(var i=0; i<cookies.length; i++)
		{
			var kvp = cookies[i].split("=");
			if(kvp.length != 2)
				continue;
			if(kvp[0].trim() == "theme")
			{
				return (kvp[1] + "").trim();
			}
		}
		return null;
	}

	function setTheme(theme, force)
	{
		// If the chosen theme isn't in the list of values then default to "".
		var chosenTheme = themes[0];
		for(var i=0; i<themes.length; i++)
		{
			if(themes[i].id == theme)
			{
				chosenTheme = themes[i];
				break;
			}
		}

		// If we have jQuery then update the UI.
		if(typeof($) != "undefined")
		{
			// Hide all theme options.
			$("#theme-toggle .theme-toggle").css("display", "none");
			
			// Show the selected one.
			$("#theme-toggle .theme-toggle-" + escape(chosenTheme.id)).css("display", "inline-block");
		}

		// If the chosen theme is the current theme then die.
		if(force != true && chosenTheme.id == getThemeCookie() + "")
		{
			return;
		}

		// Set the cookie.
		setThemeCookie(chosenTheme.id);

		// Disable all themes.
		for(var i=0; i<themes.length; i++)
		{
			document.body.classList.remove("theme-" + themes[i].id);
		}

		// Enable the specific theme.
		document.body.classList.add("theme-" + chosenTheme.id);

	}

	// Append all theme stylesheets.
	for(var e=0; e<themes.length; e++)
	{
		var chosenTheme = themes[e];
		for(var i=0; i<chosenTheme.stylesheets.length; i++)
		{
			if(document.readyState == "loading")
			{
				// Render it directly to the head.
				document.writeln('<link type="text/css" media="screen" rel="stylesheet" class="theme theme-' + chosenTheme.id + '" href="' + chosenTheme.stylesheets[i] + '" />');
			}
			else
			{
				// Modify the DOM.
				var link = document.createElement("link");
				link.type = "text/css";
				link.media = "screen";
				link.rel = "stylesheet";
				link.className = "theme theme-" + chosenTheme.id;
				link.href = chosenTheme.stylesheets[i];
				document.head.appendChild(link);
			}
		}
	}
	// Set the currently-selected theme.
	setTheme(getThemeCookie() + "", true);

	// When the window loads, render our theme change options.
	window.addEventListener("load", function()
	{

		// Add the theme options.
		var $themeToggle = $('<div id="theme-toggle">Change theme: </div>');
		for(var i=0; i<themes.length; i++)
		{
			var icon = themes[i].icon;
			var displayName = themes[i].display;
			var id = themes[i].id;
			var $themeAnchor = $('<a href="#" class="theme-toggle"><span class="iconify" data-icon="mdi:' + icon + '"></span> ' + displayName + '</a>');
			$themeAnchor.addClass("theme-toggle-" + escape(id));
			$themeAnchor.data("theme-id", id);
			$themeAnchor.data("next-theme-id", themes[(i + 1) % themes.length].id);
			$themeAnchor.click(function()
			{
				// Set the theme as the next one.
				setTheme($(this).data("next-theme-id"));
				return false;
			})
			$themeToggle.append($themeAnchor);
		}
		$("#options").append($themeToggle);

		// Ensure they're set correctly.
		setTheme(getThemeCookie() + "");
	})

})();