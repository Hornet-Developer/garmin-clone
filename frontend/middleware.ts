import { NextRequest, NextResponse } from "next/server";
import { fetchToken } from "utils/helpers";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("refresh_token");
  const authedSession = token ? await fetchToken(token) : undefined;
  console.log(authedSession);
  if (authedSession?.refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login"],
};
