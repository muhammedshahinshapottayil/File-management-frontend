import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  const url = req.nextUrl.pathname;
  if ((url.startsWith("/pages/auth") && token) || (url == "/" && token))
    return NextResponse.rewrite(new URL("/pages/user/dashboard", req.url));
  
  if ((url.startsWith("/pages/user") && !token) || (url == "/" && !token))
    return NextResponse.rewrite(new URL("/pages/auth/login", req.url));
}
