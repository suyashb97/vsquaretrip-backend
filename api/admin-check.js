import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {

  // ✅ CORS DIRECTLY HERE
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

  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { adminToken } = cookie.parse(req.headers.cookie);

    if (!adminToken) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(200).json({ message: "Authenticated" });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}