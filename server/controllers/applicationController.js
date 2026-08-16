import Application from "../models/Application.js";
import Job from "../models/Job.js";
import StudentProfile from "../models/StudentProfile.js";

export const applyForJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job || job.status !== "active") return res.status(404).json({ message: "Job is not available" });
  if (job.applicationDeadline && new Date(job.applicationDeadline) < new Date()) return res.status(400).json({ message: "Application deadline has passed" });
  if (await Application.findOne({ student: req.user._id, job: job._id })) return res.status(409).json({ message: "Already applied" });

  const profile = await StudentProfile.findOne({ user: req.user._id });
  const application = await Application.create({
    student: req.user._id, job: job._id, recruiter: job.postedBy,
    resumeUrl: req.body.resumeUrl || profile?.resume?.fileUrl,
    coverLetter: req.body.coverLetter,
    answers: req.body.answers || []
  });
  res.status(201).json(await application.populate("job"));
};

export const getMyApplications = async (req, res) => res.json(await Application.find({ student: req.user._id }).populate({ path: "job", populate: { path: "company", select: "name logo" } }).sort("-createdAt"));

export const getJobApplicants = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user._id });
  if (!job) return res.status(403).json({ message: "Not authorized" });
  res.json(await Application.find({ job: job._id }).populate("student", "name email phone").sort("-createdAt"));
};

export const updateApplicationStatus = async (req, res) => {
  const allowed = ["applied", "shortlisted", "interview", "selected", "rejected", "withdrawn"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status" });
  const application = await Application.findById(req.params.id).populate("job");
  if (!application || String(application.job.postedBy) !== String(req.user._id)) return res.status(404).json({ message: "Application not found or not authorized" });
  application.status = req.body.status;
  application.notes = req.body.notes ?? application.notes;
  await application.save();
  res.json(application);
};

export const withdrawApplication = async (req, res) => {
  const application = await Application.findOne({ _id: req.params.id, student: req.user._id });
  if (!application) return res.status(404).json({ message: "Application not found" });
  application.status = "withdrawn";
  await application.save();
  res.json(application);
};
