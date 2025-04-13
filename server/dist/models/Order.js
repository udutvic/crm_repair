import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Device from './Device.js';
class Order extends Model {
}
Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'devices',
            key: 'id',
        },
    },
    problem: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
});
// Встановлення зв'язків між моделями
Order.belongsTo(Device, { foreignKey: 'deviceId', as: 'device' });
Device.hasMany(Order, { foreignKey: 'deviceId', as: 'orders' });
export default Order;
