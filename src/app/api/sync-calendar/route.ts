import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/sync-calendar
 * 
 * Proxy for fetching external iCal feeds (to avoid CORS issues).
 * 
 * Query params:
 * - url: The iCal feed URL to fetch
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing url parameter' },
      { status: 400 }
    );
  }

  try {
    // Validate URL
    const parsedUrl = new URL(url);
    
    // Only allow https URLs for security
    if (parsedUrl.protocol !== 'https:') {
      return NextResponse.json(
        { error: 'Only HTTPS URLs are allowed' },
        { status: 400 }
      );
    }

    // Fetch the iCal feed
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Hotel-Booking-System/1.0',
        'Accept': 'text/calendar, text/plain, */*',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch calendar: ${response.status}` },
        { status: response.status }
      );
    }

    const content = await response.text();

    // Basic validation - should contain VCALENDAR
    if (!content.includes('BEGIN:VCALENDAR')) {
      return NextResponse.json(
        { error: 'Invalid iCal format' },
        { status: 400 }
      );
    }

    // Return the iCal content
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Calendar sync error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar' },
      { status: 500 }
    );
  }
}
