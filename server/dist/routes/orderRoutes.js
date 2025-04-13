"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
/**
 * @route GET /api/orders
 * @desc Отримати всі замовлення
 * @access Public
 */
router.get('/', controllers_1.orderController.getAllOrders);
/**
 * @route GET /api/orders/search
 * @desc Пошук замовлень за параметрами
 * @access Public
 */
router.get('/search', controllers_1.orderController.searchOrders);
/**
 * @route GET /api/orders/date
 * @desc Отримати замовлення за датою
 * @access Public
 */
router.get('/date', controllers_1.orderController.getOrdersByDate);
/**
 * @route GET /api/orders/status/:status
 * @desc Отримати замовлення за статусом
 * @access Public
 */
router.get('/status/:status', controllers_1.orderController.getOrdersByStatus);
/**
 * @route GET /api/orders/:id
 * @desc Отримати замовлення за ID
 * @access Public
 */
router.get('/:id', controllers_1.orderController.getOrderById);
/**
 * @route POST /api/orders
 * @desc Створити нове замовлення
 * @access Public
 */
router.post('/', controllers_1.orderController.createOrder);
/**
 * @route PUT /api/orders/:id
 * @desc Оновити існуюче замовлення
 * @access Public
 */
router.put('/:id', controllers_1.orderController.updateOrder);
/**
 * @route PATCH /api/orders/:id/status
 * @desc Оновити статус замовлення
 * @access Public
 */
router.patch('/:id/status', controllers_1.orderController.updateOrderStatus);
/**
 * @route DELETE /api/orders/:id
 * @desc Видалити замовлення
 * @access Public
 */
router.delete('/:id', controllers_1.orderController.deleteOrder);
exports.default = router;
