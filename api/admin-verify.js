import { verifyAdmin } from "../utils/authMiddleware.js";

export default verifyAdmin(async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  return res.status(200).json({
    authenticated: true
  });

});