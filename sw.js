// sw.js - Service Worker для обработки push уведомлений
self.addEventListener('push', function(event) {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body,
        vibrate: [100, 50, 100],
        data: {
            url: 'https://www.tradingview.com'  // Ссылка на TradingView
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('https://www.tradingview.com')  // Всегда открывает TradingView
    );
});
