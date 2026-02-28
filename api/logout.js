import cookie from "cookie";
import { withCors } from "../utils/withCors";

async function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("adminToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(0),
    })
  );

  return res.status(200).json({ message: "Logged out successfully" });
}

export default withCors(handler);