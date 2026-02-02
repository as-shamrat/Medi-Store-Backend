import express from 'express'
import { requireAuth } from '../middleware/requireAuth';
import { sellerController } from './sellerController';


const router = express.Router();


router.get("/orders", requireAuth('SELLER'), sellerController.getSellerOrders)
router.get("/orders/:id", requireAuth('SELLER'), sellerController.getSellerOrder)
router.patch("/orders/:id", requireAuth('SELLER'), sellerController.updateOrder)
router.get("/medicines", requireAuth('SELLER'), sellerController.getSellerMedicines)
router.post("/medicines", requireAuth('SELLER'), sellerController.addMedicine)
router.put("/medicines/:id", requireAuth('SELLER'), sellerController.updateMedicine)
router.delete("/medicines/:id", requireAuth('SELLER'), sellerController.deleteMedicine)

export default router;