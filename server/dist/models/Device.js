"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Client_1 = __importDefault(require("./Client"));
class Device extends sequelize_1.Model {
}
Device.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    serialNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    clientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'devices',
    timestamps: true,
});
// Встановлення зв'язків між моделями
Device.belongsTo(Client_1.default, { foreignKey: 'clientId', as: 'client' });
Client_1.default.hasMany(Device, { foreignKey: 'clientId', as: 'devices' });
exports.default = Device;
