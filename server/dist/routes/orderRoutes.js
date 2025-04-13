import { Router } from 'express';
import { orderController } from '../controllers/index.js';
const router = Router();
/**
 * @route GET /api/orders
 * @desc Отримати всі замовлення
 * @access Public
 */
router.get('/', orderController.getAllOrders);
/**
 * @route GET /api/orders/search
 * @desc Пошук замовлень за параметрами
 * @access Public
 */
router.get('/search', orderController.searchOrders);
/**
 * @route GET /api/orders/date
 * @desc Отримати замовлення за датою
 * @access Public
 */
router.get('/date', orderController.getOrdersByDate);
/**
 * @route GET /api/orders/status/:status
 * @desc Отримати замовлення за статусом
 * @access Public
 */
router.get('/status/:status', orderController.getOrdersByStatus);
/**
 * @route GET /api/orders/:id
 * @desc Отримати замовлення за ID
 * @access Public
 */
router.get('/:id', orderController.getOrderById);
/**
 * @route POST /api/orders
 * @desc Створити нове замовлення
 * @access Public
 */
router.post('/', orderController.createOrder);
/**
 * @route PUT /api/orders/:id
 * @desc Оновити існуюче замовлення
 * @access Public
 */
router.put('/:id', orderController.updateOrder);
/**
 * @route PATCH /api/orders/:id/status
 * @desc Оновити статус замовлення
 * @access Public
 */
router.patch('/:id/status', orderController.updateOrderStatus);
/**
 * @route DELETE /api/orders/:id
 * @desc Видалити замовлення
 * @access Public
 */
router.delete('/:id', orderController.deleteOrder);
export default router;
