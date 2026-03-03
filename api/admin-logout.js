import { withCors } from "../utils/withCors.js";
import cookie from "cookie";

async function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("adminToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 0,
    })
  );

  return res.status(200).json({ message: "Logged out" });
}

export default withCors(handler);