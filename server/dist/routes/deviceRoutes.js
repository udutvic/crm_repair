"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
/**
 * @route GET /api/devices
 * @desc Отримати всі пристрої
 * @access Public
 */
router.get('/', controllers_1.deviceController.getAllDevices);
/**
 * @route GET /api/devices/search
 * @desc Пошук пристроїв за параметрами
 * @access Public
 */
router.get('/search', controllers_1.deviceController.searchDevices);
/**
 * @route GET /api/devices/client/:clientId
 * @desc Отримати пристрої за ID клієнта
 * @access Public
 */
router.get('/client/:clientId', controllers_1.deviceController.getDevicesByClientId);
/**
 * @route GET /api/devices/:id
 * @desc Отримати пристрій за ID
 * @access Public
 */
router.get('/:id', controllers_1.deviceController.getDeviceById);
/**
 * @route POST /api/devices
 * @desc Створити новий пристрій
 * @access Public
 */
router.post('/', controllers_1.deviceController.createDevice);
/**
 * @route PUT /api/devices/:id
 * @desc Оновити існуючий пристрій
 * @access Public
 */
router.put('/:id', controllers_1.deviceController.updateDevice);
/**
 * @route DELETE /api/devices/:id
 * @desc Видалити пристрій
 * @access Public
 */
router.delete('/:id', controllers_1.deviceController.deleteDevice);
exports.default = router;
