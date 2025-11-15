// middleware.ts (Next.js / Vercel Edge Runtime)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/sitemap.xml',
};

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // Allow caching for performance while ensuring freshness
  // max-age=3600: browsers cache for 1 hour
  // s-maxage=3600: CDN/proxies cache for 1 hour
  // must-revalidate: require revalidation after cache expires
  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, must-revalidate');

  return response;
}

