// A minimal Service Worker that allows installation
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});
self.addEventListener('fetch', (e) => {
// Pass all requests directly to the network (no caching for now)
// Useful in development to see 3D changes immediately
  e.respondWith(fetch(e.request));
});