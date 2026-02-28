// import 'dotenv/config';
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
// import User from "./models/User.js";

// const seedAdmin = async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   const email = "admin@example.com";
//   const existing = await User.findOne({ email });
//   if (existing) {
//     console.log("✅ Admin already exists");
//     process.exit(0);
//   }

//   const password = "Admin@123";
//   const hashed = await bcrypt.hash(password, 10);

//   const user = new User({ name: "Admin", email, password: hashed, role: "admin" });
//   await user.save();
//   console.log("✅ Admin created:", email, "password:", password);
//   process.exit(0);
// };

// seedAdmin().catch(err => { console.error(err); process.exit(1); });



import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectDB from "../utils/connact.js";
import { withCors } from "../utils/withcors.js";
import User from "../models/user.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",   // 🔥 CROSS DOMAIN ke liye required
      path: "/",
      maxAge: 60 * 60 * 24,
    })
  );

  return res.status(200).json({ message: "Login successful" });
}

export default withCors(handler);