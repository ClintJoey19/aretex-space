import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export const middleware = async (req, res) => {
  const token = await getToken({req, secret})
  const isOnDashboard = req.nextUrl?.pathname.startsWith("/dashboard")
  const isOnPersonalDrive = req.nextUrl?.pathname.startsWith("/personal-drive")
  const isOnSharedDrive = req.nextUrl?.pathname.startsWith("/shared-drive")
  const isOnUsers = req.nextUrl?.pathname.startsWith("/users")
  const isOnTemplates = req.nextUrl?.pathname.startsWith("/templates")

  if (isOnDashboard && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (isOnPersonalDrive && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (isOnSharedDrive && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (isOnUsers && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  if (isOnTemplates && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
