"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./models/Client"));
const Device_1 = __importDefault(require("./models/Device"));
const Order_1 = __importDefault(require("./models/Order"));
/**
 * Заповнює базу даних тестовими даними
 */
const seedDatabase = async () => {
    try {
        console.log('Створення тестових клієнтів...');
        const client1 = await Client_1.default.create({
            name: 'Іван Петренко',
            phone: '+380991234567',
            email: 'ivan@example.com'
        });
        const client2 = await Client_1.default.create({
            name: 'Марія Коваленко',
            phone: '+380992345678',
            email: 'maria@example.com'
        });
        console.log('Створення тестових пристроїв...');
        const device1 = await Device_1.default.create({
            brand: 'Samsung',
            model: 'Galaxy S21',
            serialNumber: 'SN12345678',
            clientId: client1.id
        });
        const device2 = await Device_1.default.create({
            brand: 'iPhone',
            model: '13 Pro',
            serialNumber: 'IP98765432',
            clientId: client2.id
        });
        console.log('Створення тестових замовлень...');
        await Order_1.default.create({
            deviceId: device1.id,
            problem: 'Заміна екрану',
            status: 'in_progress',
            price: 2500
        });
        await Order_1.default.create({
            deviceId: device2.id,
            problem: 'Заміна батареї',
            status: 'pending',
            price: 1800
        });
        console.log('✅ Тестові дані успішно додано');
    }
    catch (error) {
        console.error('❌ Помилка при заповненні бази даних:', error);
    }
};
exports.default = seedDatabase;
