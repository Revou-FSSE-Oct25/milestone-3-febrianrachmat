import { getSessionCookieName, verifySessionToken } from "./auth-session";

export async function requireAdmin(req, res) {
  const token = req.cookies?.[getSessionCookieName()];
  const session = await verifySessionToken(token);

  if (!session || session.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return false;
  }

  return true;
}
