$(document).ready(function()
	{
		// Location to output browser support.
		var $browserSupport = $("#browser-support");
		
		// Do they support service workers?
		var serviceWorkerAvailable = 'serviceWorker' in navigator;
		var serviceWorkerRegistration = null;
		if(serviceWorkerAvailable)
		{
			navigator.serviceWorker.ready.then(function(registration)
			{
				serviceWorkerRegistration = registration;
				updateUI();
			});
		}
		
		// https://developers.google.com/web/updates/2018/06/a2hs-updates
		let installPromptEvent;
		window.addEventListener('beforeinstallprompt', function(event)
		{
			// Prevent Chrome <= 67 from automatically showing the prompt
			event.preventDefault();

			// Stash the event so it can be triggered later.
			installPromptEvent = event;

			// Update the UI.
			updateUI();
		});

		// Add to the homescreen?
		function addToHomescreen()
		{
			// Sanity.
			if(null == installPromptEvent)
				return;
			
			// Prompt.
			installPromptEvent.prompt();
			installPromptEvent = null;
		}
		
		window.addEventListener('appinstalled', (evt) => {
			// Hide the add button.
			$("#addToHomescreen").remove();

			// Track using GA.
			if(ga)
			{
				ga("send", "event", "site", "add-to-homescreen");
			}
		});

		function updateUI()
		{
			$browserSupport.empty();

			
			if(false == serviceWorkerAvailable)
			{
				unsupportedBrowser();
				return;
			}

			// Is there a valid (& active) service worker registration?
			if(null != serviceWorkerRegistration && null != serviceWorkerRegistration.active)
			{
				// It is registered.
				serviceWorkerRegistered();
			}
			else
			{
				// It is not registered.
				serviceWorkerNotRegistered();
			}
			
		}

		function unsupportedBrowser()
		{
			$browserSupport.append($("<p class='status failure'>Your browser does not support service workers / progressive web applications.</p>"))
		}
		function serviceWorkerNotRegistered()
		{
			// It supports service workers, but not registered.
			$browserSupport.append($("<p class='status success'>Your browser supports Progressive Web Applications, but the service worker is not registered.</p>"));

			// Give them the ability to enable it.
			$browserSupport.append("<p class='details'>Click below to register the service worker.  This will enable features such as offline caching and notifications.</p>");
			var $button = $("<button>Register the service worker</button>");
			$button.click(function()
			{
				$button.attr("disabled", "disabled");
				registerServiceWorker(true, function()
				{
					top.location.reload(true);
				});
			});
			$browserSupport.append($button);
		}
		function serviceWorkerRegistered()
		{
			// Remove the previous messages.
			$browserSupport.empty();

			// Give them the ability to disable it.
			$browserSupport.append("<p class='status success'>The service worker is registered.  Your system will use features such as offline caching and notifications.</p>");
			
			// Can we add it to the homescreen?
			if(null != installPromptEvent)
			{
				var $button = $("<button id='addToHomescreen'>Add to your homescreen</button>");
				$button.click(addToHomescreen);
				$browserSupport.append($button);
			}
		}

		// Update the in-page UI.
		updateUI();
		
});