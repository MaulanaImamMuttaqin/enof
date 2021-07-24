// console.warn('the sw is running')
console.log(navigator.onLine)
let cacheData = 'E-nof';
this.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/vendors~main.chunk.js',
                '/static/js/bundle.js',
                '/static/js/2.edef3b8f.chunk.js',
                '/static/js/main.0de47f8b.chunk.js',
                '/index.html',
                '/',
                '/History' // buat route yang memerlukan pengambilan api
            ])
    }))
})

this.addEventListener("fetch", event =>{

    if (!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then(resp =>{
                if(resp){
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})