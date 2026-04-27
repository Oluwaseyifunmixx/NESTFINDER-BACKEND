import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // ← ADD THIS IMPORT
import connectDB from "./config/db";
import fileUpload = require('express-fileupload');
import connectCloudinary from './config/cloudinary';
import authRoutes from '../src/routes/authRoutes'
import propertyRoutes from "./routes/propertyRoutes"
import enquiryRoutes from "./routes/enquiryRoutes"

// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// connect to cloudinary
connectCloudinary()

// ============================================================
// MIDDLEWARE
// ============================================================

// CORS — allows frontend to talk to backend (ADD THIS)
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "https://nestfinder-pro.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON
app.use(express.json());

// Parse form data
app.use(express.urlencoded({extended: true}))

// Handle file uploads — for property images
app.use(
    fileUpload({
        useTempFiles: false,
        limits: {fileSize: 10 * 1024 * 1024}, //10 mb per file
        abortOnLimit: true,
    })
)

// ============================================================
// ROUTES
// ============================================================
app.use("/api/auth", authRoutes)
app.use("/api/properties", propertyRoutes)
app.use("/api/enquiries", enquiryRoutes)

// Health check — to confirm server is running
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "NestFinder Pro API is running",
  });
});

// ============================================================
// START SERVER
// ============================================================
const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Frontend URL: ${process.env.CLIENT_URL}`);
});

export default app;