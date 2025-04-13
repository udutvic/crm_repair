/**
 * Статуси замовлення на ремонт
 */
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["IN_PROGRESS"] = "inProgress";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELED"] = "canceled"; // Скасовано
})(OrderStatus || (OrderStatus = {}));
