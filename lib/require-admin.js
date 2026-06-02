import { isAdminUsername } from "./admin-users";

export function requireAdmin(req, res) {
  const username = req.cookies?.username;

  if (!username || !isAdminUsername(username)) {
    res.status(403).json({ message: "Admin access required" });
    return false;
  }

  return true;
}
