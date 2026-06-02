import { isAdminUsername } from "../admin-users";

describe("admin-users", () => {
  it("recognizes configured admin usernames", () => {
    expect(isAdminUsername("mor_2314")).toBe(true);
  });

  it("rejects non-admin usernames", () => {
    expect(isAdminUsername("johnd")).toBe(false);
  });
});
