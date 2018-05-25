//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		if (navigator.serviceWorker.controller) {
			console.log('[PWA] active service worker found, no need to register')
		} else {
			//Register the ServiceWorker
			navigator.serviceWorker.register('/sw.js').then(function(reg) {
				console.log('Service worker has been registered for scope:'+ reg.scope);
			});
		}
	});
}
