import { API_URLS, fetchWithTimeout } from "../../../lib/api-config";
import { normalizeUserFromApi } from "../../../lib/normalize-api";
import { buildSessionSetCookie, createSessionToken } from "../../../lib/auth-session";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const usersRes = await fetchWithTimeout(API_URLS.users);
    if (!usersRes.ok) {
      return res.status(502).json({ message: "Failed to validate credentials" });
    }

    const users = await usersRes.json();
    const foundUser = users.find(
      (candidate) => candidate.email === email && candidate.password === password
    );

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const normalizedUser = normalizeUserFromApi(foundUser);
    const token = await createSessionToken(normalizedUser);

    res.setHeader("Set-Cookie", buildSessionSetCookie(token));
    return res.status(200).json({ user: normalizedUser });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
