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


import jwt from "jsonwebtoken";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, password } = req.body;

    // Direct Env se match karein
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      
      const token = jwt.sign(
        { email: email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({ message: "Login Successful", token });
    }

    return res.status(401).json({ message: "Invalid Admin Credentials" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}

export default withCors(handler);