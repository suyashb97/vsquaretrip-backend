import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    `adminToken=; HttpOnly; Path=/; Max-Age=0; ${
      process.env.NODE_ENV === "production"
        ? "Secure; SameSite=None"
        : "SameSite=Lax"
    }`
  );

  res.status(200).json({ message: "Logged out" });
}

export default withCors(handler);