import express from 'express'
import { categoryController } from './categoryController';

const router = express.Router();

router.get("/", categoryController.getCategories)

export default router;