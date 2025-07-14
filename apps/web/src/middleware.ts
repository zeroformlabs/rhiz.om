import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If authenticated, allow access to /space
    if (req.nextUrl.pathname.startsWith("/space") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // If not authenticated, allow access to /login
    if (req.nextUrl.pathname.startsWith("/login") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/space", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to /login for unauthenticated users
        if (req.nextUrl.pathname.startsWith("/login")) {
          return true;
        }
        // Require authentication for all other paths
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/space/:path*", "/login"],
};
