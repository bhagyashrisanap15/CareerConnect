import StudentProfile from "../models/StudentProfile.js";
import Application from "../models/Application.js";
import SavedJob from "../models/SavedJob.js";

export const getProfile = async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id }).populate("user", "name email phone avatar");
  res.json(profile);
};

export const updateProfile = async (req, res) => {
  const profile = await StudentProfile.findOneAndUpdate({ user: req.user._id }, req.body, { new: true, upsert: true, runValidators: true });
  res.json(profile);
};

export const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Resume file is required" });
  const resume = { fileName: req.file.originalname, fileUrl: `/uploads/resumes/${req.file.filename}`, uploadedAt: new Date() };
  const profile = await StudentProfile.findOneAndUpdate({ user: req.user._id }, { resume }, { new: true, upsert: true });
  res.json({ message: "Resume uploaded", resume: profile.resume });
};

export const getApplications = async (req, res) => {
  const applications = await Application.find({ student: req.user._id }).populate({ path: "job", populate: { path: "company", select: "name logo location" } }).sort("-createdAt");
  res.json(applications);
};

export const getSavedJobs = async (req, res) => {
  const saved = await SavedJob.find({ student: req.user._id }).populate({ path: "job", populate: { path: "company", select: "name logo" } }).sort("-createdAt");
  res.json(saved);
};

export const saveJob = async (req, res) => {
  const saved = await SavedJob.findOneAndUpdate({ student: req.user._id, job: req.params.jobId }, { student: req.user._id, job: req.params.jobId }, { new: true, upsert: true });
  res.status(201).json(saved);
};

export const unsaveJob = async (req, res) => {
  await SavedJob.findOneAndDelete({ student: req.user._id, job: req.params.jobId });
  res.json({ message: "Job removed from saved jobs" });
};
