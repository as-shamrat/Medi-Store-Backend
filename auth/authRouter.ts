import { Request, Response, Router } from "express";
import { auth } from "../lib/auth";
import { authController } from "./authController";
import { requireAuth } from "../middleware/requireAuth";


const router = Router();

// router.get('/me', authController.getProfile);
router.get('/me', requireAuth('CUSTOMER', 'SELLER', 'ADMIN'), authController.getMe);
router.get('/get-session', requireAuth('CUSTOMER', 'SELLER', 'ADMIN'), authController.getSession);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", requireAuth('CUSTOMER', 'SELLER', 'ADMIN'), authController.logout);

export default router;