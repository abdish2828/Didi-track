self.addEventListener('install', function (e) {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open('didi-tracker-cache').then(function (cache) {
      return cache.addAll([
        './',
        './index.html',
        './main.js',
        './styles.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});