import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Replace with your authentication logic
  const isAuthenticated = request.cookies.get("userToken"); // Check for auth token or session cookie

  const url = request.nextUrl.clone();

  // If the user is trying to access the checkout page but is not authenticated
  if (url.pathname.startsWith("/cart/checkOut") && !isAuthenticated) {
    // Redirect to the sign-in page
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // Continue to the requested page if authenticated or not accessing restricted areas
  return NextResponse.next();
}

// Define routes where this middleware should apply
export const config = {
  matcher: ["/cart/checkOut"], // Apply middleware only to checkout page
};
