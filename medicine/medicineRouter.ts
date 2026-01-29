import express from 'express'
import { medicineController } from './medicineController';


const router = express.Router();

router.get('/', medicineController.getAllMedicines)
router.get("/:id", medicineController.getMedicineById)

export default router;