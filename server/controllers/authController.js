import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import Company from "../models/Company.js";
import { generateToken } from "../utils/jwt.js";

const formatPublicUser = (user) => ({
  id: user._id,
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || "",
  avatar: user.avatar || "",
  bio: user.bio || "",
  isActive: user.isActive,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// Helper for validating email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /api/auth/signup (and /api/auth/register)
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "student", phone, companyName } = req.body;

    // 1. Validation
    const errors = {};
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Full name is required";
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "Email address is required";
    } else if (!isValidEmail(email.trim())) {
      errors.email = "Please provide a valid email address";
    }
    if (!password || typeof password !== "string") {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!["student", "recruiter"].includes(role)) {
      errors.role = "Role must be either student or recruiter";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address is already registered",
        errors: { email: "Email is already in use" },
      });
    }

    // 3. Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password, // Pre-save hook hashes password
      role,
      phone: phone ? phone.trim() : "",
      lastLogin: new Date(),
    });

    // 4. Create role-specific profile
    if (role === "student") {
      await StudentProfile.create({ user: user._id });
    } else if (role === "recruiter") {
      let companyId = null;
      if (companyName && companyName.trim()) {
        const company = await Company.create({
          name: companyName.trim(),
          createdBy: user._id,
        });
        companyId = company._id;
      }
      await RecruiterProfile.create({
        user: user._id,
        company: companyId,
        companyName: companyName ? companyName.trim() : "",
      });
    }

    // 5. Generate JWT token
    const token = generateToken({ userId: user._id, role: user.role });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: formatPublicUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    const errors = {};
    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "Email address is required";
    }
    if (!password || typeof password !== "string") {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user (explicitly include password for comparison)
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    // Generic error message for security
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    // Update lastLogin timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken({ userId: user._id, role: user.role });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: formatPublicUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const me = async (req, res) => {
  return res.json({
    success: true,
    user: formatPublicUser(req.user),
  });
};

// POST /api/auth/logout
export const logout = async (_req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// PUT /api/auth/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const errors = {};
    if (!currentPassword) errors.currentPassword = "Current password is required";
    if (!newPassword) errors.newPassword = "New password is required";
    else if (newPassword.length < 6) errors.newPassword = "New password must be at least 6 characters";
    if (newPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/auth/profile
export const updateAuthProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar, bio } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (avatar !== undefined) updates.avatar = avatar;
    if (bio !== undefined) updates.bio = bio.trim();

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: formatPublicUser(user),
    });
  } catch (error) {
    next(error);
  }
};
