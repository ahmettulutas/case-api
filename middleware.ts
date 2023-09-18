
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyToken } from "./helpers/jwtHelpers";

const authRoutes = ["/api/auth/sign-in", "/auth/sign-in"];
const adminRoutes = ["/dashboard" ,"/api/users"];

export async function middleware(request: NextRequest) {

  const { url, nextUrl, cookies } = request;
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isExternalApiCall = request.nextUrl.pathname.startsWith("/api");
  const { value: tokenInCookie } = cookies.get("token") ?? { value: null };
  const verifyTokenInCookie = await verifyToken(tokenInCookie ?? "");

  if(isAuthRoute) return NextResponse.next();

  if(isExternalApiCall) {
    // Bearer token must be added for api calls..
    const requestHeaders = new Headers(request.headers);
    const authorizationHeader = requestHeaders.get("authorization");
    if(!authorizationHeader) return NextResponse.json({ message: "Error! Missing Authorization header." }, { status: 401 });

    if(authorizationHeader.startsWith("Bearer ")) {
      const token = authorizationHeader?.substring(7);
      const verifiedToken = await verifyToken(token);

      if(!token || !verifiedToken) return NextResponse.json({ message: "Error! Missing Bearer token." }, { status: 401 });
      if(isAdminRoute) {
        const { role } = verifiedToken;
        if(!(role === "admin")) {
          return NextResponse.json({ message: "Error! You are unauthorized" }, { status: 401 });
        }
      }
      return NextResponse.next();
    }

  }
  if(!verifyTokenInCookie) {
    return NextResponse.redirect(new URL("/unauthorized", url));
  }
  if(isAdminRoute) {
    const { role } = verifyTokenInCookie;
    if(role === "admin") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/unauthorized", url));
  }
}


export const config = { matcher: ["/api/:path", "/packages" , "/dashboard", "/payment" , "/auth/sign-in"] };