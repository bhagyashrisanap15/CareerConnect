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
