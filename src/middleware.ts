import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { AccessAuthService } from "./services";

// export {default} from 'next-auth/middleware'

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  let payload = req.nextauth.token;
  let { roles, ...user } = payload?.user as any;
  const [role] = roles;
  const access = await AccessAuthService(role?.role_id);

  if (access.status !== 200) return NextResponse.rewrite(new URL("/", req.url));

  let access_names =
    access && access.info.map((ac: any) => "/dashboard" + (ac.url || ""));
  let roles_names = roles.map((role: any) => role.name);

  if (!access_names.includes(req.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
