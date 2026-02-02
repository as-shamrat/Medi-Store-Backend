
import express from 'express'
import { adminController } from './adminController';
import { requireAuth } from '../middleware/requireAuth';

const router = express.Router();

router.get('/users', requireAuth('ADMIN'), adminController.getAllUsers)
router.patch('/users/:id', requireAuth('ADMIN'), adminController.updateUser)
router.get("/orders", requireAuth('ADMIN'), adminController.getAdminOrders)
router.patch('/orders/:id', requireAuth('ADMIN'), adminController.updateAdminOrder)




export default router