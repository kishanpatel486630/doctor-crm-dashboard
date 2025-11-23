import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/database.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import serviceProductRoutes from "./routes/serviceProductRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/services-products", serviceProductRoutes);
app.use("/api/upload", uploadRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server (only for local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

// Export for Vercel serverless
export default app;
