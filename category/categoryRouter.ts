
import express from 'express'
import { categoryController } from './categoryController';
import { requireAuth } from '../middleware/requireAuth';


const router = express.Router();

router.get("/", categoryController.getCategories)
router.post("/", requireAuth('ADMIN'), categoryController.addCategory)
router.patch("/:id", requireAuth('ADMIN'), categoryController.updateCategory)

export default router;