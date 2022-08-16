
const cacheName = 'phaser-cache';

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    try {
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    } catch (error) {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
    }
  })());
});

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(serviceWorkerOption.assets);
    }).catch(function (err) {
      console.log(err);
    })
  );
});