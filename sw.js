// Service Worker для push-уведомлений
self.addEventListener('push', event => {
    console.log('📨 Получено push-сообщение:', event);
    
    const data = event.data?.json() || { 
        title: 'Trading Signals', 
        body: 'Новый сигнал!' 
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://taidypai.github.io/trading-signals/icon.png',
            badge: 'https://taidypai.github.io/trading-signals/icon.png',
            vibrate: [200, 100, 200],
            data: data.url || 'https://www.tradingview.com'
        })
    );
});

self.addEventListener('notificationclick', event => {
    console.log('👆 Клик по уведомлению');
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data)
    );
});

// Просто чтобы SW работал
self.addEventListener('install', event => {
    console.log('✅ Service Worker установлен');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('✅ Service Worker активирован');
});
