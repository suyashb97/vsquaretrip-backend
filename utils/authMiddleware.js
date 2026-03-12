import jwt from "jsonwebtoken";

export const verifyAdmin = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Sirf admin role ko allow karein
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Not an Admin" });
    }

    req.admin = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};