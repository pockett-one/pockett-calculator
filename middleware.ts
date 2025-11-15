// middleware.ts (Next.js / Vercel Edge Runtime)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/sitemap.xml',
};

const SEARCH_BOT_PATTERN = /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|Exabot|facebot|ia_archiver/i;

export function middleware(request: NextRequest) {
  // Detect Googlebot and other search engine crawlers
  const userAgent = request.headers.get('user-agent') || '';
  const isSearchEngineBot = SEARCH_BOT_PATTERN.test(userAgent);

  if (isSearchEngineBot) {
    // For search engines: force fresh HTTP 200 responses (not 304)
    const response = NextResponse.next();
    
    // no-store: prevents any caching (ensures fresh response every time)
    // This prevents the server from returning 304 (Not Modified) responses
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    
    // Remove response headers that enable conditional requests (ETag, Last-Modified)
    // Without these headers, the server cannot generate 304 responses
    // HTTP headers are case-insensitive, so we only need to delete once
    response.headers.delete('ETag');
    response.headers.delete('Last-Modified');
    
    return response;
  }
  
  // For regular users: allow caching for performance
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, must-revalidate');
  return response;
}

