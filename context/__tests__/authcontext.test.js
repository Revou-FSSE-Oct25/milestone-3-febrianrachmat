import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../authcontext";

function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="username">{user?.username ?? "guest"}</span>
      <button type="button" onClick={() => login("mor_2314", "83r5^_")}>
        Login
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, username: "mor_2314", password: "83r5^_" },
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

    await userEvent.click(screen.getByText("Login"));

    expect(screen.getByTestId("username").textContent).toBe("mor_2314");
    expect(JSON.parse(localStorage.getItem("user")).username).toBe("mor_2314");
  });

  it("clears user on logout", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("Login"));
    await userEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("username").textContent).toBe("guest");
    expect(localStorage.getItem("user")).toBeNull();
  });
});
