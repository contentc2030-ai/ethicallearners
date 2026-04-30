import { NextRequest, NextResponse } from "next/server";
import { mentorAuthMiddleware } from "./middleware/mentor-auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Apply mentor authentication middleware to mentor routes
  if (pathname.startsWith("/pages/mentor") && !pathname.includes("/mentor-login")) {
    return mentorAuthMiddleware(req);
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  // Matcher for routes that should be protected
  matcher: ["/pages/mentor/:path*"],
}; 