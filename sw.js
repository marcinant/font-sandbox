importScripts('assets/scripts/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('fontsandbox').then(function(cache) {
      return cache.addAll([
        '/',
          '/index.html',
	  '/assets/scripts/cache-polyfill.js',
        'https://fonts.gstatic.com/s/bonbon/v7/9Y-vWjaZMFbrz3brizYoHQ.woff2'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
