import jwt from "jsonwebtoken";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  try {

    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map(c => c.split("="))
    );

    const token = cookies.admin_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({
      authenticated: true
    });

  } catch (err) {

    console.error("Verify Error:", err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }
}