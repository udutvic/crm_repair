import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';
class Device extends Model {
}
Device.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'devices',
    timestamps: true,
});
// Встановлення зв'язків між моделями
Device.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Client.hasMany(Device, { foreignKey: 'clientId', as: 'devices' });
export default Device;
