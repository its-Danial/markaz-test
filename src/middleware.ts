import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("Token:", token);

    const { pathname } = req.nextUrl;
    console.log("Pathname:", pathname);
    const isAuthPage = pathname === "/login";
    console.log("isAuthPage:", isAuthPage);

    if (!token && !isAuthPage) {
      console.log("Redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url).toString());
    } else if (token && isAuthPage) {
      console.log("Redirecting to /");
      return NextResponse.redirect(new URL("/", req.url).toString());
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
