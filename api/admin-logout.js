export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  res.setHeader(
    "Set-Cookie",
    `adminToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=None`
  );

  return res.status(200).json({ message: "Logged out" });
}