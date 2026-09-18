import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  changePassword,
  updateAuthProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authRateLimiter } from "../middleware/securityMiddleware.js";

const router = Router();

router.post("/signup", authRateLimiter, register);
router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/logout", logout);
router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password/:token", authRateLimiter, resetPassword);
router.post("/reset-password", authRateLimiter, resetPassword);
router.get("/me", protect, me);
router.put("/change-password", protect, changePassword);
router.put("/profile", protect, updateAuthProfile);

export default router;
