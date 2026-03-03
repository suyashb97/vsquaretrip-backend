import jwt from "jsonwebtoken";

export const verifyAdmin = (handler) => async (req, res) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token)
      return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};