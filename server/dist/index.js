"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const seedData_1 = __importDefault(require("./seedData"));
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
        // Заповнюємо базу даних тестовими даними, якщо вона порожня
        try {
            const clientCount = await (await Promise.resolve().then(() => __importStar(require('./models')))).Client.count();
            if (clientCount === 0) {
                console.log('📊 Заповнюємо базу даних тестовими даними...');
                await (0, seedData_1.default)();
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
