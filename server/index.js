import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
      console.log("mongoDB connected");
    }
  } catch (error) {
    console.error("mongoDB connection error:", error);
  }
};

app.get("/", (req,res) => {
  res.json({
    success: true,
    message:"API is running...",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});