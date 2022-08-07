// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("refresh_token");
  if (!token && request.nextUrl.pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  } else if (token && request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/auth"],
};
