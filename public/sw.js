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
                '/static/js/2.89a50ab7.chunk.js',
                '/static/js/main.7b7851ce.chunk.js',
                '/static/css/main.b36019d7.chunk.css',
                '/index.html',
                '/manifest.json',
                '/logo%20e-nof.jpeg',
                '/favicon.ico',
                '/',
                '/History', // buat route yang memerlukan pengambilan api
                '/Login'
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