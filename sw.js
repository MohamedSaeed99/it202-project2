var cacheName = 'app-v1';
var appShellFiles = [
 "./index.html",
 "./page_content/form.html",
 "./page_content/list.html",
 "./styles.css",
 "./images/SBv4T.gif",
 "./images/nodata-found.png",
 "./images/videezy2.gif"
];



self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+ e.request.url);
      
      return fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
        });
      });
    })
  );
});