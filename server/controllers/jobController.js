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
    const requestedCompanyName = req.body.companyName ? req.body.companyName.trim() : null;

    if (req.body.company && mongoose.Types.ObjectId.isValid(req.body.company)) {
      const found = await Company.findById(req.body.company);
      if (found && (!requestedCompanyName || found.name.toLowerCase() === requestedCompanyName.toLowerCase())) {
        company = found;
      }
    }
    if (!company && requestedCompanyName) {
      company = await Company.findOne({ name: { $regex: new RegExp(`^${requestedCompanyName}$`, "i") } });
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
      const companyName = requestedCompanyName || (typeof req.body.company === 'string' && req.body.company.trim() ? req.body.company.trim() : null) || (req.user.name ? `${req.user.name}'s Company` : "Hiring Company");
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
          try {
            cat = await Category.create({ name: req.body.category.trim() });
          } catch {
            cat = await Category.findOne({ name: { $regex: new RegExp(`^${req.body.category.trim()}$`, "i") } });
          }
        }
        if (cat) {
          categoryId = cat._id;
        }
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
    else if (req.body.employmentType) employmentType = req.body.employmentType;
    else employmentType = "full-time";

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
      type,
      employmentType,
      skills,
      requirements,
      responsibilities,
      postedBy: req.user._id,
      status: req.body.status || "active"
    };

    if (categoryId) {
      jobData.category = categoryId;
    } else {
      delete jobData.category;
    }

    if (jobData.salaryMin === "" || isNaN(jobData.salaryMin)) delete jobData.salaryMin;
    if (jobData.salaryMax === "" || isNaN(jobData.salaryMax)) delete jobData.salaryMax;
    if (jobData.openings === "" || isNaN(jobData.openings)) delete jobData.openings;
    if (jobData.stipend === "" || isNaN(jobData.stipend)) delete jobData.stipend;

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
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      const comp = await Company.findOne({ _id: job.company, createdBy: req.user._id });
      if (!comp && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not authorized to update this job" });
      }
    }

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

    if (updateData.category && !mongoose.Types.ObjectId.isValid(updateData.category)) {
      let cat = await Category.findOne({ name: { $regex: new RegExp(`^${updateData.category.trim()}$`, "i") } });
      if (!cat) {
        try {
          cat = await Category.create({ name: updateData.category.trim() });
        } catch {
          cat = await Category.findOne({ name: { $regex: new RegExp(`^${updateData.category.trim()}$`, "i") } });
        }
      }
      if (cat) updateData.category = cat._id;
      else delete updateData.category;
    }

    if (updateData.salaryMin === "" || isNaN(updateData.salaryMin)) delete updateData.salaryMin;
    if (updateData.salaryMax === "" || isNaN(updateData.salaryMax)) delete updateData.salaryMax;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("company category");

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      const comp = await Company.findOne({ _id: job.company, createdBy: req.user._id });
      if (!comp && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not authorized to delete this job" });
      }
    }

    await Job.findByIdAndDelete(req.params.id);
    await Application.deleteMany({ job: req.params.id });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const userCompanies = await Company.find({ createdBy: req.user._id }).select('_id');
    const compIds = userCompanies.map(c => c._id);
    const profile = await RecruiterProfile.findOne({ user: req.user._id });
    if (profile?.company) compIds.push(profile.company);

    const filter = {
      $or: [
        { postedBy: req.user._id }
      ]
    };
    if (compIds.length > 0) {
      filter.$or.push({ company: { $in: compIds } });
    }

    const jobs = await Job.find(filter)
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
    const userCompanies = await Company.find({ createdBy: req.user._id }).select('_id');
    const compIds = userCompanies.map(c => c._id);
    const profile = await RecruiterProfile.findOne({ user: req.user._id });
    if (profile?.company) compIds.push(profile.company);

    const filter = {
      $or: [
        { postedBy: req.user._id }
      ]
    };
    if (compIds.length > 0) {
      filter.$or.push({ company: { $in: compIds } });
    }

    const jobs = await Job.find(filter);
    const jobIds = jobs.map(j => j._id);
    const activeJobs = jobs.filter(j => j.status === "active").length;

    const [totalApplicants, shortlisted, hired] = await Promise.all([
      Application.countDocuments({ job: { $in: jobIds } }),
      Application.countDocuments({ job: { $in: jobIds }, status: "shortlisted" }),
      Application.countDocuments({ job: { $in: jobIds }, status: { $in: ["selected", "hired", "accepted"] } })
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
