import { Router } from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
  getRecruiterStats
} from "../controllers/jobController.js";

const router = Router();

// Recruiter specific endpoints (Must be declared before /:id)
router.get("/recruiter/my-jobs", protect, authorize("recruiter"), getRecruiterJobs);
router.get("/recruiter/stats", protect, authorize("recruiter"), getRecruiterStats);

// Public / General endpoints
router.get("/", getJobs);
router.get("/:id", getJob);

// Protected recruiter actions
router.post("/", protect, authorize("recruiter"), createJob);
router.put("/:id", protect, authorize("recruiter"), updateJob);
router.delete("/:id", protect, authorize("recruiter"), deleteJob);

export default router;

