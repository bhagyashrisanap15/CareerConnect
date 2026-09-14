import { Router } from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getUsers,
  updateUser,
  deleteUser,
  dashboardStats,
  toggleUserBlock,
  getAdminJobs,
  deleteAdminJob,
  getAdminCompanies,
  approveCompany,
  deleteAdminCompany,
  getAdminApplications
} from "../controllers/userController.js";

const router = Router();
router.use(protect, authorize("admin"));

router.get("/dashboard", dashboardStats);
router.get("/stats", dashboardStats);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.patch("/users/:id/block", toggleUserBlock);
router.delete("/users/:id", deleteUser);

router.get("/jobs", getAdminJobs);
router.delete("/jobs/:id", deleteAdminJob);

router.get("/companies", getAdminCompanies);
router.patch("/companies/:id/approve", approveCompany);
router.delete("/companies/:id", deleteAdminCompany);

router.get("/applications", getAdminApplications);

export default router;
