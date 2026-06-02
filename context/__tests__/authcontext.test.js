import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../authcontext";

function TestComponent() {
  const { user, login, logout, isAdmin } = useAuth();

  return (
    <div>
      <span data-testid="username">{user?.username ?? "guest"}</span>
      <span data-testid="name">{user?.name ?? "guest"}</span>
      <span data-testid="is-admin">{isAdmin ? "yes" : "no"}</span>
      <button type="button" onClick={() => login("admin@mail.com", "admin123")}>
        Login Admin
      </button>
      <button type="button" onClick={() => login("john@mail.com", "changeme")}>
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
            {
              id: 3,
              email: "admin@mail.com",
              password: "admin123",
              name: "Admin",
              role: "admin",
            },
            {
              id: 1,
              email: "john@mail.com",
              password: "changeme",
              name: "Jhon",
              role: "customer",
            },
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

    expect(screen.getByTestId("username").textContent).toBe("admin@mail.com");
    expect(screen.getByTestId("name").textContent).toBe("Admin");
    expect(screen.getByTestId("is-admin").textContent).toBe("yes");
    expect(JSON.parse(localStorage.getItem("user")).email).toBe("admin@mail.com");
    expect(document.cookie).toContain("username=admin%40mail.com");
  });

  it("marks regular users as non-admin", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("Login User"));

    expect(screen.getByTestId("username").textContent).toBe("john@mail.com");
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
    expect(document.cookie).not.toContain("username=admin%40mail.com");
  });
});
