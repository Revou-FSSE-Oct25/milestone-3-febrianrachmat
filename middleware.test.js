import { middleware } from "./middleware";
import { NextResponse } from "next/server";
import { getSessionCookieName, verifySessionToken } from "./lib/auth-session";

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ status: 307, url: url.toString() })),
    next: jest.fn(() => ({ status: 200 })),
  },
}));

jest.mock("./lib/auth-session", () => ({
  getSessionCookieName: jest.fn(() => "session"),
  verifySessionToken: jest.fn(),
}));

function mockCookies(values = {}) {
  return {
    get: (name) => {
      if (values[name] === undefined) return null;
      return { value: values[name] };
    },
  };
}

describe("Middleware", () => {
  beforeEach(() => {
    NextResponse.redirect.mockClear();
    NextResponse.next.mockClear();
    verifySessionToken.mockReset();
    getSessionCookieName.mockReturnValue("session");
  });

  it("redirects to login with return path if no session", async () => {
    const req = {
      url: "http://localhost:3000/checkout",
      nextUrl: { pathname: "/checkout" },
      cookies: mockCookies(),
    };

    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login?redirect=%2Fcheckout", req.url)
    );
  });

  it("allows checkout access when session is valid", async () => {
    verifySessionToken.mockResolvedValue({
      sub: "1",
      username: "john@mail.com",
      role: "customer",
    });
    const req = {
      url: "http://localhost:3000/checkout",
      nextUrl: { pathname: "/checkout" },
      cookies: mockCookies({ session: "signed-token" }),
    };

    const res = await middleware(req);

    expect(res.status).toBe(200);
    expect(verifySessionToken).toHaveBeenCalledWith("signed-token");
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("redirects non-admin users away from admin routes", async () => {
    verifySessionToken.mockResolvedValue({
      sub: "1",
      username: "john@mail.com",
      role: "customer",
    });
    const req = {
      url: "http://localhost:3000/admin",
      nextUrl: { pathname: "/admin" },
      cookies: mockCookies({ session: "signed-token" }),
    };

    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL("/", req.url));
  });

  it("allows admin users on admin routes", async () => {
    verifySessionToken.mockResolvedValue({
      sub: "3",
      username: "admin@mail.com",
      role: "admin",
    });
    const req = {
      url: "http://localhost:3000/admin",
      nextUrl: { pathname: "/admin" },
      cookies: mockCookies({ session: "signed-token" }),
    };

    const res = await middleware(req);

    expect(res.status).toBe(200);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("redirects to login when accessing orders without session", async () => {
    const req = {
      url: "http://localhost:3000/orders",
      nextUrl: { pathname: "/orders" },
      cookies: mockCookies(),
    };

    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login?redirect=%2Forders", req.url)
    );
  });
});
