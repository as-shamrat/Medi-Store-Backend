import express from 'express'
import { requireAuth } from '../middleware/requireAuth';
import { sellerController } from './sellerController';


const router = express.Router();

router.post("/medicines", requireAuth('SELLER'), sellerController.addMedicine)
router.put("/medicines/:id", requireAuth('SELLER'), sellerController.updateMedicine)
router.delete("/medicines/:id", requireAuth('SELLER'), sellerController.deleteMedicine)

export default router;