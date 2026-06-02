import { NextResponse } from "next/server";
import { verifySessionToken, getSessionCookieName } from "./lib/auth-session";

function isProtectedRoute(pathname) {
  return pathname === "/checkout" || pathname === "/orders" || pathname.startsWith("/admin");
}

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(getSessionCookieName())?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/orders", "/admin", "/admin/:path*"],
};
