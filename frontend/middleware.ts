import { NextRequest, NextResponse } from "next/server";
import { fetchToken } from "utils/helpers";

const staticPaths = ['/_next', '/fonts', '/logo']
const matchers = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (staticPaths.some(path => pathname.startsWith(path)))
    return NextResponse.next();

  if (pathname.startsWith('/cart')) {
    const cookieCartId = request.cookies.get("cartId");
    if (cookieCartId && pathname.split('/')[2] !== cookieCartId) {
      request.nextUrl.pathname = "/forbidden";
      return NextResponse.redirect(request.nextUrl)
    }
  }

  const token = request.cookies.get("refresh_token");
  const authedSession = token ? await fetchToken(token) : undefined;
  if (authedSession?.refreshToken && matchers.includes(pathname)) {
    request.nextUrl.pathname = "/";
    return NextResponse.redirect(request.nextUrl)
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup'],
}
