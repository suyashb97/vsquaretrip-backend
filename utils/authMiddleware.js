// utils/adminAuth.js
import jwt from "jsonwebtoken";

export const adminAuth = (handler) => async (req, res) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    console.error("AdminAuth Error:", err.message); // log error
    return res.status(401).json({ message: "Invalid token" });
  }
};