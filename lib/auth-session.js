const SESSION_COOKIE_NAME = "session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET || "dev-only-auth-session-secret-change-me";
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function base64UrlEncode(input) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  return bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + "=".repeat(padLength);
  return new TextDecoder().decode(base64ToBytes(padded));
}

async function sign(payloadBase64) {
  const secret = getSessionSecret();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadBase64));
  return base64UrlEncode(new Uint8Array(signatureBuffer));
}

async function verify(payloadBase64, signatureBase64) {
  const expected = await sign(payloadBase64);
  if (expected.length !== signatureBase64.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ signatureBase64.charCodeAt(i);
  }

  return mismatch === 0;
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export async function createSessionToken(user) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: String(user.id),
    username: user.username,
    role: user.role,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const payloadBase64 = base64UrlEncode(JSON.stringify(payload));
  const signatureBase64 = await sign(payloadBase64);
  return `${payloadBase64}.${signatureBase64}`;
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;

  const [payloadBase64, signatureBase64] = token.split(".");
  if (!payloadBase64 || !signatureBase64) return null;

  const isValid = await verify(payloadBase64, signatureBase64);
  if (!isValid) return null;

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadBase64));
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload?.exp || payload.exp < now) return null;

  return payload;
}

export function buildSessionSetCookie(token) {
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}
