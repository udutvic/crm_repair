"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const Client_1 = __importDefault(require("./models/Client"));
const Device_1 = __importDefault(require("./models/Device"));
const Order_1 = __importDefault(require("./models/Order"));
/**
 * Функція для заповнення бази даних тестовими даними
 */
const seedDatabase = async () => {
    try {
        console.log('Початок заповнення бази даних тестовими даними...');
        // Створюємо клієнтів
        const client1 = await Client_1.default.create({
            name: 'Іван Петренко',
            phone: '+380991234567',
            email: 'ivan@example.com'
        });
        const client2 = await Client_1.default.create({
            name: 'Марія Коваленко',
            phone: '+380671234567',
            email: 'maria@example.com'
        });
        console.log('Клієнти створені:', client1.id, client2.id);
        // Створюємо пристрої
        const device1 = await Device_1.default.create({
            brand: 'Samsung',
            model: 'Galaxy S24',
            serialNumber: 'SN12345678',
            clientId: client1.id
        });
        const device2 = await Device_1.default.create({
            brand: 'iPhone',
            model: '15 Pro',
            serialNumber: 'IP98765432',
            clientId: client2.id
        });
        console.log('Пристрої створені:', device1.id, device2.id);
        // Створюємо замовлення
        const order1 = await Order_1.default.create({
            deviceId: device1.id,
            problem: 'Розбитий екран',
            status: 'pending',
            price: 1500
        });
        const order2 = await Order_1.default.create({
            deviceId: device2.id,
            problem: 'Не працює камера',
            status: 'in_progress',
            price: 800
        });
        console.log('Замовлення створені:', order1.id, order2.id);
        console.log('База даних успішно заповнена тестовими даними!');
    }
    catch (error) {
        console.error('Помилка при заповненні бази даних:', error);
    }
};
exports.seedDatabase = seedDatabase;
exports.default = exports.seedDatabase;
