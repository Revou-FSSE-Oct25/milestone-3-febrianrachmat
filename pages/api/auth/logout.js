import { clearSessionCookie } from "../../../lib/auth-session";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.setHeader("Set-Cookie", clearSessionCookie());
  return res.status(200).json({ success: true });
}
