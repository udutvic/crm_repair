import Client from './models/Client';
import Device from './models/Device';
import Order from './models/Order';

/**
 * Заповнює базу даних тестовими даними
 */
const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Створення тестових клієнтів...');
    const client1 = await Client.create({
      name: 'Іван Петренко',
      phone: '+380991234567',
      email: 'ivan@example.com'
    });

    const client2 = await Client.create({
      name: 'Марія Коваленко',
      phone: '+380992345678',
      email: 'maria@example.com'
    });

    console.log('Створення тестових пристроїв...');
    const device1 = await Device.create({
      brand: 'Samsung',
      model: 'Galaxy S21',
      serialNumber: 'SN12345678',
      clientId: client1.id
    });

    const device2 = await Device.create({
      brand: 'iPhone',
      model: '13 Pro',
      serialNumber: 'IP98765432',
      clientId: client2.id
    });

    console.log('Створення тестових замовлень...');
    await Order.create({
      deviceId: device1.id,
      problem: 'Заміна екрану',
      status: 'in_progress',
      price: 2500
    });

    await Order.create({
      deviceId: device2.id,
      problem: 'Заміна батареї',
      status: 'pending',
      price: 1800
    });

    console.log('✅ Тестові дані успішно додано');
  } catch (error) {
    console.error('❌ Помилка при заповненні бази даних:', error);
  }
};

export default seedDatabase;
