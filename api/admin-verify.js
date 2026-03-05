import { verifyAdmin } from "../utils/authMiddleware.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {

  return res.status(200).json({
    authenticated: true,
    user: req.user
  });

}

export default withCors(verifyAdmin(handler));