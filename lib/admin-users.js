export const ADMIN_USERNAMES = ["mor_2314"];

export function isAdminUsername(username) {
  return ADMIN_USERNAMES.includes(username);
}
