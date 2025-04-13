import Client from './Client';
import Device from './Device';
import Order from './Order';

// Спрощена версія асоціацій між моделями
const setupAssociations = (): void => {
  try {
    // Зв'язок між клієнтами та пристроями
    Client.hasMany(Device, { foreignKey: 'clientId' });
    Device.belongsTo(Client, { foreignKey: 'clientId' });

    // Зв'язок між пристроями та замовленнями
    Device.hasMany(Order, { foreignKey: 'deviceId' });
    Order.belongsTo(Device, { foreignKey: 'deviceId' });
    
    console.log('Асоціації між моделями успішно встановлено');
  } catch (error) {
    console.error('Помилка при встановленні асоціацій:', error);
  }
};

export default setupAssociations;
