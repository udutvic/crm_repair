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
// Імпортуємо моделі для ініціалізації асоціацій
require("./models");
const seedData_1 = __importDefault(require("./seedData"));
// Завантаження змінних середовища
dotenv_1.default.config();
// Ініціалізація Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: '*', // Дозволяємо запити з будь-якого домену
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Мінімальне логування
app.use((req, _res, next) => {
    next();
});
// Маршрути API
app.use('/api', routes_1.default);
// Базовий маршрут
app.get('/', (_req, res) => {
    res.send('CRM Repair API працює!');
});
// Мінімальна обробка помилок
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).send('OK');
});
// Спрощений запуск сервера
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        console.log('Успішне підключення до бази даних');
        // Використовуємо force: true тільки для розробки, щоб виправити проблему з базою даних
        try {
            await database_1.default.sync({ force: true });
            console.log('Базу даних успішно створено');
            // Заповнюємо базу даних тестовими даними
            await (0, seedData_1.default)();
        }
        catch (error) {
            console.error('Помилка при синхронізації бази даних:', error);
        }
        console.log('Моделі бази даних синхронізовано');
        app.listen(PORT, () => {
            console.log(`Сервер запущено на порту ${PORT}`);
        });
    }
    catch (error) {
        console.error('Помилка при запуску сервера:', error);
    }
};
startServer();
