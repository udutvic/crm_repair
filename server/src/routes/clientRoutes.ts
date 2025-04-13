import { Router } from 'express';
import { clientController } from '../controllers/index.js';

const router = Router();

/**
 * @route GET /api/clients
 * @desc Отримати всіх клієнтів
 * @access Public
 */
router.get('/', clientController.getAllClients);

/**
 * @route GET /api/clients/search
 * @desc Пошук клієнтів за параметрами
 * @access Public
 */
router.get('/search', clientController.searchClients);

/**
 * @route GET /api/clients/:id
 * @desc Отримати клієнта за ID
 * @access Public
 */
router.get('/:id', clientController.getClientById);

/**
 * @route POST /api/clients
 * @desc Створити нового клієнта
 * @access Public
 */
router.post('/', clientController.createClient);

/**
 * @route PUT /api/clients/:id
 * @desc Оновити існуючого клієнта
 * @access Public
 */
router.put('/:id', clientController.updateClient);

/**
 * @route DELETE /api/clients/:id
 * @desc Видалити клієнта
 * @access Public
 */
router.delete('/:id', clientController.deleteClient);

export default router;
