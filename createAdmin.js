import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Username:", existingAdmin.username);
      console.log("Email:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      username: "admin",
      email: "admin@doctorcrm.com",
      password: hashedPassword,
      fullName: "System Administrator",
      role: "admin",
      isActive: true,
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Email: admin@doctorcrm.com");
    console.log("\n⚠️  Please change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
