import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  customer: [/^\/customer/, /^\/dashboard\/customer/],
  provider: [/^\/provider/, /^\/dashboard\/provider/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.nextUrl.origin)
    );
  }
  if (authRoutes.includes(pathname)) {
    const redirectPath =
      userInfo.role === "provider"
        ? "/dashboard/provider"
        : "/dashboard/customer";

    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Restrict routes by role
  const allowedRoutes = roleBasedPrivateRoutes[userInfo.role as Role];
  if (allowedRoutes && allowedRoutes.some((route) => route.test(pathname))) {
    return NextResponse.next();
  }

  // If accessing unauthorized route
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/customer/:path*",
    "/provider/:path*",
    "/dashboard/:path*",
  ],
};
