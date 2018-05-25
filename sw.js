// When the application is installed, pre-load items.
self.addEventListener('install', function(event) {
	event.waitUntil(preLoad());
});

var preLoad = function(){
	console.log('[PWA] Install Event processing');
	return caches.open('pwa-offline').then(function(cache) {
		console.log('[PWA] Cached index and offline page during Install');
		return cache.addAll(['/offline/index.html', '/index.html']);
	});
}

self.addEventListener('fetch', function(event) {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		return;
	}
	if(("" + event.request.url).length == 0)
	{
		return;
	}
	console.log('The service worker is serving the asset.');
	event.respondWith(checkResponse(event.request).catch(function() {
		return returnFromCache(event.request)}
	));
	event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
	return new Promise(function(fulfill, reject) {
		fetch(request).then(function(response){
			if(response.status !== 404) {
				fulfill(response)
			} else {
				reject()
			}
		}, reject)
	});
};

var addToCache = function(request){
	return caches.open('pwa-offline').then(function (cache) {
		return fetch(request).then(function (response) {
			console.log('[PWA] add page to offline ('+ response.url + ')')
			return cache.put(request, response);
		});
	});
};

var returnFromCache = function(request){
	return caches.open('pwa-offline').then(function (cache) {
		return cache.match(request).then(function (matching) {
			if(!matching || matching.status == 404) {
				return cache.match('/offline/index.html')
			} else {
				return matching
			}
		});
	});
};
