// Простой Service Worker
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
