import { NextResponse } from "next/server";
import { isAdminUsername } from "./lib/admin-users";

export function middleware(req) {
  const token = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;

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
  matcher: ["/checkout", "/admin", "/admin/:path*"],
};
