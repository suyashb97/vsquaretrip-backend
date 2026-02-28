import { verifyAdmin } from "../utils/verifyAdmin";
import { withCors } from "../utils/withCors";

async function handler(req, res) {
  return res.status(200).json({ message: "Authenticated" });
}

export default withCors(verifyAdmin(handler));