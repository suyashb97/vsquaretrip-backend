import jwt from "jsonwebtoken";

export const verifyAdmin = (handler) => async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) return res.status(401).json({ message: "Unauthorized" });

    const token = cookie
      .split(";")
      .find(c => c.trim().startsWith("adminToken="))
      ?.split("=")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    req.user = decoded;

    return handler(req, res);

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};