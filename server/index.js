import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import dns from "node:dns";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { protect } from "./middleware/authMiddleware.js";

// Security & Error Middlewares
import { securityHeaders, apiRateLimiter } from "./middleware/securityMiddleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force Node.js DNS resolver to use public DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Security Middlewares
app.use(securityHeaders);

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser with payload limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// General Rate Limiter
app.use("/api", apiRateLimiter);

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "CareerConnect API",
    timestamp: new Date().toISOString(),
  });
});

// Protected Resume file download route
app.get("/uploads/resumes/:filename", protect, (req, res) => {
  const filePath = path.join(__dirname, "uploads", "resumes", req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Resume file not found" });
  }
  res.sendFile(filePath);
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();