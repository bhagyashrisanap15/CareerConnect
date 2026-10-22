import { Router } from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  getJobApplicants,
  updateApplicationStatus,
  withdrawApplication,
  getApplicationDetail
} from "../controllers/applicationController.js";

const router = Router();
router.post("/job/:jobId", protect, authorize("student"), applyForJob);
router.post("/:jobId", protect, authorize("student"), applyForJob);
router.get("/my", protect, authorize("student"), getMyApplications);
router.get("/recruiter", protect, authorize("recruiter"), getRecruiterApplications);
router.get("/detail/:id", protect, getApplicationDetail);
router.get("/job/:jobId", protect, authorize("recruiter"), getJobApplicants);
router.patch("/:id/status", protect, authorize("recruiter"), updateApplicationStatus);
router.patch("/:id/withdraw", protect, authorize("student"), withdrawApplication);
export default router;

