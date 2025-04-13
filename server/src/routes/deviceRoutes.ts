import { Router } from 'express';
import { deviceController } from '../controllers/index.js';

const router = Router();

/**
 * @route GET /api/devices
 * @desc Отримати всі пристрої
 * @access Public
 */
router.get('/', deviceController.getAllDevices);

/**
 * @route GET /api/devices/search
 * @desc Пошук пристроїв за параметрами
 * @access Public
 */
router.get('/search', deviceController.searchDevices);

/**
 * @route GET /api/devices/client/:clientId
 * @desc Отримати пристрої за ID клієнта
 * @access Public
 */
router.get('/client/:clientId', deviceController.getDevicesByClientId);

/**
 * @route GET /api/devices/:id
 * @desc Отримати пристрій за ID
 * @access Public
 */
router.get('/:id', deviceController.getDeviceById);

/**
 * @route POST /api/devices
 * @desc Створити новий пристрій
 * @access Public
 */
router.post('/', deviceController.createDevice);

/**
 * @route PUT /api/devices/:id
 * @desc Оновити існуючий пристрій
 * @access Public
 */
router.put('/:id', deviceController.updateDevice);

/**
 * @route DELETE /api/devices/:id
 * @desc Видалити пристрій
 * @access Public
 */
router.delete('/:id', deviceController.deleteDevice);

export default router;
