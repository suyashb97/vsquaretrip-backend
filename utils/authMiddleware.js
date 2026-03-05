import jwt from "jsonwebtoken";

export default function handler(req, res) {

  try {

    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = cookies
      .split(";")
      .find(c => c.trim().startsWith("admin_token="))
      ?.split("=")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      authenticated: true
    });

  } catch (error) {

    return res.status(401).json({
      authenticated: false
    });

  }

}