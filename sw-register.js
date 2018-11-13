// Set up some useful flags.
var serviceWorkerAvailable = 'serviceWorker' in navigator;
var serviceWorkerInstalled = false;
var serviceWorkerRegistration = null;

// Be notified if anything changes.
if(serviceWorkerAvailable)
{
	navigator.serviceWorker.ready.then(function(registration)
	{
		serviceWorkerInstalled = registration != null && registration.active != null;
		serviceWorkerRegistration = registration;
	})
	.catch(function()
	{
		serviceWorkerInstalled = false;
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
});

// Unregisters a service worker.
function unregisterServiceWorker(callback)
{
	// Sanity.
	if(false == serviceWorkerAvailable)
		return; // Service workers not supported.
	if(null == serviceWorkerRegistration)
		return; // No registration available.

	// Unregister.
	serviceWorkerRegistration.unregister().then(function(success)
	{
		console.log('Service worker has been unregistered. (' + success + ')');
		serviceWorkerInstalled = false;
		serviceWorkerRegistration = null;
		if(typeof(callback) == "function")
		{
			callback();
		}
	});
}

// Registers a service worker.
function registerServiceWorker(force, callback)
{
	// Sanity.
	if(false == serviceWorkerAvailable)
		return; // Service workers not supported.
	if(serviceWorkerInstalled && !force)
		return; // Service worker already installed.
	
	// Do we need to force an unregistration?
	if(serviceWorkerInstalled)
	{
		// Unregister the service worker and provide a callback to re-call this method.
		unregisterServiceWorker(function() { registerServiceWorker(false); });
	}
	else
	{
		// Register the service worker.
		navigator.serviceWorker.register('/sw.js').then(function(reg) {
			console.log('Service worker has been registered.');

			if(typeof(callback) == "function")
			{
				callback();
			}
		});
	}
}

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

window.addEventListener("load", function()
{
	// Set up the service worker if we can.
	registerServiceWorker();

	// Create the anchor for the user to find more information out.
	var $anchor = $("<a href='/PWA/'></a>");
	if (serviceWorkerAvailable)
	{
		$anchor.text(" Enabled");
		$anchor.prepend($("<i class='zmdi zmdi-check'></i>"));
	}
	else
	{
		$anchor.text(" Unavailable");
		$anchor.prepend($("<i class='zmdi zmdi-block'></i>"));
	}

	// Render to screen.
	var $div = $("<div>Web App: </div>");
	$div.append($anchor);
	$("#options").prepend($div);
});
