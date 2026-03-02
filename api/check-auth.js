import jwt from "jsonwebtoken";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const token = cookies
      .split(";")
      .find((c) => c.trim().startsWith("adminToken="))
      ?.split("=")[1];

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    console.error("CHECK AUTH ERROR:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default withCors(handler);