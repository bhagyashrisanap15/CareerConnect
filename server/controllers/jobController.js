import mongoose from "mongoose";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";
import Category from "../models/Category.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export const createJob = async (req, res) => {
  try {
    // 1. Resolve or create company for recruiter
    let company = null;
    if (req.body.company && mongoose.Types.ObjectId.isValid(req.body.company)) {
      company = await Company.findOne({ _id: req.body.company, createdBy: req.user._id });
    }
    if (!company) {
      company = await Company.findOne({ createdBy: req.user._id });
    }
    if (!company) {
      const profile = await RecruiterProfile.findOne({ user: req.user._id });
      if (profile?.company) {
        company = await Company.findById(profile.company);
      }
    }
    if (!company) {
      const companyName = req.body.companyName || (typeof req.body.company === 'string' && req.body.company.trim() ? req.body.company.trim() : null) || (req.user.name ? `${req.user.name}'s Company` : "Hiring Company");
      company = await Company.create({
        name: companyName,
        createdBy: req.user._id,
        location: req.body.location || "Remote",
        industry: req.body.category || "Technology",
        isApproved: true
      });
      await RecruiterProfile.findOneAndUpdate(
        { user: req.user._id },
        { company: company._id, companyName: company.name },
        { upsert: true }
      );
    }

    // 2. Resolve category if provided as string or ObjectId
    let categoryId = null;
    if (req.body.category) {
      if (mongoose.Types.ObjectId.isValid(req.body.category)) {
        categoryId = req.body.category;
      } else if (typeof req.body.category === "string" && req.body.category.trim()) {
        let cat = await Category.findOne({ name: { $regex: new RegExp(`^${req.body.category.trim()}$`, "i") } });
        if (!cat) {
          cat = await Category.create({ name: req.body.category.trim() });
        }
        categoryId = cat._id;
      }
    }

    // 3. Normalize type & employmentType
    let type = req.body.type || "job";
    let employmentType = req.body.employmentType || "full-time";
    const rawType = (req.body.type || "").toLowerCase();
    if (rawType.includes("intern")) {
      type = "internship";
    } else {
      type = "job";
    }

    if (rawType.includes("part")) employmentType = "part-time";
    else if (rawType.includes("contract")) employmentType = "contract";
    else if (rawType.includes("remote")) employmentType = "remote";
    else if (req.body.workMode && req.body.workMode.toLowerCase() === "remote") employmentType = "remote";
    else if (!req.body.employmentType) employmentType = "full-time";

    // 4. Normalize skills, requirements, responsibilities
    let skills = req.body.skills || [];
    if (typeof skills === "string") {
      skills = skills.split(",").map(s => s.trim()).filter(Boolean);
    }
    let requirements = req.body.requirements || [];
    if (typeof requirements === "string") {
      requirements = requirements.split("\n").map(s => s.trim().replace(/^[-*•]\s*/, "")).filter(Boolean);
    }
    let responsibilities = req.body.responsibilities || [];
    if (typeof responsibilities === "string") {
      responsibilities = responsibilities.split("\n").map(s => s.trim().replace(/^[-*•]\s*/, "")).filter(Boolean);
    }

    const jobData = {
      ...req.body,
      company: company._id,
      category: categoryId,
      type,
      employmentType,
      skills,
      requirements,
      responsibilities,
      postedBy: req.user._id,
      status: req.body.status || "active"
    };

    const job = await Job.create(jobData);
    const populated = await job.populate(["company", "category"]);
    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).json({ message: error.message || "Failed to create job" });
  }
};

export const getJobs = async (req, res) => {
  const { search, type, location, category, employmentType, page = 1, limit = 10 } = req.query;
  const filter = { status: "active" };
  if (type) filter.type = type;
  if (location) filter.location = { $regex: location, $options: "i" };
  if (category) filter.category = category;
  if (employmentType) filter.employmentType = employmentType;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [jobs, total] = await Promise.all([
    Job.find(filter).populate("company", "name logo location").populate("category", "name").sort("-createdAt").skip(skip).limit(Number(limit)),
    Job.countDocuments(filter)
  ]);
  res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

export const getJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate("company").populate("category");
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

export const updateJob = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (typeof updateData.skills === "string") {
      updateData.skills = updateData.skills.split(",").map(s => s.trim()).filter(Boolean);
    }
    if (typeof updateData.requirements === "string") {
      updateData.requirements = updateData.requirements.split("\n").map(s => s.trim().replace(/^[-*•]\s*/, "")).filter(Boolean);
    }
    if (typeof updateData.responsibilities === "string") {
      updateData.responsibilities = updateData.responsibilities.split("\n").map(s => s.trim().replace(/^[-*•]\s*/, "")).filter(Boolean);
    }
    if (updateData.type) {
      const rawType = updateData.type.toLowerCase();
      if (rawType.includes("intern")) updateData.type = "internship";
      else updateData.type = "job";
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).populate("company category");

    if (!job) return res.status(404).json({ message: "Job not found or not authorized" });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found or not authorized" });
  await Application.deleteMany({ job: job._id });
  res.json({ message: "Job deleted" });
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate("company", "name logo location")
      .populate("category", "name")
      .sort("-createdAt")
      .lean();

    const jobIds = jobs.map(j => j._id);
    const applicantCounts = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      { $group: { _id: "$job", count: { $sum: 1 } } }
    ]);

    const countMap = {};
    applicantCounts.forEach(c => {
      countMap[c._id.toString()] = c.count;
    });

    const result = jobs.map(j => ({
      ...j,
      applicantsCount: countMap[j._id.toString()] || 0
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecruiterStats = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    const jobIds = jobs.map(j => j._id);
    const activeJobs = jobs.filter(j => j.status === "active").length;

    const [totalApplicants, shortlisted, hired] = await Promise.all([
      Application.countDocuments({ job: { $in: jobIds } }),
      Application.countDocuments({ job: { $in: jobIds }, status: "shortlisted" }),
      Application.countDocuments({ job: { $in: jobIds }, status: "selected" })
    ]);

    res.json({
      activeJobs,
      totalApplicants,
      shortlisted,
      hired
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
