import express from 'express'
import { orderController } from './orderController';
import { requireAuth } from '../middleware/requireAuth';

const router = express.Router();

router.get('/', requireAuth('CUSTOMER'), orderController.getOrders)
router.get("/:id", requireAuth('CUSTOMER'), orderController.getOrderById)
router.post('/', requireAuth('CUSTOMER'), orderController.createOrder)

export default router;