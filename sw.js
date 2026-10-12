var cacheName = 'evakuasi-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/css/leaflet.css',
  '/css/qgis2web.css',
  '/js/leaflet.js',
  '/js/qgis2web_expressions.js',
  '/data/percobaan_1.js',
  '/datatitikpos_2.js'            
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});