import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@example.com";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("✅ Admin already exists");
    process.exit(0);
  }

  const password = "Admin@123";
  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name: "Admin",
    email,
    password: hashed,
    role: "admin"
  });

  console.log("✅ Admin created successfully");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
