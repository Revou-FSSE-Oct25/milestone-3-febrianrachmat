import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../authcontext";

function TestComponent() {
  const { user, login, logout, isAdmin } = useAuth();

  return (
    <div>
      <span data-testid="username">{user?.username ?? "guest"}</span>
      <span data-testid="is-admin">{isAdmin ? "yes" : "no"}</span>
      <button type="button" onClick={() => login("mor_2314", "83r5^_")}>
        Login Admin
      </button>
      <button type="button" onClick={() => login("johnd", "m38rmF$")}>
        Login User
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, username: "mor_2314", password: "83r5^_" },
            { id: 2, username: "johnd", password: "m38rmF$" },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("starts as guest", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("username").textContent).toBe("guest");
  });

  it("logs in and persists user", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("Login Admin"));

    expect(screen.getByTestId("username").textContent).toBe("mor_2314");
    expect(screen.getByTestId("is-admin").textContent).toBe("yes");
    expect(JSON.parse(localStorage.getItem("user")).username).toBe("mor_2314");
    expect(document.cookie).toContain("username=mor_2314");
  });

  it("marks regular users as non-admin", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("Login User"));

    expect(screen.getByTestId("username").textContent).toBe("johnd");
    expect(screen.getByTestId("is-admin").textContent).toBe("no");
  });

  it("clears user on logout", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("Login Admin"));
    await userEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("username").textContent).toBe("guest");
    expect(localStorage.getItem("user")).toBeNull();
    expect(document.cookie).not.toContain("username=mor_2314");
  });
});
