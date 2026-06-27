import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Disabled to test Vercel 404 issue
export function middleware(request: NextRequest) {
  /*
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('antigravity_admin_session');
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  */
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
