import 'dotenv/config';
import connectDB from "../utils/connect.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  console.log("✅ Function invoked");

  if (req.method !== "POST") 
    return res.status(405).json({ message: "Method not allowed" });

  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connected!");

    const { email, password } = req.body;
    console.log("Request body:", req.body);

    const admin = await User.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
