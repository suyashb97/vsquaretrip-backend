// api/check-auth.js
import { adminAuth } from "../utils/adminAuth.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (err) {
    console.error("Check-auth error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export default withCors(adminAuth(handler));