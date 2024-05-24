import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const status = cookies().get("authenticatorStatus")?.value;

  const isRootPath = request.nextUrl.pathname === "/";
  const shouldRedirect = status === "authenticated" ? isRootPath : !isRootPath;

  if (shouldRedirect) {
    return NextResponse.redirect(
      new URL(status === "authenticated" ? "/dashboard" : "/", request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
