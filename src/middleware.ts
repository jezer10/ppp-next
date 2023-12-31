import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { AccessAuthService } from "./services";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  let payload = req.nextauth.token;
  let { role } = payload?.user as any;
  const { access, status } = await AccessAuthService(role?.role_id);

  if (status !== 200) return NextResponse.rewrite(new URL("/", req.url));

  let access_names =
    access && access.map((ac: any) => "/dashboard" + (ac.url || ""));

  if (!access_names.includes(req.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
