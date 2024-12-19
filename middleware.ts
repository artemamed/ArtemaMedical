import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("userToken"); // Ensure this matches your token name
  
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/cart/checkOut") && token) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow access to other routes
}

export const config = {
  matcher: ["/cart", "/cart/checkOut"], // Apply middleware to /cart and /cart/checkOut
};
