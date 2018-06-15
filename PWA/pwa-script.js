function refreshNotificationUI()
{
	// Empty the current browser-support section.
	var $browserSupport = $("#browser-support");
	$browserSupport.empty();

	// If no service worker functionality is available then state that.
	if(false == serviceWorkerAvailable)
	{
		$browserSupport.append($("<p class='status failure'>Your browser does not support Progressive Web Applications.</p>"));
		return;
	}
	
	// It supports service workers.
	$browserSupport.append($("<p class='status success'>Your browser supports Progressive Web Applications.</p>"));

	// Can we add it to the homescreen?
	if(null != installPromptEvent)
	{
		var $button = $("<button id='addToHomescreen'>Add to the homescreen</button>");
		button.click(addToHomescreen);
		$browserSupport.append($button);
	}

	// Is the service worker already registered?
	if(serviceWorkerInstalled)
	{
		// Give them the ability to disable it.
		$browserSupport.append("<p class='details'>The service worker is already registered.  Your system will use features such as offline caching and notifications.</p>");
		var $button = $("<button>Disable notifications and other PWA features</button>");
		$button.click(function()
		{
			$button.attr("disabled", "disabled");
			unregisterServiceWorker(function()
			{
				setServiceWorkerFlags(function()
				{
					refreshNotificationUI();
				});
			});
		});
		$browserSupport.append($button);
	}
	else
	{
		// Give them the ability to enable it.
		$browserSupport.append("<p class='details'>Click below to register the service worker.  This will enable features such as offline caching and notifications.</p>");
		var $button = $("<button>Register the service worker</button>");
		$button.click(function()
		{
			$button.attr("disabled", "disabled");
			registerServiceWorker(true, function()
			{
				setServiceWorkerFlags(function()
				{
					refreshNotificationUI();
				});
			});
		});
		$browserSupport.append($button);
	}
}

$(document).ready(function()
{
	refreshNotificationUI();
});