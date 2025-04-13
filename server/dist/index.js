import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import sequelize from './config/database';
import './models'; // ініціалізація моделей
import seedDatabase from './seedData';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';
// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Статусний маршрут
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'CRM Repair API працює!' });
});
// Основні маршрути API
app.use('/api', routes);
app.use('/', routes);
// Глобальний error handler
app.use((err, _req, res, _next) => {
    console.error('Серверна помилка:', err);
    res.status(500).send('Щось пішло не так');
});
// ==== ДОДАНО: Обробка фронтенду для React SPA ====
// потрібні для __dirname в ES-модулі
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Шлях до React-білду
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
// Якщо білд існує — обслуговуємо його
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    // Fallback для SPA-маршрутів (/, /clients, /orders тощо)
    app.get('*', (_req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}
else {
    console.warn('⚠️  client/dist не знайдено. Перевір, чи зроблений білд фронтенду.');
}
// ==== Кінець обробки фронтенду ====
// Старт сервера
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Підключення до бази даних встановлено');
        await sequelize.sync({ force: isDev, alter: !isDev });
        console.log('🗃 Схема бази даних синхронізована');
        try {
            const clientCount = await (await import('./models')).Client.count();
            if (clientCount === 0) {
                console.log('📊 Заповнюємо базу даних тестовими даними...');
                await seedDatabase();
                console.log('✅ Тестові дані успішно додано');
            }
            else {
                console.log('📊 База даних вже містить дані, пропускаємо ініціалізацію');
            }
        }
        catch (error) {
            console.error('❌ Помилка при заповненні бази даних:', error);
        }
        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущено на порту ${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Помилка запуску сервера:', error);
    }
};
startServer();
