import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  headline: String,
  bio: String,
  dateOfBirth: Date,
  gender: String,
  location: String,
  education: [{
    degree: String, institution: String, field: String, startYear: Number, endYear: Number, grade: String
  }],
  skills: [{ type: String, trim: true }],
  experience: [{ company: String, role: String, startDate: Date, endDate: Date, description: String }],
  projects: [{ title: String, description: String, technologies: [String], link: String }],
  resume: { fileName: String, fileUrl: String, uploadedAt: Date }
}, { timestamps: true });

export default mongoose.model("StudentProfile", studentProfileSchema);
