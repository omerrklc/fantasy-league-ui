const CACHE_NAME = 'emac-v26';
const APP_SHELL = [
  './', './index.html', './styles.css?v=26', './emac.css?v=26', './emac-reference.css?v=26', './app.js?v=26', './manifest.webmanifest',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png', './assets/news/trade-night.webp', './assets/avatars/emac-premium-catalog-v1.png', './assets/avatars/emac-premium-catalog-v2.png', './assets/avatars/emac-player-roster-v1.png', './assets/avatars/emac-player-roster-v2.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  if (event.request.method !== 'GET' || requestUrl.pathname.startsWith('/api/') || requestUrl.pathname.startsWith('/auth/')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)); return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  const freshAsset = ['script', 'style'].includes(event.request.destination);
  if (freshAsset) {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok && requestUrl.origin === location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
