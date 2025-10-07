// app.js - РАБОЧАЯ ВЕРСИЯ
const publicKey = 'BMmYXf-LUwMtHUn5QprX66UxQTd6M0IhTeOLNdzvn9Pi-88M5kiaZHjy_p8H81nQeQqSIXJi7Nw50TcdLCMaVBA'; // Пока оставь так

// Функция для тестирования ВСЕГО процесса
async function testFullProcess() {
    console.log('🎯 НАЧИНАЕМ ТЕСТ...');
    
    // 1. Проверяем поддержку браузером
    if (!('serviceWorker' in navigator)) {
        console.error('❌ Service Worker не поддерживается');
        return;
    }
    console.log('✅ Service Worker поддерживается');
    
    // 2. Проверяем уведомления
    if (!('Notification' in window)) {
        console.error('❌ Уведомления не поддерживаются');
        return;
    }
    console.log('✅ Уведомления поддерживаются');
    
    // 3. Регистрируем Service Worker
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker зарегистрирован:', registration);
    } catch (error) {
        console.error('❌ Ошибка регистрации Service Worker:', error);
        return;
    }
    
    // 4. Запрашиваем разрешение
    const permission = await Notification.requestPermission();
    console.log('✅ Разрешение уведомлений:', permission);
    
    if (permission !== 'granted') {
        console.error('❌ Разрешение не получено');
        return;
    }
    
    // 5. Подписываемся на push-уведомления
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        });
        
        console.log('✅ Push-подписка создана!');
        console.log('📧 Endpoint:', subscription.endpoint);
        console.log('🔑 Keys:', subscription.toJSON().keys);
        
        // 6. Тестовое уведомление
        registration.showNotification('🎉 ТЕСТ УСПЕШЕН!', {
            body: 'Все системы работают! Push-уведомления готовы!',
            icon: '/icon.png',
            vibrate: [200, 100, 200]
        });
        
        console.log('🎯 ВСЁ РАБОТАЕТ! Можно переходить к интеграции с Python!');
        
    } catch (error) {
        console.error('❌ Ошибка подписки:', error);
    }
}

// Вспомогательная функция (должна уже быть)
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}
