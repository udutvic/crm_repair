"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDevices = exports.deleteDevice = exports.updateDevice = exports.createDevice = exports.getDevicesByClientId = exports.getDeviceById = exports.getAllDevices = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
/**
 * Отримання всіх пристроїв
 */
const getAllDevices = async (req, res) => {
    const devices = await models_1.Device.findAll({
        include: [{ model: models_1.Client, as: 'client' }]
    });
    res.status(200).json(devices);
};
exports.getAllDevices = getAllDevices;
/**
 * Отримання пристрою за ID
 */
const getDeviceById = async (req, res) => {
    const { id } = req.params;
    const device = await models_1.Device.findByPk(id, {
        include: [{ model: models_1.Client, as: 'client' }]
    });
    res.status(200).json(device || { message: 'Пристрій не знайдено' });
};
exports.getDeviceById = getDeviceById;
/**
 * Отримання пристроїв за ID клієнта
 */
const getDevicesByClientId = async (req, res) => {
    const { clientId } = req.params;
    const devices = await models_1.Device.findAll({
        where: { clientId },
        include: [{ model: models_1.Client, as: 'client' }]
    });
    res.status(200).json(devices);
};
exports.getDevicesByClientId = getDevicesByClientId;
/**
 * Створення нового пристрою
 */
const createDevice = async (req, res) => {
    const { brand, model, serialNumber, clientId } = req.body;
    const newDevice = await models_1.Device.create({
        brand,
        model,
        serialNumber,
        clientId
    });
    const deviceWithClient = await models_1.Device.findByPk(newDevice.id, {
        include: [{ model: models_1.Client, as: 'client' }]
    });
    res.status(201).json(deviceWithClient);
};
exports.createDevice = createDevice;
/**
 * Оновлення існуючого пристрою
 */
const updateDevice = async (req, res) => {
    const { id } = req.params;
    const { brand, model, serialNumber, clientId } = req.body;
    const device = await models_1.Device.findByPk(id);
    if (device) {
        await device.update({
            brand,
            model,
            serialNumber,
            clientId
        });
    }
    const updatedDevice = await models_1.Device.findByPk(id, {
        include: [{ model: models_1.Client, as: 'client' }]
    });
    res.status(200).json(updatedDevice || { message: 'Пристрій не знайдено' });
};
exports.updateDevice = updateDevice;
/**
 * Видалення пристрою
 */
const deleteDevice = async (req, res) => {
    const { id } = req.params;
    const deleted = await models_1.Device.destroy({ where: { id } });
    res.status(200).json({ message: deleted ? 'Пристрій успішно видалено' : 'Пристрій не знайдено' });
};
exports.deleteDevice = deleteDevice;
/**
 * Пошук пристроїв за параметрами
 */
const searchDevices = async (req, res) => {
    const { q } = req.query;
    const searchQuery = `%${q || ''}%`;
    const devices = await models_1.Device.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { brand: { [sequelize_1.Op.iLike]: searchQuery } },
                { model: { [sequelize_1.Op.iLike]: searchQuery } },
                { serialNumber: { [sequelize_1.Op.iLike]: searchQuery } }
            ]
        },
        include: [{ model: models_1.Client, as: 'client' }]
    });
    res.status(200).json(devices);
};
exports.searchDevices = searchDevices;
