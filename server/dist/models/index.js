import Client from './Client';
import Device from './Device';
import Order from './Order';
import setupAssociations from './associations';
// Встановлюємо асоціації між моделями
setupAssociations();
export { Client, Device, Order };
