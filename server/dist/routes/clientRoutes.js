"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
/**
 * @route GET /api/clients
 * @desc Отримати всіх клієнтів
 * @access Public
 */
router.get('/', controllers_1.clientController.getAllClients);
/**
 * @route GET /api/clients/search
 * @desc Пошук клієнтів за параметрами
 * @access Public
 */
router.get('/search', controllers_1.clientController.searchClients);
/**
 * @route GET /api/clients/:id
 * @desc Отримати клієнта за ID
 * @access Public
 */
router.get('/:id', controllers_1.clientController.getClientById);
/**
 * @route POST /api/clients
 * @desc Створити нового клієнта
 * @access Public
 */
router.post('/', controllers_1.clientController.createClient);
/**
 * @route PUT /api/clients/:id
 * @desc Оновити існуючого клієнта
 * @access Public
 */
router.put('/:id', controllers_1.clientController.updateClient);
/**
 * @route DELETE /api/clients/:id
 * @desc Видалити клієнта
 * @access Public
 */
router.delete('/:id', controllers_1.clientController.deleteClient);
exports.default = router;
