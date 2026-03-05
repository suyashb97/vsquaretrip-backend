import jwt from "jsonwebtoken";

export const verifyAdmin = (handler) => async (req, res) => {

  try {

    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map(c => c.split("="))
    );

    // ✅ correct cookie name
    const token = cookies.admin_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded;

    return handler(req, res);

  } catch (err) {

    console.error("Verify Error:", err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }

};