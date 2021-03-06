var staticCacheName = "pwa-v" + new Date().getTime();
var getUrl = self.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + getUrl.pathname.replace('/sw.js', '');
var filesToCache = [
    baseUrl+'/offline',
    baseUrl+'/css/app.css',
    baseUrl+'/js/app.js',
    baseUrl+'/images/icons/receipt-128x128.png',
    baseUrl+'/images/icons/receipt-512x512.png',
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("pwa-")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline');
            })
    )
});
