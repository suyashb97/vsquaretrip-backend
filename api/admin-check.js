import { verifyAdmin } from "../utils/verifyAdmin.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  return res.status(200).json({ message: "Authenticated" });
}

export default withCors(verifyAdmin(handler));