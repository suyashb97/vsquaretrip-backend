import jwt from "jsonwebtoken";
import cookie from "cookie";

export const verifyAdmin = (handler) => async (req, res) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { adminToken } = cookie.parse(req.headers.cookie);

    if (!adminToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded;

    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};