import { Request, Response } from 'express';
import { Client } from '../models';
import sequelize from '../config/database';
import { Op } from 'sequelize';

/**
 * Отримання всіх клієнтів
 */
export const getAllClients = async (req: Request, res: Response): Promise<void> => {
  const clients = await Client.findAll();
  res.status(200).json(clients);
};

/**
 * Отримання клієнта за ID
 */
export const getClientById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const client = await Client.findByPk(id);
  res.status(200).json(client || { message: 'Клієнта не знайдено' });
};

/**
 * Створення нового клієнта
 */
export const createClient = async (req: Request, res: Response): Promise<void> => {
  const { name, phone, email } = req.body;
  const newClient = await Client.create({
    name,
    phone,
    email
  });
  res.status(201).json(newClient);
};

/**
 * Оновлення існуючого клієнта
 */
export const updateClient = async (req: Request, res: Response): Promise<void> => {
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
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deleted = await Client.destroy({ where: { id } });
  res.status(200).json({ message: deleted ? 'Клієнта успішно видалено' : 'Клієнта не знайдено' });
};

/**
 * Пошук клієнтів за параметрами
 */
export const searchClients = async (req: Request, res: Response): Promise<void> => {
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
