// sw.js - Упрощенный Service Worker без иконок
self.addEventListener('push', function(event) {
    console.log('🔔 Push событие получено');
    
    if (!event.data) {
        console.log('❌ Нет данных в push событии');
        return;
    }

    let data = {};
    try {
        data = event.data.json();
        console.log('📦 Данные уведомления:', data);
    } catch (e) {
        console.error('❌ Ошибка парсинга данных:', e);
        // Пробуем получить данные как текст
        data = {
            title: 'Trading Signal',
            body: event.data.text() || 'Новое уведомление'
        };
    }

    const options = {
        body: data.body || 'Новое уведомление',
        // Убрали icon и badge - они не нужны
        vibrate: [100, 50, 100],
        data: {
            url: 'https://www.tradingview.com'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Trading Signal', options)
            .then(() => console.log('✅ Уведомление показано'))
            .catch(err => console.error('❌ Ошибка показа уведомления:', err))
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('👆 Уведомление нажато');
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('https://www.tradingview.com')
            .then(() => console.log('✅ TradingView открыт'))
            .catch(err => console.error('❌ Ошибка открытия:', err))
    );
});

self.addEventListener('install', function(event) {
    console.log('⚙️ Service Worker установлен');
    self.skipWaiting(); // Активируем сразу
});

self.addEventListener('activate', function(event) {
    console.log('🚀 Service Worker активирован');
    event.waitUntil(self.clients.claim()); // Контролируем все вкладки
});

// Обработка ошибок
self.addEventListener('error', function(event) {
    console.error('❌ Ошибка в Service Worker:', event.error);
});
