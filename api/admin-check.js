import jwt from "jsonwebtoken";
import cookie from "cookie";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
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
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default withCors(handler);