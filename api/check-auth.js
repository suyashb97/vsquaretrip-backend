import jwt from "jsonwebtoken";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const cookieHeader = req.headers.cookie || "";

    const token = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("adminToken="))
      ?.split("=")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Authenticated",
      user: decoded,
    });

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}