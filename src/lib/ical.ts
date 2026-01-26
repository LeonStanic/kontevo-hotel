import { Booking, BlockedDate } from '@/types';
import { property } from '@/config/property';

/**
 * iCal (iCalendar) utilities for calendar synchronization
 * 
 * This enables syncing with OTAs like Booking.com, Airbnb, VRBO, etc.
 * - Export: Generate iCal feed of your bookings for OTAs to import
 * - Import: Parse iCal feeds from OTAs to block those dates
 */

// Generate a unique UID for iCal events
function generateUID(booking: Booking): string {
  return `${booking.id}@${property.id}.bookings`;
}

// Format date to iCal format (YYYYMMDD)
function formatDateToICal(dateStr: string): string {
  return dateStr.replace(/-/g, '');
}

// Format datetime to iCal format
function formatDateTimeToICal(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Generate iCal feed from bookings
 * This can be used by Booking.com/Airbnb to import your reservations
 */
export function generateICalFeed(bookings: Booking[], blockedDates: BlockedDate[]): string {
  const now = new Date();
  
  let ical = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${property.hotelName}//Booking System//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${property.hotelName} Availability`,
  ];

  // Add confirmed/pending bookings as events
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  
  for (const booking of activeBookings) {
    const roomType = property.roomTypes.find(r => r.id === booking.roomTypeId);
    const roomName = roomType?.name || booking.roomTypeId;
    
    ical.push(
      'BEGIN:VEVENT',
      `UID:${generateUID(booking)}`,
      `DTSTAMP:${formatDateTimeToICal(now)}`,
      `DTSTART;VALUE=DATE:${formatDateToICal(booking.checkIn)}`,
      `DTEND;VALUE=DATE:${formatDateToICal(booking.checkOut)}`,
      `SUMMARY:Booked - ${roomName}`,
      `DESCRIPTION:Guest: ${booking.guestName}\\nRoom: ${roomName}\\nGuests: ${booking.guests}\\nStatus: ${booking.status}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT'
    );
  }

  // Add blocked dates as events
  for (const blocked of blockedDates) {
    const nextDay = new Date(blocked.date);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDate = nextDay.toISOString().split('T')[0];
    
    const roomType = blocked.roomTypeId 
      ? property.roomTypes.find(r => r.id === blocked.roomTypeId)?.name 
      : 'All Rooms';
    
    ical.push(
      'BEGIN:VEVENT',
      `UID:${blocked.id}@${property.id}.blocked`,
      `DTSTAMP:${formatDateTimeToICal(now)}`,
      `DTSTART;VALUE=DATE:${formatDateToICal(blocked.date)}`,
      `DTEND;VALUE=DATE:${formatDateToICal(endDate)}`,
      `SUMMARY:Blocked - ${blocked.reason}`,
      `DESCRIPTION:${blocked.reason}\\nRoom: ${roomType}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT'
    );
  }

  ical.push('END:VCALENDAR');
  
  return ical.join('\r\n');
}

/**
 * Parse an iCal feed and extract blocked date ranges
 * This is used to import reservations from Booking.com/Airbnb
 */
export interface ParsedICalEvent {
  uid: string;
  summary: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export function parseICalFeed(icalContent: string): ParsedICalEvent[] {
  const events: ParsedICalEvent[] = [];
  
  // Simple regex-based parser for iCal
  const eventBlocks = icalContent.split('BEGIN:VEVENT');
  
  for (let i = 1; i < eventBlocks.length; i++) {
    const block = eventBlocks[i].split('END:VEVENT')[0];
    
    const uid = extractICalValue(block, 'UID');
    const summary = extractICalValue(block, 'SUMMARY');
    const dtstart = extractICalValue(block, 'DTSTART');
    const dtend = extractICalValue(block, 'DTEND');
    const description = extractICalValue(block, 'DESCRIPTION');
    
    if (uid && dtstart) {
      events.push({
        uid,
        summary: summary || 'External Booking',
        startDate: parseICalDate(dtstart),
        endDate: dtend ? parseICalDate(dtend) : parseICalDate(dtstart),
        description: description?.replace(/\\n/g, '\n'),
      });
    }
  }
  
  return events;
}

function extractICalValue(block: string, key: string): string | undefined {
  // Handle both "KEY:value" and "KEY;PARAM=X:value" formats
  const regex = new RegExp(`${key}[;:]([^\\r\\n]+)`, 'i');
  const match = block.match(regex);
  if (match) {
    // Remove any parameters before the actual value
    const value = match[1].includes(':') ? match[1].split(':').pop() : match[1];
    return value?.trim();
  }
  return undefined;
}

function parseICalDate(dateStr: string): string {
  // Handle VALUE=DATE: prefix
  const cleanDate = dateStr.replace(/VALUE=DATE:/i, '').replace(/[TZ]/g, '').substring(0, 8);
  
  if (cleanDate.length === 8) {
    return `${cleanDate.substring(0, 4)}-${cleanDate.substring(4, 6)}-${cleanDate.substring(6, 8)}`;
  }
  
  return dateStr;
}

/**
 * Convert parsed iCal events to blocked dates for a specific room
 */
export function convertToBlockedDates(
  events: ParsedICalEvent[], 
  source: string,
  roomTypeId?: string
): Omit<BlockedDate, 'id'>[] {
  const blockedDates: Omit<BlockedDate, 'id'>[] = [];
  
  for (const event of events) {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    // Create a blocked date for each day in the range
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      blockedDates.push({
        propertyId: property.id,
        date: d.toISOString().split('T')[0],
        reason: `${source}: ${event.summary}`,
        roomTypeId,
      });
    }
  }
  
  return blockedDates;
}
