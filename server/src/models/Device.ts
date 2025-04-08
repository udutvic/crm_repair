import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';

interface DeviceAttributes {
  id?: number;
  brand: string;
  model: string;
  serialNumber?: string;
  clientId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Device extends Model<DeviceAttributes> implements DeviceAttributes {
  public id!: number;
  public brand!: string;
  public model!: string;
  public serialNumber!: string;
  public clientId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Device.init(
  {
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
  },
  {
    sequelize,
    tableName: 'devices',
    timestamps: true,
  }
);

// Встановлення зв'язків між моделями
Device.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Client.hasMany(Device, { foreignKey: 'clientId', as: 'devices' });

export default Device;
