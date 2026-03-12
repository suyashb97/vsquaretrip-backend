import connectDB from "../utils/connect.js";
import User from "../models/User.js";
import { withCors } from "../utils/withCors.js";
import { verifyAdmin } from "../utils/authMiddleware.js";

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await connectDB();
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

// Dono lagana zaroori hai
export default withCors(verifyAdmin(handler));