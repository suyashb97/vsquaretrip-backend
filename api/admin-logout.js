import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  res.setHeader("Set-Cookie", `
    adminToken=;
    HttpOnly;
    Secure;
    SameSite=None;
    Path=/;
    Max-Age=0
  `);

  res.status(200).json({ message: "Logged out" });
}

export default withCors(handler);