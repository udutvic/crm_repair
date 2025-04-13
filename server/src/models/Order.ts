import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Device from './Device';

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface OrderAttributes {
  id?: number;
  deviceId: number;
  problem: string;
  status: OrderStatus;
  createdAt?: Date;
  completedAt?: Date;
  price?: number;
  updatedAt?: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public deviceId!: number;
  public problem!: string;
  public status!: OrderStatus;
  public price!: number;
  public completedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
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
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);

// Встановлення зв'язків між моделями
Order.belongsTo(Device, { foreignKey: 'deviceId', as: 'device' });
Device.hasMany(Order, { foreignKey: 'deviceId', as: 'orders' });

export default Order;
