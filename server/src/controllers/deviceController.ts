import { Request, Response } from 'express';
import { Device, Client } from '../models';
import { Op } from 'sequelize';

/**
 * Отримання всіх пристроїв
 */
export const getAllDevices = async (req: Request, res: Response): Promise<void> => {
  const devices = await Device.findAll({
    include: [{ model: Client, as: 'client' }]
  });
  res.status(200).json(devices);
};

/**
 * Отримання пристрою за ID
 */
export const getDeviceById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const device = await Device.findByPk(id, {
    include: [{ model: Client, as: 'client' }]
  });
  res.status(200).json(device || { message: 'Пристрій не знайдено' });
};

/**
 * Отримання пристроїв за ID клієнта
 */
export const getDevicesByClientId = async (req: Request, res: Response): Promise<void> => {
  const { clientId } = req.params;
  const devices = await Device.findAll({
    where: { clientId },
    include: [{ model: Client, as: 'client' }]
  });
  res.status(200).json(devices);
};

/**
 * Створення нового пристрою
 */
export const createDevice = async (req: Request, res: Response): Promise<void> => {
  const { brand, model, serialNumber, clientId } = req.body;
  
  const newDevice = await Device.create({
    brand,
    model,
    serialNumber,
    clientId
  });

  const deviceWithClient = await Device.findByPk(newDevice.id, {
    include: [{ model: Client, as: 'client' }]
  });

  res.status(201).json(deviceWithClient);
};

/**
 * Оновлення існуючого пристрою
 */
export const updateDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { brand, model, serialNumber, clientId } = req.body;
    
    console.log('Отримано запит на оновлення пристрою:', id);
    console.log('Тіло запиту:', req.body);

    const device = await Device.findByPk(id);
    if (!device) {
      console.log(`Помилка: Пристрій з ID ${id} не знайдено`);
      res.status(404).json({ message: `Пристрій з ID ${id} не знайдено` });
      return;
    }
    
    console.log('Знайдено пристрій:', device.toJSON());
    console.log('Оновлюю пристрій з наступними даними:', {
      brand,
      model,
      serialNumber,
      clientId
    });
    
    await device.update({
      brand,
      model,
      serialNumber,
      clientId
    });
    
    console.log('Пристрій успішно оновлено');
  } catch (error) {
    console.error('Помилка при оновленні пристрою:', error);
    res.status(500).json({ message: 'Помилка при оновленні пристрою' });
    return;
  }

  try {
    const { id } = req.params;
    const updatedDevice = await Device.findByPk(id, {
      include: [{ model: Client, as: 'client' }]
    });

    res.status(200).json(updatedDevice || { message: 'Пристрій не знайдено' });
  } catch (error) {
    console.error('Помилка при отриманні оновленого пристрою:', error);
    res.status(500).json({ message: 'Помилка при отриманні оновленого пристрою' });
  }
};

/**
 * Видалення пристрою
 */
export const deleteDevice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deleted = await Device.destroy({ where: { id } });
  res.status(200).json({ message: deleted ? 'Пристрій успішно видалено' : 'Пристрій не знайдено' });
};

/**
 * Пошук пристроїв за параметрами
 */
export const searchDevices = async (req: Request, res: Response): Promise<void> => {
  const { q } = req.query;
  const searchQuery = `%${q || ''}%`;
  
  const devices = await Device.findAll({
    where: {
      [Op.or]: [
        { brand: { [Op.iLike]: searchQuery } },
        { model: { [Op.iLike]: searchQuery } },
        { serialNumber: { [Op.iLike]: searchQuery } }
      ]
    },
    include: [{ model: Client, as: 'client' }]
  });

  res.status(200).json(devices);
};
