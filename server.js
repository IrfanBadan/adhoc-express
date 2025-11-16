import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
mongoose
  .connect(process.env.MONGO_URL)   //  << FIXED HERE
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error:", error));

// Routes
app.use("/api/users", userRoutes);

// Port binding for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
