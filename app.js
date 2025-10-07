// app.js - РАБОЧАЯ ВЕРСИЯ
const publicKey = 'BMmYXf-LUwMtHUn5QprX66UxQTd6M0IhTeOLNdzvn9Pi-88M5kiaZHjy_p8H81nQeQqSIXJi7Nw50TcdLCMaVBA'; // Пока оставь так

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Хранилище для ключей
let notificationKeys = [];

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Регистрация ключа уведомлений
app.post('/register-key', (req, res) => {
    try {
        const { key } = req.body;
        
        if (!key) {
            return res.status(400).json({ error: 'No key provided' });
        }

        const keyData = {
            key: key,
            timestamp: new Date().toISOString(),
            userAgent: req.get('User-Agent')
        };

        notificationKeys.push(keyData);
        
        console.log('✅ Новый ключ зарегистрирован:', key);
        console.log('📊 Всего ключей:', notificationKeys.length);

        res.json({
            status: 'success',
            message: 'Key registered successfully',
            key: key
        });

    } catch (error) {
        console.error('❌ Ошибка регистрации ключа:', error);
        res.status(500).json({ error: error.message });
    }
});

// Получить все ключи
app.get('/keys', (req, res) => {
    res.json({
        total_keys: notificationKeys.length,
        keys: notificationKeys
    });
});

// Отправка уведомления (для теста)
app.post('/send-test-notification', (req, res) => {
    const { message } = req.body;
    
    console.log('📢 Тестовое уведомление:', message);
    console.log('🔑 Доступные ключи:', notificationKeys.map(k => k.key));
    
    res.json({
        status: 'success',
        message: 'Notification sent to all registered keys',
        keys_count: notificationKeys.length
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на http://192.168.0.114:${port}`);
    console.log(`📧 Локальный URL: http://localhost:${port}`);
});
