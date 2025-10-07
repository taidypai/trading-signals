// sw.js
self.addEventListener('push', function(event) {
    console.log('Push событие получено', event);
    
    if (!event.data) return;

    let data = {};
    try {
        data = event.data.json();
    } catch (e) {
        console.error('Ошибка парсинга данных уведомления:', e);
        return;
    }

    const options = {
        body: data.body || 'Новое уведомление',
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
            url: 'https://www.tradingview.com'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Trading Signal', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Уведомление нажато');
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || 'https://www.tradingview.com')
    );
});

self.addEventListener('install', function(event) {
    console.log('Service Worker установлен');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker активирован');
});
