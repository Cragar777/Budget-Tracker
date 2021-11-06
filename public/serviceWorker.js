const CACHE_NAME = "budget-v1"
const DATA_CACHE = "data-cache-v1"
var thingsToCache = [
    "/",
    "/js/index.js",
    "/js/idb.js",
    "/css/style.css",
    "/manifest.json",
    "/icons/icon-72x72.png",
    "/icons/icon-96x96.png",
    "/icons/icon-128x128.png",
    "/icons/icon-144x144.png",
    "/icons/icon-152x152.png",
    "/icons/icon-192x192.png",
    "/icons/icon-384x384.png",
    "/icons/icon-512x512.png",
]
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
    )
        .then(
            function (cache) {
                return cache.addAll(thingsToCache)
            }
        )
});
self.addEventListener("fetch", function (event) {
    if (
        event.request.url.includes("/api/")
    ) {
        event.respondWith(
            caches.open(DATA_CACHE).then(cache=>{
                return fetch(event.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(event.request.url, response.clone())
                    }
                    return response
                })
                .catch(err => {
                    return cache.match(event.request)
                })
            })
        )
        return;
    }
    event.respondWith(
        fetch(event.request)
        .catch(function(){
            return caches.match(event.request)
            .then (function(response){
                if (response){
                    return response
                }
                if (event.request.headers.get("accept").includes("text/html")){
                    return caches.match("/")
                }
            })
        })
    )
})