import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
      return res.status(500).json({
        message: "Server configuration error"
      });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ✅ correct token
    const token = jwt.sign(
      { role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ cookie set
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("admin_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      })
    );

    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {

    console.error("Admin Login Error:", error);

    return res.status(500).json({
      message: "Server error"
    });

  }
}