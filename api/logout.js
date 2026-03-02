import { serialize } from "cookie";

export default async function handler(req, res) {
  const cookie = serialize("adminToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ message: "Logged out successfully" });
}