import { Router } from 'express';
import clientRoutes from './clientRoutes.js';
import deviceRoutes from './deviceRoutes.js';
import orderRoutes from './orderRoutes.js';

const router = Router();

router.use('/clients', clientRoutes);
router.use('/devices', deviceRoutes);
router.use('/orders', orderRoutes);

export default router;
