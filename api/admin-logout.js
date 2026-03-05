// api/admin-logout.js
export default function handler(req, res) {
  res.setHeader("Set-Cookie", `adminToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`);
  res.status(200).json({ success: true });
}