import Category from "../models/Category.js";

export const createCategory = async (req, res) => res.status(201).json(await Category.create(req.body));
export const getCategories = async (_req, res) => res.json(await Category.find({ isActive: true }).sort("name"));
export const updateCategory = async (req, res) => {
  const c = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!c) return res.status(404).json({ message: "Category not found" });
  res.json(c);
};
export const deleteCategory = async (req, res) => {
  const c = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!c) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Category disabled" });
};
