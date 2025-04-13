import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
class Client extends Model {
}
Client.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
}, {
    sequelize,
    tableName: 'clients',
    timestamps: true,
});
export default Client;
