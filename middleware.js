import { NextResponse } from "next/server";
import { isAdminUsername } from "./lib/admin-users";

function isProtectedRoute(pathname) {
  return pathname === "/checkout" || pathname === "/orders" || pathname.startsWith("/admin");
}

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token");

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const username = req.cookies.get("username")?.value;

    if (!username || !isAdminUsername(username)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/orders", "/admin", "/admin/:path*"],
};
