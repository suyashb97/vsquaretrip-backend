// import { corsMiddleware } from "./corsMiddlewaew.js";

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });
// }

// export const withCors = (handler) => async (req, res) => {
//   await runMiddleware(req, res, corsMiddleware);

//   // OPTIONS request ko yahin handle kar do
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   return handler(req, res);
// };


import connectDB from "../utils/connect.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    const admin = await User.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.setHeader(
      "Set-Cookie",
      `adminToken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`
    );

    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export default withCors(handler);