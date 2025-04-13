import { Router } from 'express';
import clientRoutes from './clientRoutes';
import deviceRoutes from './deviceRoutes';
import orderRoutes from './orderRoutes';
const router = Router();
router.use('/clients', clientRoutes);
router.use('/devices', deviceRoutes);
router.use('/orders', orderRoutes);
export default router;
