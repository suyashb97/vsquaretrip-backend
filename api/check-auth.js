import jwt from "jsonwebtoken";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

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
    console.error("CHECK AUTH ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default withCors(handler);