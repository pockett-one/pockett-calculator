// middleware.ts (Next.js / Vercel Edge Runtime)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/sitemap.xml',
};

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // Set fresh-fetch headers
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}

