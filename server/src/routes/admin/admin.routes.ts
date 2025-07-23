import { Router } from "express";
import { adminController } from "../../controller/admin.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

// Admin login
router.post("/login", adminController.login);

// Get current admin user info (requires authentication)
router.get("/me", authMiddleware, adminController.getMe);

// Refresh admin access token
router.post("/refresh-token", adminController.refreshToken);

export default router;
