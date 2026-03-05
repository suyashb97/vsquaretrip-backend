// utils/adminAuth.js
import jwt from "jsonwebtoken";

export const adminAuth = (handler) => async (req, res) => {
  const token = req.cookies?.adminToken;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};