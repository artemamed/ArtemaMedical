import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("userToken"); // Check for auth token or session cookie
  const url = request.nextUrl.clone();


  // If the user is not authenticated and trying to access /cart/checkout, redirect to the sign-in page
  if (url.pathname.startsWith("/cart/checkOut") && !isAuthenticated) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// where this middleware should apply
export const config = {
  matcher: ["/cart", "/cart/checkOut"], // Apply middleware to both /cart and /cart/checkout
};
