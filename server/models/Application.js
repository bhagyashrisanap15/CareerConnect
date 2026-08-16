import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resumeUrl: String,
  coverLetter: String,
  answers: [{ question: String, answer: String }],
  status: { type: String, enum: ["applied", "shortlisted", "interview", "selected", "rejected", "withdrawn"], default: "applied" },
  notes: String,
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

applicationSchema.index({ student: 1, job: 1 }, { unique: true });
export default mongoose.model("Application", applicationSchema);
