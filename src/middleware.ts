import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for Multi-Property Subdomain Routing
 * 
 * Handles routing like:
 * - vila-ana.yoursite.com → Property "vila-ana"
 * - apt-marija.yoursite.com → Property "apt-marija"
 * - yoursite.com/dashboard → Multi-property dashboard
 * - yoursite.com → Landing page or redirect
 * 
 * Also supports path-based routing for localhost development:
 * - localhost:3000/p/vila-ana → Property "vila-ana"
 */

// Reserved subdomains that should not be treated as properties
const RESERVED_SUBDOMAINS = ['www', 'api', 'admin', 'dashboard', 'app'];

// Main domain (set this in .env.local for production)
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Get the pathname
  const pathname = url.pathname;
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Files with extensions
  ) {
    return NextResponse.next();
  }
  
  // Check if this is a subdomain request
  const currentHost = hostname.replace(`:${process.env.PORT || 3000}`, '');
  
  // For localhost development, check for path-based routing: /p/[slug]
  if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
    // Path-based property routing for development
    if (pathname.startsWith('/p/')) {
      const slug = pathname.split('/')[2];
      if (slug) {
        // Rewrite to property page with slug
        url.pathname = `/property/${slug}${pathname.replace(`/p/${slug}`, '') || ''}`;
        url.searchParams.set('propertySlug', slug);
        return NextResponse.rewrite(url);
      }
    }
    
    // Dashboard routes work normally
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.next();
    }
    
    // Root path on localhost - show property selector or default property
    return NextResponse.next();
  }
  
  // Production: Extract subdomain
  const rootDomain = ROOT_DOMAIN.replace(/:\d+$/, ''); // Remove port if present
  
  // Check if it's a subdomain
  if (hostname !== rootDomain && hostname.endsWith(rootDomain)) {
    const subdomain = hostname.replace(`.${rootDomain}`, '');
    
    // Skip reserved subdomains
    if (RESERVED_SUBDOMAINS.includes(subdomain)) {
      return NextResponse.next();
    }
    
    // This is a property subdomain - rewrite to property page
    const slug = subdomain;
    
    // Dashboard for this property
    if (pathname.startsWith('/dashboard')) {
      url.searchParams.set('propertySlug', slug);
      return NextResponse.rewrite(url);
    }
    
    // Property booking page
    url.pathname = `/property/${slug}${pathname}`;
    url.searchParams.set('propertySlug', slug);
    return NextResponse.rewrite(url);
  }
  
  // Main domain - dashboard or landing page
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
