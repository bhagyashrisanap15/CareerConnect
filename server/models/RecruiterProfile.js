import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  designation: String,
  phone: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  bio: String,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("RecruiterProfile", recruiterProfileSchema);
