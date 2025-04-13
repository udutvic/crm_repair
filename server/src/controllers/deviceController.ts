import { Request, Response } from 'express';
import { Device, Client } from '../models';
import { Op } from 'sequelize';

/**
 * Отримання всіх пристроїв
 */
export const getAllDevices = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Запит на отримання всіх пристроїв');
    const devices = await Device.findAll({
      include: [{ model: Client }]
    });
    res.status(200).json(devices);
  } catch (error: any) {
    console.error('Помилка при отриманні пристроїв:', error);
    res.status(500).json({ error: 'Помилка при отриманні пристроїв', details: error.message });
  }
};

/**
 * Отримання пристрою за ID
 */
export const getDeviceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`Запит на отримання пристрою з ID: ${id}`);
    
    const device = await Device.findByPk(id, {
      include: [{ model: Client }]
    });
    
    if (!device) {
      console.log(`Пристрій з ID ${id} не знайдено`);
      res.status(404).json({ message: 'Пристрій не знайдено' });
      return;
    }
    
    res.status(200).json(device);
  } catch (error: any) {
    console.error(`Помилка при отриманні пристрою:`, error);
    res.status(500).json({ error: 'Помилка при отриманні пристрою', details: error.message });
  }
};

/**
 * Створення нового пристрою
 */
/**
 * Пошук пристроїв за параметрами
 */
export const searchDevices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;
    console.log(`Пошук пристроїв за запитом: ${query}`);
    
    const devices = await Device.findAll({
      where: {
        [Op.or]: [
          { brand: { [Op.like]: `%${query}%` } },
          { model: { [Op.like]: `%${query}%` } },
          { serialNumber: { [Op.like]: `%${query}%` } }
        ]
      },
      include: [{ model: Client }]
    });
    
    res.status(200).json(devices);
  } catch (error: any) {
    console.error('Помилка при пошуку пристроїв:', error);
    res.status(500).json({ error: 'Помилка при пошуку пристроїв', details: error.message });
  }
};

/**
 * Отримання пристроїв за ID клієнта
 */
export const getDevicesByClientId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientId } = req.params;
    console.log(`Запит на отримання пристроїв для клієнта з ID: ${clientId}`);
    
    const devices = await Device.findAll({
      where: { clientId },
      include: [{ model: Client }]
    });
    
    res.status(200).json(devices);
  } catch (error: any) {
    console.error(`Помилка при отриманні пристроїв клієнта:`, error);
    res.status(500).json({ error: 'Помилка при отриманні пристроїв клієнта', details: error.message });
  }
};

/**
 * Створення нового пристрою
 */
export const createDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Отримано запит на створення пристрою:', req.body);
    const { brand, model, serialNumber, clientId } = req.body;
    
    if (!brand || !model || !clientId) {
      console.log('Помилка: відсутні обов\'язкові поля');
      res.status(400).json({ error: 'Бренд, модель та ID клієнта є обов\'язковими полями' });
      return;
    }
    
    // Перевірка існування клієнта
    const client = await Client.findByPk(clientId);
    if (!client) {
      console.log(`Клієнт з ID ${clientId} не знайдено`);
      res.status(404).json({ error: 'Клієнт не знайдено' });
      return;
    }
    
    const newDevice = await Device.create({
      brand,
      model,
      serialNumber,
      clientId
    });
    
    console.log('Пристрій успішно створено:', newDevice.toJSON());
    res.status(201).json(newDevice);
  } catch (error: any) {
    console.error('Помилка при створенні пристрою:', error);
    res.status(500).json({ error: 'Помилка при створенні пристрою', details: error.message });
  }
};

/**
 * Оновлення існуючого пристрою
 */
export const updateDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`Запит на оновлення пристрою з ID: ${id}`, req.body);
    
    const { brand, model, serialNumber, clientId } = req.body;
    
    const device = await Device.findByPk(id);
    if (!device) {
      console.log(`Пристрій з ID ${id} не знайдено`);
      res.status(404).json({ error: 'Пристрій не знайдено' });
      return;
    }
    
    // Якщо передано clientId, перевіряємо існування клієнта
    if (clientId) {
      const client = await Client.findByPk(clientId);
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
  } catch (error: any) {
    console.error('Помилка при оновленні пристрою:', error);
    res.status(500).json({ error: 'Помилка при оновленні пристрою', details: error.message });
  }
};

/**
 * Видалення пристрою
 */
export const deleteDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`Запит на видалення пристрою з ID: ${id}`);
    
    const device = await Device.findByPk(id);
    if (!device) {
      console.log(`Пристрій з ID ${id} не знайдено`);
      res.status(404).json({ error: 'Пристрій не знайдено' });
      return;
    }
    
    await device.destroy();
    console.log(`Пристрій з ID ${id} успішно видалено`);
    res.status(200).json({ message: 'Пристрій успішно видалено' });
  } catch (error: any) {
    console.error('Помилка при видаленні пристрою:', error);
    res.status(500).json({ error: 'Помилка при видаленні пристрою', details: error.message });
  }
};
