import jwt from "jsonwebtoken";
import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, phone: u.phone, avatar: u.avatar });

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "student", phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (!["student", "recruiter"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password, role, phone });
    if (role === "student") await StudentProfile.create({ user: user._id });
    if (role === "recruiter") await RecruiterProfile.create({ user: user._id });

    res.status(201).json({ message: "Registration successful", token: tokenFor(user._id), user: publicUser(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: "Invalid email or password" });
    res.json({ message: "Login successful", token: tokenFor(user._id), user: publicUser(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const me = async (req, res) => res.json({ user: publicUser(req.user) });
