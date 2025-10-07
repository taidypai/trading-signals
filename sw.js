// Service Worker для push-уведомлений
console.log('✅ Service Worker загружен!');

self.addEventListener('push', event => {
    console.log('📨 Получено push-сообщение');
    
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
self.addEventListener('activate', event => {
    console.log('✅ Service Worker активирован');
});
