import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function getUserRole(token?: string): string | null {
  if (!token) return null;

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_KEY_TOKEN!,
    ) as jwt.JwtPayload;

    return payload.role ?? null;
  } catch {
    return null;
  }
}

function redirectByRole(req: NextRequest, role?: string) {
  if (role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (role === "TEACHER") {
    return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const role = getUserRole(token);

  if (pathname === "/") {
    if (!role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return redirectByRole(req, role);
  }

  if (pathname === "/login") {
    if (!role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return redirectByRole(req, role);
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
