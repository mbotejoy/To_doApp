const CACHE_NAME = 'to-do-app-cache-v1';
const urlsToCache = [ 
     '/',
    '/index.html',
    '/create.html',
    '/list.html',
    '/previous.html',

    '/static/styles.css/index.css',
    '/static/styles.css/list.css',
    '/static/styles.css/login.css',

    '/static/scripts.js/index.js',
    '/static/scripts.js/list.js',
    '/static/scripts.js/login.js',

    '/static/Images/bg2.jpg',
    '/manifest.json'
    ];

self.addEventListener("install", event => {
    //for new versions of the SW to activate immediately without waiting for the old one to be gone
    self.skipWaiting(); 

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

//When the service worker activates, it removes any old caches that don’t match the current version, 
// keeping the app’s cache clean and up to date.
self.addEventListener("activate", event => {
    console.log("Service Worker activated and is ready to handle fetches");
     const cacheAllowlist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheAllowlist.includes(cacheName)) {          
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // the SW to take control of all clients immediately after activation
});

//Caching strategy: 
// Cache First - it tries to serve the cached version of the resource first, 
// and if it’s not available, it fetches it from the network and caches it for future use.
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request)
            .then(networkResponse => {

                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }
                const responseClone = networkResponse.clone();

                caches.open(CACHE_NAME)
                .then(cache => {
                    cache.put(event.request, responseClone);
                });

                return networkResponse;
            });
        })
    );
});
