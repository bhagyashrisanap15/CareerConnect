import Job from "../models/Job.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

export const createJob = async (req, res) => {
  const company = await Company.findOne({ _id: req.body.company, createdBy: req.user._id });
  if (!company) return res.status(403).json({ message: "You can only post jobs for your company" });
  const job = await Job.create({ ...req.body, postedBy: req.user._id });
  res.status(201).json(await job.populate(["company", "category"]));
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
  const job = await Job.findOneAndUpdate({ _id: req.params.id, postedBy: req.user._id }, req.body, { new: true, runValidators: true }).populate("company category");
  if (!job) return res.status(404).json({ message: "Job not found or not authorized" });
  res.json(job);
};

export const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found or not authorized" });
  await Application.deleteMany({ job: job._id });
  res.json({ message: "Job deleted" });
};

export const getRecruiterJobs = async (req, res) => res.json(await Job.find({ postedBy: req.user._id }).populate("company category").sort("-createdAt"));
