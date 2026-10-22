import { Router } from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import Company from "../models/Company.js";
import User from "../models/User.js";

const router = Router();
router.use(protect, authorize("recruiter"));

// Get Recruiter Profile
router.get("/profile", async (req, res) => {
  try {
    let profile = await RecruiterProfile.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar bio")
      .populate("company");

    if (!profile) {
      let company = await Company.findOne({ createdBy: req.user._id });
      profile = await RecruiterProfile.create({
        user: req.user._id,
        company: company ? company._id : null,
        companyName: company ? company.name : ""
      });
      profile = await RecruiterProfile.findById(profile._id)
        .populate("user", "name email phone avatar bio")
        .populate("company");
    } else if (!profile.company) {
      const comp = await Company.findOne({ createdBy: req.user._id });
      if (comp) {
        profile.company = comp._id;
        profile.companyName = comp.name;
        await profile.save();
        profile = await RecruiterProfile.findById(profile._id)
          .populate("user", "name email phone avatar bio")
          .populate("company");
      }
    }

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Recruiter Profile
router.put("/profile", async (req, res) => {
  try {
    const {
      name,
      phone,
      bio,
      designation,
      companyName,
      companyWebsite,
      companyLocation,
      companyDescription,
      companyIndustry,
      companySize
    } = req.body;

    // 1. Update User basic info
    const userUpdate = {};
    if (name) userUpdate.name = name.trim();
    if (phone !== undefined) userUpdate.phone = phone.trim();
    if (bio !== undefined) userUpdate.bio = bio.trim();

    if (Object.keys(userUpdate).length > 0) {
      await User.findByIdAndUpdate(req.user._id, userUpdate);
    }

    // 2. Fetch or create RecruiterProfile
    let profile = await RecruiterProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = await RecruiterProfile.create({ user: req.user._id });
    }

    // 3. Resolve or update company
    let company = null;
    if (profile.company) {
      company = await Company.findById(profile.company);
    }
    if (!company) {
      company = await Company.findOne({ createdBy: req.user._id });
    }

    const compUpdate = {};
    if (companyName) compUpdate.name = companyName.trim();
    if (companyWebsite !== undefined) compUpdate.website = companyWebsite.trim();
    if (companyLocation !== undefined) compUpdate.location = companyLocation.trim();
    if (companyDescription !== undefined) compUpdate.description = companyDescription.trim();
    if (companyIndustry !== undefined) compUpdate.industry = companyIndustry.trim();
    if (companySize !== undefined) compUpdate.size = companySize.trim();

    if (company) {
      if (Object.keys(compUpdate).length > 0) {
        company = await Company.findByIdAndUpdate(company._id, compUpdate, { new: true });
      }
    } else if (companyName && companyName.trim()) {
      company = await Company.create({
        name: companyName.trim(),
        website: companyWebsite || "",
        location: companyLocation || "",
        description: companyDescription || "",
        industry: companyIndustry || "Technology",
        size: companySize || "",
        createdBy: req.user._id,
        isApproved: true
      });
    }

    // 4. Update RecruiterProfile
    const profileUpdate = {};
    if (designation !== undefined) profileUpdate.designation = designation.trim();
    if (phone !== undefined) profileUpdate.phone = phone.trim();
    if (bio !== undefined) profileUpdate.bio = bio.trim();
    if (company) {
      profileUpdate.company = company._id;
      profileUpdate.companyName = company.name;
    } else if (companyName) {
      profileUpdate.companyName = companyName.trim();
    }

    const updatedProfile = await RecruiterProfile.findOneAndUpdate(
      { user: req.user._id },
      profileUpdate,
      { new: true, upsert: true }
    )
      .populate("user", "name email phone avatar bio")
      .populate("company");

    res.json({ success: true, profile: updatedProfile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
