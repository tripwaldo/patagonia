const CACHE_NAME = 'patagonia-v3';

// Dateien, die sofort beim Start geladen werden
const PRE_CACHE = [
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRE_CACHE))
  );
  self.skipWaiting();
});

// "Network First, then Cache" Strategie
// Speichert automatisch alle Bilder (Pexels, Komoot Maps), die du einmal ansiehst.
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
      }
      return response;
    }).catch(() => {
      return caches.match(e.request);
    })
  );
});