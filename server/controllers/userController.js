import User from "../models/User.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";

export const getUsers = async (req, res) => {
  const { role, search } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (search) filter.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
  res.json(await User.find(filter).select("-password").sort("-createdAt"));
};

export const updateUser = async (req, res) => {
  const allowed = ["name", "phone", "role", "isActive", "avatar"];
  const data = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const user = await User.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  if (String(req.params.id) === String(req.user._id)) return res.status(400).json({ message: "You cannot delete yourself" });
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

export const dashboardStats = async (_req, res) => {
  const [users, students, recruiters, jobs, applications, companies] = await Promise.all([
    User.countDocuments(), User.countDocuments({ role: "student" }), User.countDocuments({ role: "recruiter" }),
    Job.countDocuments(), Application.countDocuments(), Company.countDocuments()
  ]);
  res.json({ users, students, recruiters, jobs, applications, companies });
};

export const toggleUserBlock = async (req, res) => {
  if (String(req.params.id) === String(req.user._id)) return res.status(400).json({ message: "You cannot block yourself" });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.isBlocked = !user.isBlocked;
  user.isActive = !user.isBlocked;
  await user.save();
  res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`, user });
};

export const getAdminJobs = async (_req, res) => {
  const jobs = await Job.find().populate("company", "name logo").populate("postedBy", "name email").sort("-createdAt");
  res.json(jobs);
};

export const deleteAdminJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json({ message: "Job deleted successfully" });
};

export const getAdminCompanies = async (_req, res) => {
  const companies = await Company.find().populate("createdBy", "name email").sort("-createdAt");
  res.json(companies);
};

export const approveCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  company.isApproved = true;
  await company.save();
  res.json({ message: "Company approved successfully", company });
};

export const deleteAdminCompany = async (req, res) => {
  const company = await Company.findByIdAndDelete(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json({ message: "Company deleted successfully" });
};

export const getAdminApplications = async (_req, res) => {
  const applications = await Application.find()
    .populate({ path: "job", populate: { path: "company", select: "name logo" } })
    .populate("student", "name email phone")
    .populate("recruiter", "name email")
    .sort("-createdAt");
  res.json(applications);
};
