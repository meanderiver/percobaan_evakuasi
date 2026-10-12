var cacheName = 'evakuasi-v3';
var filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './css/leaflet.css',
  './css/L.Control.Layers.Tree.css',
  './css/L.Control.Locate.min.css',
  './css/qgis2web.css',
  './css/fontawesome-all.min.css',
  './css/leaflet.photon.css',
  './js/qgis2web_expressions.js',
  './js/leaflet.js',
  './js/L.Control.Layers.Tree.min.js',
  './js/L.Control.Locate.min.js',
  './js/leaflet.rotatedMarker.js',
  './js/leaflet.pattern.js',
  './js/leaflet-hash.js',
  './js/Autolinker.min.js',
  './js/rbush.min.js',
  './js/labelgun.min.js',
  './js/labels.js',
  './js/leaflet.photon.js',
  './data/percobaan_1.js',
  './data/titikpos_2.js'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // Coba simpan satu-satu. Jika ada yang typo/hilang, biarkan dan lanjut ke file berikutnya
      return Promise.all(
        filesToCache.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.log('File dilewati (tidak ada/typo):', url);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response; // Gunakan file dari cache jika ada
      }
      return fetch(e.request).then(function(networkResponse) {
        // Auto-save: Simpan file apa pun yang berhasil dimuat secara online ke dalam cache
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          var responseToCache = networkResponse.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(function() {
        // Pengaman GitHub Pages saat offline
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});