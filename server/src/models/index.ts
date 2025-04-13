import Client from './Client.js';
import Device from './Device.js';
import Order from './Order.js';
import setupAssociations from './associations.js';

// Встановлюємо асоціації між моделями
setupAssociations();

export {
  Client,
  Device,
  Order
};
