// Простой Service Worker
// Кэшируем основные файлы для оффлайн-работы
const CACHE_NAME = 'trading-signals-v1';
const urlsToCache = [
  '/trading-signals/',
  '/trading-signals/index.html',
  '/trading-signals/app.js',
  '/trading-signals/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('push', event => {
    const data = event.data?.json() || { 
        title: 'Trading Signals', 
        body: 'Новый сигнал!' 
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://via.placeholder.com/192',
            vibrate: [200, 100, 200]
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://www.tradingview.com')
    );
});
