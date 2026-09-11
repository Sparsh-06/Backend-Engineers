import { NextResponse, type NextRequest } from "next/server";
import { ANALYTICS_AUTH_COOKIE } from "@/lib/analytics-auth";

// Guards /analytics with a single shared secret (ANALYTICS_DASHBOARD_SECRET).
// Deliberately simple - this dashboard has exactly one intended user, so a
// full auth system would be more code to protect the same one password.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/analytics/login") {
    return NextResponse.next();
  }

  const secret = process.env.ANALYTICS_DASHBOARD_SECRET;
  const cookie = request.cookies.get(ANALYTICS_AUTH_COOKIE)?.value;

  if (!secret || cookie !== secret) {
    const loginUrl = new URL("/analytics/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/analytics/:path*",
};
