"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Device = exports.Client = void 0;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
const Device_1 = __importDefault(require("./Device"));
exports.Device = Device_1.default;
const Order_1 = __importDefault(require("./Order"));
exports.Order = Order_1.default;
const associations_1 = __importDefault(require("./associations"));
// Встановлюємо асоціації між моделями
(0, associations_1.default)();
