import { NextResponse } from "next/server";

// Exemple simple : on vérifie un cookie "token"
export function middleware(req: Request) {
  const url = new URL(req.url);
  const token = req.headers.get("cookie")?.includes("token=");

  // Si l'utilisateur essaie d'accéder à /admin sans être connecté
  if (url.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
