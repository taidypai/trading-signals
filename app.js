// app.js - РАБОЧАЯ ВЕРСИЯ
const publicKey = 'BMmYXf-LUwMtHUn5QprX66UxQTd6M0IhTeOLNdzvn9Pi-88M5kiaZHjy_p8H81nQeQqSIXJi7Nw50TcdLCMaVBA'; // Пока оставь так

// Включение уведомлений
async function subscribe() {
    if (!('serviceWorker' in navigator)) {
        alert('Браузер не поддерживает уведомления');
        return;
    }

    try {
        // Регистрируем Service Worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        // Запрашиваем разрешение
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            alert('Уведомления запрещены');
            return;
        }

        // Получаем подписку
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        // Отправляем на сервер (пока просто выводим)
        console.log('Подписка:', JSON.stringify(subscription));
        alert('✅ Уведомления включены! Подписка сохранена.');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка: ' + error.message);
    }
}

// Вспомогательная функция
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

// Тестовая отправка
function sendTest() {
    if (!('serviceWorker' in navigator)) {
        alert('Service Worker не поддерживается');
        return;
    }
    
    navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Тестовое уведомление!', {
            body: '🎯 Если видишь это — push-уведомления работают!',
            icon: '/icon.png',
            vibrate: [200, 100, 200]
        });
    });
}
