"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
require("./models"); // ініціалізація моделей
// import seedDatabase from './seedData';
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';
// Middleware
app.use((0, cors_1.default)({
    origin: '*', // Дозволяємо запити з усіх доменів
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Маршрути API
// Видаляємо тестовий маршрут і додаємо маршрути без префіксу
// Додаємо маршрут для кореневого шляху, який повертає статус API
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'CRM Repair API працює!' });
});
// Додаємо маршрути API
app.use('/api', routes_1.default);
app.use('/', routes_1.default);
// Глобальний error handler
app.use((err, _req, res, _next) => {
    console.error('Серверна помилка:', err);
    res.status(500).send('Щось пішло не так');
});
// Старт сервера
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        console.log('✅ Підключення до бази даних встановлено');
        await database_1.default.sync({ force: isDev, alter: !isDev });
        console.log('🗃 Схема бази даних синхронізована');
        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущено на порту ${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Помилка запуску сервера:', error);
    }
};
startServer();
