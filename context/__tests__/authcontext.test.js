import { render, screen, waitFor } from "@testing-library/react";
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
    global.fetch = jest.fn((url, options = {}) => {
      if (url === "/api/auth/session") {
        return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
      }

      if (url === "/api/auth/login") {
        const body = JSON.parse(options.body ?? "{}");
        if (body.email === "admin@mail.com" && body.password === "admin123") {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                user: {
                  id: 3,
                  email: "admin@mail.com",
                  username: "admin@mail.com",
                  name: "Admin",
                  role: "admin",
                },
              }),
          });
        }

        if (body.email === "john@mail.com" && body.password === "changeme") {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                user: {
                  id: 1,
                  email: "john@mail.com",
                  username: "john@mail.com",
                  name: "Jhon",
                  role: "customer",
                },
              }),
          });
        }

        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: "Invalid email or password" }),
        });
      }

      if (url === "/api/auth/logout") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) });
      }

      return Promise.reject(new Error(`Unhandled fetch url: ${url}`));
    });
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
    expect(global.fetch).toHaveBeenCalledWith("/api/auth/login", expect.any(Object));
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
    expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
  });

  it("clears stale local storage when server session is missing", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        username: "john@mail.com",
        name: "Jhon",
        role: "customer",
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("username")).toHaveTextContent("guest");
      expect(localStorage.getItem("user")).toBeNull();
    });
  });
});
