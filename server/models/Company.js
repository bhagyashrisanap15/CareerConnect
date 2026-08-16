import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  logo: String,
  website: String,
  description: String,
  industry: String,
  size: String,
  location: String,
  foundedYear: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
