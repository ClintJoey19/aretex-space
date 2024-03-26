// import NextAuth from "next-auth/next";
// import { authConfig } from "@/lib/auth.config";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export const middleware = async (req, res) => {
  const token = await getToken({req, secret})
  const isOnDashboard = req.nextUrl?.pathname.startsWith("/dashboard")
  const isOnPersonalDrive = req.nextUrl?.pathname.startsWith("/personal-drive")
  const isOnSharedDrive = req.nextUrl?.pathname.startsWith("/shared-drive")

  if (isOnDashboard && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (isOnPersonalDrive && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (isOnSharedDrive && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
}

// export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
