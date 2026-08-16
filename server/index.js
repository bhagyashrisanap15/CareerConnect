import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import dns from "node:dns";

dotenv.config();

// Force Node.js DNS resolver to use public DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();