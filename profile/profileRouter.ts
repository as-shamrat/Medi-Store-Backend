
import express from 'express'
import { requireAuth } from '../middleware/requireAuth';
import { profileController } from './profileController';


const router = express.Router();

router.put("/me", requireAuth('SELLER', 'CUSTOMER', 'ADMIN'), profileController.updateProfile)

export default router;