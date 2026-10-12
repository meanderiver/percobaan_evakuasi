var cacheName = 'evakuasi-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  
  // --- DAFTAR CSS ---
  '/css/leaflet.css',
  '/css/L.Control.Layers.Tree.css',
  '/css/L.Control.Locate.min.css',
  '/css/qgis2web.css',
  '/css/fontawesome-all.min.css',
  '/css/leaflet.photon.css',
  
  // --- DAFTAR JS & DATA (Dari gambar terbarumu) ---
  '/js/qgis2web_expressions.js',
  '/js/leaflet.js',
  '/js/L.Control.Layers.Tree.min.js',
  '/js/L.Control.Locate.min.js',
  '/js/leaflet.rotatedMarker.js',
  '/js/leaflet.pattern.js',
  '/js/leaflet-hash.js',
  '/js/Autolinker.min.js',
  '/js/rbush.min.js',
  '/js/labelgun.min.js',
  '/js/labels.js',
  '/js/leaflet.photon.js',
  '/data/percobaan_1.js',
  '/data/titikpos_2.js'
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