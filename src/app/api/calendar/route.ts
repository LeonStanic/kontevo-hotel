import { NextRequest, NextResponse } from 'next/server';
import { property } from '@/config/property';
import { generateICalFeed } from '@/lib/ical';
import { sampleBookings, sampleBlockedDates } from '@/lib/demo-data';

/**
 * GET /api/calendar
 * 
 * Returns an iCal feed of all bookings and blocked dates.
 * This URL can be added to Booking.com, Airbnb, etc. to sync availability.
 * 
 * Query params:
 * - room: Filter by room type ID (optional)
 * - token: Simple auth token for security (optional, set in config)
 * 
 * Example: /api/calendar?room=studio-apartment
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomFilter = searchParams.get('room');
  
  // In production, you'd want to add token-based authentication here
  // const token = searchParams.get('token');
  // if (token !== process.env.ICAL_SECRET) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }
  
  // Get bookings and blocked dates
  // Note: In production, this would fetch from a database
  let bookings = sampleBookings.filter(b => b.propertyId === property.id);
  let blockedDates = sampleBlockedDates.filter(b => b.propertyId === property.id);
  
  // Filter by room if specified
  if (roomFilter) {
    bookings = bookings.filter(b => b.roomTypeId === roomFilter);
    blockedDates = blockedDates.filter(b => !b.roomTypeId || b.roomTypeId === roomFilter);
  }
  
  // Generate iCal feed
  const icalContent = generateICalFeed(bookings, blockedDates);
  
  // Return as iCal file
  return new NextResponse(icalContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${property.id}-calendar.ics"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
