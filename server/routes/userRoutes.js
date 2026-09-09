import { Router } from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { me, updateAuthProfile } from "../controllers/authController.js";
import { getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const router = Router();

// Profile endpoints for logged-in users
router.get("/profile", protect, me);
router.put("/profile", protect, updateAuthProfile);

// Admin-only management endpoints
router.get("/", protect, authorize("admin"), getUsers);
router.put("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
