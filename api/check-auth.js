// api/check-auth.js
import { adminAuth } from "../utils/authMiddleware";

const handler = async (req, res) => {
  res.status(200).json({ success: true });
};

export default adminAuth(handler);