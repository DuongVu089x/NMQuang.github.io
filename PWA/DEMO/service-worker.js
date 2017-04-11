// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'shopping-cart-data';
var cacheName = 'shopping-cart-cache-v1.0';
var filesToCache = [
  '/',
  '/index.html',
  '/css/bootstrap.css',
  '/css/font-awesome.css',
  '/css/style.css',
  '/images/camera_1.jpg',
  '/images/camera_2.jpg',
  '/images/desktop_1.jpg',
  '/images/iphone_1.jpg',
  '/images/iphone_2.jpg',
  '/images/iphone_3.jpg',
  '/images/laptop_1.jpg',
  '/images/laptop_2.jpg',
  '/images/camera_3.jpg',
  '/cart.html',
  '/js/jquery-3.1.1.min.js',
  '/js/script.js',
  '/manifest.json'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache).then(function() {
                self.skipWaiting();
            });
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if(key !== cacheName) {
          console.log('[ServiceWorker] Removing old cach', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// when the browser fetches a URL…
self.addEventListener('fetch', function(e) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(e.request);
        })
    );
});



