import mongoose from "mongoose";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import StudentProfile from "../models/StudentProfile.js";

export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }

    const job = await Job.findById(jobId);
    if (!job || job.status !== "active") {
      return res.status(404).json({ message: "Job is not available for applications" });
    }

    if (job.applicationDeadline && new Date(job.applicationDeadline) < new Date()) {
      return res.status(400).json({ message: "Application deadline has passed" });
    }

    const existingApplication = await Application.findOne({ student: req.user._id, job: job._id });
    if (existingApplication) {
      return res.status(409).json({ message: "You have already applied for this job" });
    }

    const profile = await StudentProfile.findOne({ user: req.user._id });

    let resumeUrl = req.body.resumeUrl;
    if (req.file) {
      resumeUrl = `/uploads/resumes/${req.file.filename}`;
      if (profile && !profile.resume?.fileUrl) {
        profile.resume = {
          fileName: req.file.originalname,
          fileUrl: resumeUrl,
          uploadedAt: new Date()
        };
        await profile.save();
      }
    } else if (!resumeUrl && profile?.resume?.fileUrl) {
      resumeUrl = profile.resume.fileUrl;
    }

    const application = await Application.create({
      student: req.user._id,
      job: job._id,
      recruiter: job.postedBy,
      resumeUrl: resumeUrl || "",
      coverLetter: req.body.coverLetter || "",
      answers: req.body.answers || [],
      status: "applied",
      appliedAt: new Date()
    });

    const populatedApp = await Application.findById(application._id)
      .populate({ path: "job", populate: { path: "company", select: "name logo location" } })
      .populate("student", "name email phone avatar");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: populatedApp
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "You have already applied for this job" });
    }
    console.error("Error applying for job:", error);
    res.status(500).json({ message: error.message || "Failed to submit application" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate({
        path: "job",
        populate: { path: "company", select: "name logo location" }
      })
      .sort("-createdAt");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecruiterApplications = async (req, res) => {
  try {
    const userCompanies = await Company.find({ createdBy: req.user._id }).select("_id");
    const compIds = userCompanies.map(c => c._id);
    const jobs = await Job.find({
      $or: [
        { postedBy: req.user._id },
        { company: { $in: compIds } }
      ]
    }).select("_id");
    const jobIds = jobs.map(j => j._id);

    const applications = await Application.find({
      $or: [
        { recruiter: req.user._id },
        { job: { $in: jobIds } }
      ]
    })
      .populate({
        path: "job",
        populate: { path: "company", select: "name logo location" }
      })
      .populate("student", "name email phone avatar")
      .sort("-createdAt");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (String(job.postedBy) !== String(req.user._id) && req.user.role !== "admin") {
      const comp = await Company.findOne({ _id: job.company, createdBy: req.user._id });
      if (!comp) {
        return res.status(403).json({ message: "Not authorized to view applicants for this job" });
      }
    }

    const applications = await Application.find({ job: job._id })
      .populate({
        path: "job",
        populate: { path: "company", select: "name logo location" }
      })
      .populate("student", "name email phone avatar")
      .sort("-createdAt");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const allowed = ["applied", "shortlisted", "interview", "selected", "rejected", "withdrawn"];
    const normalizedStatus = (req.body.status || "").toLowerCase();
    if (!allowed.includes(normalizedStatus)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id).populate("job");
    if (!application) return res.status(404).json({ message: "Application not found" });

    const isOwner = application.job && (
      String(application.job.postedBy) === String(req.user._id) ||
      String(application.recruiter) === String(req.user._id)
    );
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = normalizedStatus;
    if (req.body.notes !== undefined) {
      application.notes = req.body.notes;
    }
    await application.save();

    const populated = await Application.findById(application._id)
      .populate({ path: "job", populate: { path: "company", select: "name logo location" } })
      .populate("student", "name email phone avatar");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, student: req.user._id });
    if (!application) return res.status(404).json({ message: "Application not found" });
    application.status = "withdrawn";
    await application.save();
    res.json({ message: "Application withdrawn successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application ID format" });
    }

    const application = await Application.findById(id)
      .populate({ path: "job", populate: { path: "company", select: "name logo location" } })
      .populate("student", "name email phone avatar bio")
      .populate("recruiter", "name email");

    if (!application) return res.status(404).json({ message: "Application not found" });

    const isOwnerStudent = String(application.student?._id || application.student) === String(req.user._id);
    const isOwnerRecruiter = String(application.recruiter?._id || application.recruiter) === String(req.user._id) ||
      (application.job && String(application.job.postedBy) === String(req.user._id));
    const isAdmin = req.user.role === "admin";

    if (!isOwnerStudent && !isOwnerRecruiter && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this application" });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
