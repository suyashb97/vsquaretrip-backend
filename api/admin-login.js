// import connectDB from "../utils/connect.js";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { withCors } from "../utils/withCors.js";

// async function handler(req, res) {
//   if (req.method !== "POST")
//     return res.status(405).json({ message: "Method not allowed" });

//   try {
//     await connectDB();
//     const { email, password } = req.body;

//     const admin = await User.findOne({ email });
//     if (!admin) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// export default withCors(handler);


// api/admin-login.js
import connectDB from "../utils/connect.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectDB();

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const admin = await User.findOne({ email, role: "admin" });

  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // JWT token
  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // Set httpOnly cookie
  res.setHeader(
  "Set-Cookie",
  `adminToken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`
);

  return res.status(200).json({ success: true, admin: { id: admin._id, email: admin.email } });
}

export default withCors(handler);