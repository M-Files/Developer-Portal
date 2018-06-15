// Set up some useful flags.
var serviceWorkerAvailable = false;
var serviceWorkerInstalled = false;
var serviceWorkerRegistration = null;
function setServiceWorkerFlags(callback)
{
	serviceWorkerAvailable = 'serviceWorker' in navigator;
	serviceWorkerInstalled = false;
	serviceWorkerRegistration = null;
	if(serviceWorkerAvailable)
	{
		navigator.serviceWorker.ready.then(function(registration)
		{
			serviceWorkerInstalled = registration != null;
			serviceWorkerRegistration = registration;
			if(typeof(callback) == "function")
				callback();
		})
		.catch(function()
		{
			serviceWorkerInstalled = false;
			if(typeof(callback) == "function")
				callback();
		});
	}
}

// https://developers.google.com/web/updates/2018/06/a2hs-updates
let installPromptEvent;
window.addEventListener('beforeinstallprompt', function(event)
{
	// Prevent Chrome <= 67 from automatically showing the prompt
	event.preventDefault();

	// Stash the event so it can be triggered later.
	installPromptEvent = event;

	// Update any existing UI.
	if(typeof(refreshNotificationUI) == "function")
		refreshNotificationUI();
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

function refreshNavigationUI()
{
	// Get a link to the PWA icon.
	var $pwaIcon = $("A#pwa-link i");

	// Sanity.
	if($pwaIcon.length == 0)
	{
		return;
	}

	// Are we already registered?
	if(serviceWorkerInstalled)
	{
		// Show that we are able to send notifications.
		$pwaIcon
			.addClass("zmdi-notifications-active")
			.removeClass("zmdi-notifications")
			.removeClass("zmdi-notifications-none");
		console.log('Active service worker found, no need to register')
	}
	else
	{
		// Show that notifications COULD be done.
		$pwaIcon
			.addClass("zmdi-notifications-none")
			.removeClass("zmdi-notifications")
			.removeClass("zmdi-notifications-active");
	}

}

// If we can set up the service worker then note.
if (serviceWorkerAvailable)
{
	$(document).ready(function()
	{
		// Ensure the service worker flags are up-to-date then refresh the UI.
		setServiceWorkerFlags(refreshNavigationUI);
	})
}
