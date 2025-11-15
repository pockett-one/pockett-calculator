// middleware.ts (Next.js / Vercel Edge Runtime)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/sitemap.xml',
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Detect Googlebot and other search engine crawlers
  const userAgent = request.headers.get('user-agent') || '';
  const isSearchEngineBot = /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|Exabot|facebot|ia_archiver/i.test(userAgent);

  if (isSearchEngineBot) {
    // For search engines: force fresh responses to ensure HTTP 200
    // no-cache: always revalidate (prevents 304 responses)
    // public: allows caching after validation
    response.headers.set('Cache-Control', 'public, no-cache, must-revalidate');
    // Remove ETag to prevent conditional requests that result in 304
    response.headers.delete('ETag');
  } else {
    // For regular users: allow caching for performance
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, must-revalidate');
  }

  return response;
}

