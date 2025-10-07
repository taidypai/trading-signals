// sw.js - Service Worker
self.addEventListener('push', event => {
    const data = event.data?.json() || { title: 'Новое уведомление', body: '' };
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/icon.png',
            badge: '/icon.png',
            vibrate: [200, 100, 200],
            data: data.url
        })
    );
});

// Клик по уведомлению
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data || 'https://www.tradingview.com')
    );
});
