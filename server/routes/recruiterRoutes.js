import { Router } from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import Company from "../models/Company.js";

const router = Router();
router.use(protect, authorize("recruiter"));

// Get Recruiter Profile
router.get("/profile", async (req, res) => {
  try {
    let profile = await RecruiterProfile.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar bio")
      .populate("company");
    if (!profile) {
      profile = await RecruiterProfile.create({ user: req.user._id });
    }
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Recruiter Profile
router.put("/profile", async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
