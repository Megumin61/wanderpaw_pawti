const CACHE_VERSION = 'pawti-media-v12';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const MEDIA_CACHE = `${CACHE_VERSION}-media`;
const CORE_ASSETS = [
  './',
  './index.html',
  './css/tailwind.generated.css',
  './css/style.css?v=12',
  './js/main.js?v=12',
  './js/landing.js',
  './js/data/quiz.js?v=12',
  './js/data/pets.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CORE_CACHE).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => !key.startsWith(CACHE_VERSION)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, MEDIA_CACHE));
    return;
  }

  if (['script', 'style', 'font'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, CORE_CACHE));
  }
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(cacheName)).put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const update = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || update || Response.error();
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(CORE_CACHE)).put('./index.html', response.clone());
    return response;
  } catch {
    return (await caches.match('./index.html')) || Response.error();
  }
}
