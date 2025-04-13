import { Client } from '../models/index.js';
import { Op } from 'sequelize';
/**
 * Отримання всіх клієнтів
 */
export const getAllClients = async (req, res) => {
    const clients = await Client.findAll();
    res.status(200).json(clients);
};
/**
 * Отримання клієнта за ID
 */
export const getClientById = async (req, res) => {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    res.status(200).json(client || { message: 'Клієнта не знайдено' });
};
/**
 * Створення нового клієнта
 */
export const createClient = async (req, res) => {
    try {
        console.log('Отримано запит на створення клієнта:', req.body);
        const { name, phone, email } = req.body;
        if (!name || !phone) {
            console.log('Помилка: відсутні обов\'язкові поля');
            res.status(400).json({ error: 'Ім\'я та телефон є обов\'язковими полями' });
            return;
        }
        const newClient = await Client.create({
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
/**
 * Оновлення існуючого клієнта
 */
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const client = await Client.findByPk(id);
    if (client) {
        await client.update({
            name,
            phone,
            email
        });
    }
    res.status(200).json(client || { message: 'Клієнта не знайдено' });
};
/**
 * Видалення клієнта
 */
export const deleteClient = async (req, res) => {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });
    res.status(200).json({ message: deleted ? 'Клієнта успішно видалено' : 'Клієнта не знайдено' });
};
/**
 * Пошук клієнтів за параметрами
 */
export const searchClients = async (req, res) => {
    const { q } = req.query;
    const searchQuery = `%${q || ''}%`;
    const clients = await Client.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: searchQuery } },
                { phone: { [Op.iLike]: searchQuery } },
                { email: { [Op.iLike]: searchQuery } }
            ]
        }
    });
    res.status(200).json(clients);
};
