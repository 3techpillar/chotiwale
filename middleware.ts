import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/auth") && path.includes("abc-def-ghi")) {
    return NextResponse.rewrite(
      new URL("/api/admin/auth" + path.split("/api/auth")[1], request.url)
    );
  }

  if (path === "/abc-def-ghi/login") {
    return NextResponse.rewrite(new URL("/api/admin/auth/signin", request.url));
  }

  if (path === "/login") {
    return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/:path*", "/login", "/abc-def-ghi/login"],
};
