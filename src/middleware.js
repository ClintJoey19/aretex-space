import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

const isProtectedRoute = (req) => {
  const protectedRoutes = [
    "/dashboard",
    "/personal-drive",
    "/shared-drive",
    "/users",
    "/templates",
    "/create-template"
  ]

  return protectedRoutes.some((route) => req.nextUrl?.pathname.startsWith(route))
}

export const middleware = async (req, res) => {
  const token = await getToken({req, secret})
  const validate = isProtectedRoute(req)

  if (validate && !token) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
