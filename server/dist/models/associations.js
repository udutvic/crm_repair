"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./Client"));
const Device_1 = __importDefault(require("./Device"));
const Order_1 = __importDefault(require("./Order"));
// Спрощена версія асоціацій між моделями
const setupAssociations = () => {
    try {
        // Зв'язок між клієнтами та пристроями
        Client_1.default.hasMany(Device_1.default, { foreignKey: 'clientId' });
        Device_1.default.belongsTo(Client_1.default, { foreignKey: 'clientId' });
        // Зв'язок між пристроями та замовленнями
        Device_1.default.hasMany(Order_1.default, { foreignKey: 'deviceId' });
        Order_1.default.belongsTo(Device_1.default, { foreignKey: 'deviceId' });
        console.log('Асоціації між моделями успішно встановлено');
    }
    catch (error) {
        console.error('Помилка при встановленні асоціацій:', error);
    }
};
exports.default = setupAssociations;
