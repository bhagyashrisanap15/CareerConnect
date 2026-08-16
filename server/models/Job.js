import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["job", "internship"], required: true },
  employmentType: { type: String, enum: ["full-time", "part-time", "contract", "remote"], default: "full-time" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  location: String,
  salaryMin: Number,
  salaryMax: Number,
  stipend: Number,
  experience: String,
  skills: [String],
  openings: { type: Number, default: 1 },
  applicationDeadline: Date,
  requirements: [String],
  responsibilities: [String],
  status: { type: String, enum: ["active", "closed", "draft"], default: "active" },
  views: { type: Number, default: 0 }
}, { timestamps: true });

jobSchema.index({ title: "text", description: "text", location: "text", skills: "text" });
export default mongoose.model("Job", jobSchema);
