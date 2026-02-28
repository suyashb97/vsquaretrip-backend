import 'dotenv/config';
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = "admin@example.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("✅ Admin already exists");
    process.exit(0);
  }

  const password = "Admin@123";
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name: "Admin", email, password: hashed, role: "admin" });
  await user.save();
  console.log("✅ Admin created:", email, "password:", password);
  process.exit(0);
};

seedAdmin().catch(err => { console.error(err); process.exit(1); });
