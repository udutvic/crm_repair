"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDevice = exports.updateDevice = exports.createDevice = exports.getDevicesByClientId = exports.searchDevices = exports.getDeviceById = exports.getAllDevices = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
/**
 * Отримання всіх пристроїв
 */
const getAllDevices = async (req, res) => {
    try {
        console.log('Запит на отримання всіх пристроїв');
        const devices = await models_1.Device.findAll({
            include: [{ model: models_1.Client }]
        });
        res.status(200).json(devices);
    }
    catch (error) {
        console.error('Помилка при отриманні пристроїв:', error);
        res.status(500).json({ error: 'Помилка при отриманні пристроїв', details: error.message });
    }
};
exports.getAllDevices = getAllDevices;
/**
 * Отримання пристрою за ID
 */
const getDeviceById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Запит на отримання пристрою з ID: ${id}`);
        const device = await models_1.Device.findByPk(id, {
            include: [{ model: models_1.Client }]
        });
        if (!device) {
            console.log(`Пристрій з ID ${id} не знайдено`);
            res.status(404).json({ message: 'Пристрій не знайдено' });
            return;
        }
        res.status(200).json(device);
    }
    catch (error) {
        console.error(`Помилка при отриманні пристрою:`, error);
        res.status(500).json({ error: 'Помилка при отриманні пристрою', details: error.message });
    }
};
exports.getDeviceById = getDeviceById;
/**
 * Створення нового пристрою
 */
/**
 * Пошук пристроїв за параметрами
 */
const searchDevices = async (req, res) => {
    try {
        const { query } = req.query;
        console.log(`Пошук пристроїв за запитом: ${query}`);
        const devices = await models_1.Device.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { brand: { [sequelize_1.Op.like]: `%${query}%` } },
                    { model: { [sequelize_1.Op.like]: `%${query}%` } },
                    { serialNumber: { [sequelize_1.Op.like]: `%${query}%` } }
                ]
            },
            include: [{ model: models_1.Client }]
        });
        res.status(200).json(devices);
    }
    catch (error) {
        console.error('Помилка при пошуку пристроїв:', error);
        res.status(500).json({ error: 'Помилка при пошуку пристроїв', details: error.message });
    }
};
exports.searchDevices = searchDevices;
/**
 * Отримання пристроїв за ID клієнта
 */
const getDevicesByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Запит на отримання пристроїв для клієнта з ID: ${clientId}`);
        const devices = await models_1.Device.findAll({
            where: { clientId },
            include: [{ model: models_1.Client }]
        });
        res.status(200).json(devices);
    }
    catch (error) {
        console.error(`Помилка при отриманні пристроїв клієнта:`, error);
        res.status(500).json({ error: 'Помилка при отриманні пристроїв клієнта', details: error.message });
    }
};
exports.getDevicesByClientId = getDevicesByClientId;
/**
 * Створення нового пристрою
 */
const createDevice = async (req, res) => {
    try {
        console.log('Отримано запит на створення пристрою:', req.body);
        const { brand, model, serialNumber, clientId } = req.body;
        if (!brand || !model || !clientId) {
            console.log('Помилка: відсутні обов\'язкові поля');
            res.status(400).json({ error: 'Бренд, модель та ID клієнта є обов\'язковими полями' });
            return;
        }
        // Перевірка існування клієнта
        const client = await models_1.Client.findByPk(clientId);
        if (!client) {
            console.log(`Клієнт з ID ${clientId} не знайдено`);
            res.status(404).json({ error: 'Клієнт не знайдено' });
            return;
        }
        const newDevice = await models_1.Device.create({
            brand,
            model,
            serialNumber,
            clientId
        });
        console.log('Пристрій успішно створено:', newDevice.toJSON());
        res.status(201).json(newDevice);
    }
    catch (error) {
        console.error('Помилка при створенні пристрою:', error);
        res.status(500).json({ error: 'Помилка при створенні пристрою', details: error.message });
    }
};
exports.createDevice = createDevice;
/**
 * Оновлення існуючого пристрою
 */
const updateDevice = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Запит на оновлення пристрою з ID: ${id}`, req.body);
        const { brand, model, serialNumber, clientId } = req.body;
        const device = await models_1.Device.findByPk(id);
        if (!device) {
            console.log(`Пристрій з ID ${id} не знайдено`);
            res.status(404).json({ error: 'Пристрій не знайдено' });
            return;
        }
        // Якщо передано clientId, перевіряємо існування клієнта
        if (clientId) {
            const client = await models_1.Client.findByPk(clientId);
            if (!client) {
                console.log(`Клієнт з ID ${clientId} не знайдено`);
                res.status(404).json({ error: 'Клієнт не знайдено' });
                return;
            }
        }
        await device.update({
            brand,
            model,
            serialNumber,
            clientId
        });
        console.log('Пристрій успішно оновлено:', device.toJSON());
        res.status(200).json(device);
    }
    catch (error) {
        console.error('Помилка при оновленні пристрою:', error);
        res.status(500).json({ error: 'Помилка при оновленні пристрою', details: error.message });
    }
};
exports.updateDevice = updateDevice;
/**
 * Видалення пристрою
 */
const deleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Запит на видалення пристрою з ID: ${id}`);
        const device = await models_1.Device.findByPk(id);
        if (!device) {
            console.log(`Пристрій з ID ${id} не знайдено`);
            res.status(404).json({ error: 'Пристрій не знайдено' });
            return;
        }
        await device.destroy();
        console.log(`Пристрій з ID ${id} успішно видалено`);
        res.status(200).json({ message: 'Пристрій успішно видалено' });
    }
    catch (error) {
        console.error('Помилка при видаленні пристрою:', error);
        res.status(500).json({ error: 'Помилка при видаленні пристрою', details: error.message });
    }
};
exports.deleteDevice = deleteDevice;
