import { isAdminUsername } from "../admin-users";

describe("admin-users", () => {
  it("recognizes configured admin emails", () => {
    expect(isAdminUsername("admin@mail.com")).toBe(true);
  });

  it("rejects non-admin emails", () => {
    expect(isAdminUsername("john@mail.com")).toBe(false);
  });
});
