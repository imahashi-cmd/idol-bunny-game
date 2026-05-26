const CACHE = 'idol-bunny-v3';
const FILES = ['/', '/game.html', '/index.html', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // game.html と index.html は常にネットワーク優先（最新版を取得）
  const isMain = url.endsWith('/') || url.endsWith('/game.html') || url.endsWith('/index.html');
  if (isMain) {
    e.respondWith(
      fetch(e.request).then(r => {
        const rc = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, rc));
        return r;
      }).catch(() => caches.match(e.request))
    );
  } else {
    // アイコン等はキャッシュ優先（オフライン対応）
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
