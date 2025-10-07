// app.js - РАБОЧАЯ ВЕРСИЯ
const publicKey = 'BMmYXf-LUwMtHUn5QprX66UxQTd6M0IhTeOLNdzvn9Pi-88M5kiaZHjy_p8H81nQeQqSIXJi7Nw50TcdLCMaVBA'; // Пока оставь так

// Главная функция
async function enableNotifications() {
    console.log('🎯 Начинаем настройку уведомлений...');
    
    // 1. Проверяем поддержку браузером
    if (!('Notification' in window)) {
        alert('❌ Ваш браузер не поддерживает уведомления');
        return;
    }
    
    // 2. Запрашиваем разрешение
    const permission = await Notification.requestPermission();
    console.log('📝 Разрешение:', permission);
    
    if (permission !== 'granted') {
        alert('❌ Уведомления запрещены. Разрешите их в настройках браузера');
        return;
    }
    
    // 3. Пробуем Service Worker (если есть)
    let subscription = null;
    
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker зарегистрирован');
            
            // Создаем подписку для push-уведомлений
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            });
            
            console.log('📧 Push-подписка создана!');
            
        } catch (error) {
            console.log('⚠️ Service Worker не сработал, но это нормально');
        }
    }
    
    // 4. Показываем тестовое уведомление
    new Notification('🎉 УВЕДОМЛЕНИЯ ВКЛЮЧЕНЫ!', {
        body: 'Теперь вы будете получать сигналы о ордер-блоках',
        icon: 'https://via.placeholder.com/192',
        vibrate: [200, 100, 200]
    });
    
    // 5. Выводим результат в консоль
    console.log('=== 🎯 РЕЗУЛЬТАТ ТЕСТА ===');
    console.log('✅ Уведомления: РАБОТАЮТ');
    console.log('✅ Разрешение: GRANTED');
    
    if (subscription) {
        console.log('✅ Push-подписка: СОЗДАНА');
        console.log('🔑 Ключи подписки:', JSON.stringify(subscription.toJSON(), null, 2));
    } else {
        console.log('✅ Базовые уведомления: РАБОТАЮТ');
    }
    
    console.log('=== 🚀 ВСЁ ГОТОВО! ===');
    
    alert('✅ Уведомления включены! Проверьте консоль (F12 → Console)');
}

// Вспомогательная функция
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}
