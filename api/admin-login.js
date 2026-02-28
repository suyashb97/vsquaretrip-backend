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


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectDB from "../utils/connect.js";
import User from "../models/User.js";

export default async function handler(req, res) {

  // ✅ CORS START
  const allowedOrigins = [
    "http://localhost:5173",
    "https://admin.vsquaretrip.com",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // ✅ CORS END

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await connectDB();

  const { email, password } = req.body;

  const admin = await User.findOne({ email });
  if (!admin || admin.role !== "admin")
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const isLocal = origin?.includes("localhost");

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("adminToken", token, {
      httpOnly: true,
      secure: !isLocal,
      sameSite: isLocal ? "lax" : "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return res.status(200).json({ message: "Login successful" });
}