/* Bhugol Quest service worker. Bump VERSION to force clients to refetch the app shell. */
const VERSION = 'bq-v3';
const SHELL = ['./', 'index.html', 'config.js', 'custom-questions.json', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'];
const FONT_CACHE = 'bq-fonts';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve cached copy instantly, refresh it in the background for next time.
function swr(req, cacheName) {
  return caches.open(cacheName).then(cache =>
    cache.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fonts: cache so text looks right offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(swr(req, FONT_CACHE));
    return;
  }
  // Everything else cross-origin (Supabase, map tiles) goes straight to the network.
  if (url.origin !== self.location.origin) return;

  // Page loads: cached shell first, so the app opens offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.open(VERSION).then(c => c.match('index.html').then(hit => {
        const net = fetch(req).then(res => { if (res.ok) c.put('index.html', res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
    return;
  }
  // Own static files: config and question list should be fresh when online.
  if (/\/(config\.js|custom-questions\.json)$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) caches.open(VERSION).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  e.respondWith(swr(req, VERSION));
});
