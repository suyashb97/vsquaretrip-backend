import { verifyAdmin } from "../middleware/auth.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  return res.status(200).json({ authenticated: true });
}

export default withCors(verifyAdmin(handler));