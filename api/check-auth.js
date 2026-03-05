// api/check-auth.js
import { adminAuth } from "../utils/adminAuth.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  // simple response to debug
  return res.status(200).json({ success: true, user: req.user });
}

export default withCors(adminAuth(handler));