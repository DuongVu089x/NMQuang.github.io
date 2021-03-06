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
    '/images/wifi_on.png',
    '/images/wifi_off.png',
    '/images/bell_on.png',
    '/images/bell_off.png',
    '/js/jquery-3.1.1.min.js',
    '/js/script.js'
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

// when the browser fetches a URL…
self.addEventListener('fetch', function(event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
    console.log('Received a push message.', event);

    var title = 'A message from Minh Quangg';
    var body = 'Tomorrow, let us go to movie';
    var icon = '../images/icons/icon-32x32.png';
    var tag = 'demo-push-notification-tab';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});