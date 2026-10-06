const NOME_CACHE = "haccp-admin-v4";
const FILE_DA_SALVARE = [
    "./", "./index.html", "./style.css", "./admin.css", "./admin.js",
    "./dati-camion.js", "./dati-celle.js", "./dati-fornitori.js", "./dati-pulizie.js", "./dati-azienda.js",
    "./manifest.json", "./icon-192.png", "./icon-512.png",
];
self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(NOME_CACHE).then((c) => c.addAll(FILE_DA_SALVARE)));
    self.skipWaiting();
});
self.addEventListener("activate", (e) => {
    e.waitUntil(caches.keys().then((n) => Promise.all(n.filter((x) => x !== NOME_CACHE).map((x) => caches.delete(x)))));
    self.clients.claim();
});
self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
