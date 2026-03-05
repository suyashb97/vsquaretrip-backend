import jwt from "jsonwebtoken";

export const verifyAdmin = (handler) => async (req, res) => {

  try {

    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return res.status(401).json({
        message: "No token"
      });
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map(c => c.split("="))
    );

    const token = cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return handler(req, res);

  } catch (err) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};