export const ADMIN_EMAILS = ["admin@mail.com"];

export function isAdminUsername(username) {
  return ADMIN_EMAILS.includes(username);
}
