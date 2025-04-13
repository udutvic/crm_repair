"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
/**
 * Статуси замовлення на ремонт
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["IN_PROGRESS"] = "inProgress";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELED"] = "canceled"; // Скасовано
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
