"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientById = exports.getAllClients = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
/**
 * Отримання всіх клієнтів
 */
const getAllClients = async (req, res) => {
    const clients = await models_1.Client.findAll();
    res.status(200).json(clients);
};
exports.getAllClients = getAllClients;
/**
 * Отримання клієнта за ID
 */
const getClientById = async (req, res) => {
    const { id } = req.params;
    const client = await models_1.Client.findByPk(id);
    res.status(200).json(client || { message: 'Клієнта не знайдено' });
};
exports.getClientById = getClientById;
/**
 * Створення нового клієнта
 */
const createClient = async (req, res) => {
    try {
        console.log('Отримано запит на створення клієнта:', req.body);
        const { name, phone, email } = req.body;
        if (!name || !phone) {
            console.log('Помилка: відсутні обов\'язкові поля');
            res.status(400).json({ error: 'Ім\'я та телефон є обов\'язковими полями' });
            return;
        }
        const newClient = await models_1.Client.create({
            name,
            phone,
            email
        });
        console.log('Клієнт успішно створений:', newClient.toJSON());
        res.status(201).json(newClient);
    }
    catch (error) {
        console.error('Помилка при створенні клієнта:', error);
        res.status(500).json({ error: 'Помилка при створенні клієнта', details: error.message });
    }
};
exports.createClient = createClient;
/**
 * Оновлення існуючого клієнта
 */
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const client = await models_1.Client.findByPk(id);
    if (client) {
        await client.update({
            name,
            phone,
            email
        });
    }
    res.status(200).json(client || { message: 'Клієнта не знайдено' });
};
exports.updateClient = updateClient;
/**
 * Видалення клієнта
 */
const deleteClient = async (req, res) => {
    const { id } = req.params;
    const deleted = await models_1.Client.destroy({ where: { id } });
    res.status(200).json({ message: deleted ? 'Клієнта успішно видалено' : 'Клієнта не знайдено' });
};
exports.deleteClient = deleteClient;
/**
 * Пошук клієнтів за параметрами
 */
const searchClients = async (req, res) => {
    const { q } = req.query;
    const searchQuery = `%${q || ''}%`;
    const clients = await models_1.Client.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { name: { [sequelize_1.Op.iLike]: searchQuery } },
                { phone: { [sequelize_1.Op.iLike]: searchQuery } },
                { email: { [sequelize_1.Op.iLike]: searchQuery } }
            ]
        }
    });
    res.status(200).json(clients);
};
exports.searchClients = searchClients;
