// api/check-auth.js
import { adminAuth } from "../utils/adminAuth.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  // adminAuth ensures cookie is valid
  res.status(200).json({ success: true, message: "Authenticated" });
}

export default withCors(adminAuth(handler));