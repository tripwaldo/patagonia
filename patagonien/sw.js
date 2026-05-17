const CACHE_NAME = 'patagonia-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// Installieren & Cachen
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Cache-First Strategie
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
