import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware without authentication - all routes are public
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

