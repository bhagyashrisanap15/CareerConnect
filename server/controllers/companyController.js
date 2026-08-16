import Company from "../models/Company.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export const createCompany = async (req, res) => {
  const exists = await Company.findOne({ name: req.body.name });
  if (exists) return res.status(409).json({ message: "Company already exists" });
  const company = await Company.create({ ...req.body, createdBy: req.user._id });
  await RecruiterProfile.findOneAndUpdate({ user: req.user._id }, { company: company._id }, { upsert: true });
  res.status(201).json(company);
};

export const getCompanies = async (_req, res) => res.json(await Company.find().sort("name"));

export const getCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json(company);
};

export const updateCompany = async (req, res) => {
  const company = await Company.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, req.body, { new: true, runValidators: true });
  if (!company) return res.status(404).json({ message: "Company not found or not authorized" });
  res.json(company);
};

export const deleteCompany = async (req, res) => {
  const company = await Company.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!company) return res.status(404).json({ message: "Company not found or not authorized" });
  res.json({ message: "Company deleted" });
};
