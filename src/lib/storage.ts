import { Booking, BlockedDate, ExternalCalendar } from '@/types';
import { sampleBookings, sampleBlockedDates } from './demo-data';
import { property } from '@/config/property';
import { supabase, isSupabaseConfigured } from './supabase/client';

const BOOKINGS_KEY = 'hotel-booking-bookings';
const BLOCKED_DATES_KEY = 'hotel-booking-blocked-dates';
const EXTERNAL_CALENDARS_KEY = 'hotel-booking-external-calendars';
const INITIALIZED_KEY = 'hotel-booking-initialized';

// Check if we're running on the client
const isClient = typeof window !== 'undefined';

// =============================================
// INITIALIZATION
// =============================================

export function initializeStorage(): void {
  if (!isClient || isSupabaseConfigured) return;
  
  const initialized = localStorage.getItem(INITIALIZED_KEY);
  if (!initialized) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(sampleBookings));
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(sampleBlockedDates));
    localStorage.setItem(INITIALIZED_KEY, 'true');
  }
}

export function resetStorage(): void {
  if (!isClient) return;
  
  if (isSupabaseConfigured) {
    // For Supabase, we don't reset - data persists
    console.log('Database storage - reset not needed');
    return;
  }
  
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(sampleBookings));
  localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(sampleBlockedDates));
}

// =============================================
// BOOKING OPERATIONS
// =============================================

// Helper to convert Supabase row to Booking type
function toBooking(row: {
  id: string;
  property_id: string;
  room_type_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  special_requests: string | null;
  total_price: number;
  status: string;
  payment_status?: string;
  payment_intent_id?: string | null;
  amount_paid?: number;
  created_at: string;
}): Booking {
  const booking: Booking = {
    id: row.id,
    propertyId: row.property_id,
    roomTypeId: row.room_type_id,
    guestName: row.guest_name,
    guestEmail: row.guest_email,
    guestPhone: row.guest_phone,
    checkIn: row.check_in,
    checkOut: row.check_out,
    guests: row.guests,
    specialRequests: row.special_requests || '',
    totalPrice: row.total_price,
    status: row.status as Booking['status'],
    createdAt: row.created_at,
  };
  
  // Add payment info if available
  if (row.payment_status || row.amount_paid) {
    booking.payment = {
      status: (row.payment_status || 'pending') as 'pending' | 'paid' | 'failed' | 'refunded',
      amount: row.amount_paid || 0,
      currency: '€',
      transactionId: row.payment_intent_id || undefined,
    };
  }
  
  return booking;
}

export function getBookings(propertyId?: string): Booking[] {
  if (!isClient) return sampleBookings;
  
  // Supabase requires async - use getBookingsAsync for Supabase
  if (isSupabaseConfigured) {
    console.warn('Use getBookingsAsync() for Supabase');
    return [];
  }
  
  initializeStorage();
  const data = localStorage.getItem(BOOKINGS_KEY);
  const bookings: Booking[] = data ? JSON.parse(data) : [];
  
  const filterId = propertyId || property.id;
  return bookings.filter(b => b.propertyId === filterId);
}

export async function getBookingsAsync(propertyId?: string): Promise<Booking[]> {
  if (isSupabaseConfigured && supabase) {
    const filterId = propertyId || property.id;
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('property_id', filterId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
    
    return (data || []).map(toBooking);
  }
  
  return getBookings(propertyId);
}

export function getAllBookings(): Booking[] {
  if (!isClient) return sampleBookings;
  
  if (isSupabaseConfigured) {
    console.warn('Use getAllBookingsAsync() for Supabase');
    return [];
  }
  
  initializeStorage();
  const data = localStorage.getItem(BOOKINGS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getAllBookingsAsync(): Promise<Booking[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all bookings:', error);
      return [];
    }
    
    return (data || []).map(toBooking);
  }
  
  return getAllBookings();
}

export function getBookingById(id: string): Booking | undefined {
  const bookings = getAllBookings();
  return bookings.find(b => b.id === id);
}

export async function getBookingByIdAsync(id: string): Promise<Booking | undefined> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      return undefined;
    }
    
    return toBooking(data);
  }
  
  return getBookingById(id);
}

export function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  if (isSupabaseConfigured) {
    console.warn('Use createBookingAsync() for Supabase');
    throw new Error('Use createBookingAsync() for Supabase');
  }
  
  const allBookings = getAllBookings();
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  allBookings.push(newBooking);
  if (isClient) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(allBookings));
  }
  return newBooking;
}

export async function createBookingAsync(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        property_id: booking.propertyId,
        room_type_id: booking.roomTypeId,
        guest_name: booking.guestName,
        guest_email: booking.guestEmail,
        guest_phone: booking.guestPhone,
        check_in: booking.checkIn,
        check_out: booking.checkOut,
        guests: booking.guests,
        special_requests: booking.specialRequests || null,
        total_price: booking.totalPrice,
        status: 'pending',
        payment_status: booking.payment?.status || 'pending',
        payment_intent_id: booking.payment?.transactionId || null,
        amount_paid: booking.payment?.amount || 0,
      })
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
    
    return toBooking(data);
  }
  
  return createBooking(booking);
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking | undefined {
  if (isSupabaseConfigured) {
    console.warn('Use updateBookingStatusAsync() for Supabase');
    return undefined;
  }
  
  const bookings = getAllBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return undefined;
  
  bookings[index].status = status;
  if (isClient) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
  return bookings[index];
}

export async function updateBookingStatusAsync(id: string, status: Booking['status']): Promise<Booking | undefined> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error updating booking status:', error);
      return undefined;
    }
    
    return toBooking(data);
  }
  
  return updateBookingStatus(id, status);
}

// =============================================
// BLOCKED DATES OPERATIONS
// =============================================

function toBlockedDate(row: {
  id: string;
  property_id: string;
  date: string;
  reason: string;
  room_type_id: string | null;
}): BlockedDate {
  return {
    id: row.id,
    propertyId: row.property_id,
    date: row.date,
    reason: row.reason,
    roomTypeId: row.room_type_id || undefined,
  };
}

export function getBlockedDates(propertyId?: string): BlockedDate[] {
  if (!isClient) return sampleBlockedDates;
  
  if (isSupabaseConfigured) {
    console.warn('Use getBlockedDatesAsync() for Supabase');
    return [];
  }
  
  initializeStorage();
  const data = localStorage.getItem(BLOCKED_DATES_KEY);
  const blockedDates: BlockedDate[] = data ? JSON.parse(data) : [];
  
  const filterId = propertyId || property.id;
  return blockedDates.filter(b => b.propertyId === filterId);
}

export async function getBlockedDatesAsync(propertyId?: string): Promise<BlockedDate[]> {
  if (isSupabaseConfigured && supabase) {
    const filterId = propertyId || property.id;
    const { data, error } = await supabase
      .from('blocked_dates')
      .select('*')
      .eq('property_id', filterId)
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching blocked dates:', error);
      return [];
    }
    
    return (data || []).map(toBlockedDate);
  }
  
  return getBlockedDates(propertyId);
}

export function getAllBlockedDates(): BlockedDate[] {
  if (!isClient) return sampleBlockedDates;
  
  if (isSupabaseConfigured) {
    console.warn('Use getAllBlockedDatesAsync() for Supabase');
    return [];
  }
  
  initializeStorage();
  const data = localStorage.getItem(BLOCKED_DATES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getAllBlockedDatesAsync(): Promise<BlockedDate[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('blocked_dates')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching all blocked dates:', error);
      return [];
    }
    
    return (data || []).map(toBlockedDate);
  }
  
  return getAllBlockedDates();
}

export function addBlockedDate(blockedDate: Omit<BlockedDate, 'id'>): BlockedDate {
  if (isSupabaseConfigured) {
    console.warn('Use addBlockedDateAsync() for Supabase');
    throw new Error('Use addBlockedDateAsync() for Supabase');
  }
  
  const allBlockedDates = getAllBlockedDates();
  const newBlockedDate: BlockedDate = {
    ...blockedDate,
    id: `block-${Date.now()}`,
  };
  allBlockedDates.push(newBlockedDate);
  if (isClient) {
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(allBlockedDates));
  }
  return newBlockedDate;
}

export async function addBlockedDateAsync(blockedDate: Omit<BlockedDate, 'id'>): Promise<BlockedDate> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('blocked_dates')
      .insert({
        property_id: blockedDate.propertyId,
        date: blockedDate.date,
        reason: blockedDate.reason,
        room_type_id: blockedDate.roomTypeId || null,
      })
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error adding blocked date:', error);
      throw new Error('Failed to add blocked date');
    }
    
    return toBlockedDate(data);
  }
  
  return addBlockedDate(blockedDate);
}

export function removeBlockedDate(id: string): boolean {
  if (isSupabaseConfigured) {
    console.warn('Use removeBlockedDateAsync() for Supabase');
    return false;
  }
  
  const blockedDates = getAllBlockedDates();
  const index = blockedDates.findIndex(b => b.id === id);
  if (index === -1) return false;
  
  blockedDates.splice(index, 1);
  if (isClient) {
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(blockedDates));
  }
  return true;
}

export async function removeBlockedDateAsync(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('blocked_dates')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error removing blocked date:', error);
      return false;
    }
    
    return true;
  }
  
  return removeBlockedDate(id);
}

export function isDateBlocked(propertyId: string, date: string, roomTypeId?: string): boolean {
  const blockedDates = getBlockedDates(propertyId);
  return blockedDates.some(b => {
    if (b.date !== date) return false;
    if (b.roomTypeId && roomTypeId && b.roomTypeId !== roomTypeId) return false;
    if (!b.roomTypeId || !roomTypeId) return true;
    return b.roomTypeId === roomTypeId;
  });
}

export async function isDateBlockedAsync(propertyId: string, date: string, roomTypeId?: string): Promise<boolean> {
  const blockedDates = await getBlockedDatesAsync(propertyId);
  return blockedDates.some(b => {
    if (b.date !== date) return false;
    if (b.roomTypeId && roomTypeId && b.roomTypeId !== roomTypeId) return false;
    if (!b.roomTypeId || !roomTypeId) return true;
    return b.roomTypeId === roomTypeId;
  });
}

// Check room availability for a date range
export function isRoomAvailable(
  propertyId: string,
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
  excludeBookingId?: string
): boolean {
  const bookings = getBookings(propertyId).filter(
    b => b.roomTypeId === roomTypeId && 
         b.status !== 'cancelled' &&
         b.id !== excludeBookingId
  );
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (isDateBlocked(propertyId, dateStr, roomTypeId)) {
      return false;
    }
  }
  
  for (const booking of bookings) {
    const bookedCheckIn = new Date(booking.checkIn);
    const bookedCheckOut = new Date(booking.checkOut);
    
    if (checkInDate < bookedCheckOut && checkOutDate > bookedCheckIn) {
      return false;
    }
  }
  
  return true;
}

export async function isRoomAvailableAsync(
  propertyId: string,
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
  excludeBookingId?: string
): Promise<boolean> {
  const bookings = (await getBookingsAsync(propertyId)).filter(
    b => b.roomTypeId === roomTypeId && 
         b.status !== 'cancelled' &&
         b.id !== excludeBookingId
  );
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (await isDateBlockedAsync(propertyId, dateStr, roomTypeId)) {
      return false;
    }
  }
  
  for (const booking of bookings) {
    const bookedCheckIn = new Date(booking.checkIn);
    const bookedCheckOut = new Date(booking.checkOut);
    
    if (checkInDate < bookedCheckOut && checkOutDate > bookedCheckIn) {
      return false;
    }
  }
  
  return true;
}

// =============================================
// EXTERNAL CALENDAR OPERATIONS
// =============================================

function toExternalCalendar(row: {
  id: string;
  property_id: string;
  name: string;
  url: string;
  room_type_id: string | null;
  last_synced: string | null;
  is_active: boolean;
}): ExternalCalendar {
  return {
    id: row.id,
    propertyId: row.property_id,
    name: row.name,
    url: row.url,
    roomTypeId: row.room_type_id || undefined,
    lastSynced: row.last_synced || undefined,
    isActive: row.is_active,
  };
}

export function getExternalCalendars(propertyId?: string): ExternalCalendar[] {
  if (!isClient) return [];
  
  if (isSupabaseConfigured) {
    console.warn('Use getExternalCalendarsAsync() for Supabase');
    return [];
  }
  
  const data = localStorage.getItem(EXTERNAL_CALENDARS_KEY);
  const calendars: ExternalCalendar[] = data ? JSON.parse(data) : [];
  
  const filterId = propertyId || property.id;
  return calendars.filter(c => c.propertyId === filterId);
}

export async function getExternalCalendarsAsync(propertyId?: string): Promise<ExternalCalendar[]> {
  if (isSupabaseConfigured && supabase) {
    const filterId = propertyId || property.id;
    const { data, error } = await supabase
      .from('external_calendars')
      .select('*')
      .eq('property_id', filterId);
    
    if (error) {
      console.error('Error fetching external calendars:', error);
      return [];
    }
    
    return (data || []).map(toExternalCalendar);
  }
  
  return getExternalCalendars(propertyId);
}

export function addExternalCalendar(calendar: Omit<ExternalCalendar, 'id'>): ExternalCalendar {
  if (!isClient) throw new Error('Cannot add calendar on server');
  
  if (isSupabaseConfigured) {
    console.warn('Use addExternalCalendarAsync() for Supabase');
    throw new Error('Use addExternalCalendarAsync() for Supabase');
  }
  
  const data = localStorage.getItem(EXTERNAL_CALENDARS_KEY);
  const calendars: ExternalCalendar[] = data ? JSON.parse(data) : [];
  
  const newCalendar: ExternalCalendar = {
    ...calendar,
    id: `cal-${Date.now()}`,
  };
  
  calendars.push(newCalendar);
  localStorage.setItem(EXTERNAL_CALENDARS_KEY, JSON.stringify(calendars));
  
  return newCalendar;
}

export async function addExternalCalendarAsync(calendar: Omit<ExternalCalendar, 'id'>): Promise<ExternalCalendar> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('external_calendars')
      .insert({
        property_id: calendar.propertyId,
        name: calendar.name,
        url: calendar.url,
        room_type_id: calendar.roomTypeId || null,
        last_synced: calendar.lastSynced || null,
        is_active: calendar.isActive,
      })
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error adding external calendar:', error);
      throw new Error('Failed to add external calendar');
    }
    
    return toExternalCalendar(data);
  }
  
  return addExternalCalendar(calendar);
}

export function updateExternalCalendar(id: string, updates: Partial<ExternalCalendar>): ExternalCalendar | undefined {
  if (!isClient) return undefined;
  
  if (isSupabaseConfigured) {
    console.warn('Use updateExternalCalendarAsync() for Supabase');
    return undefined;
  }
  
  const data = localStorage.getItem(EXTERNAL_CALENDARS_KEY);
  const calendars: ExternalCalendar[] = data ? JSON.parse(data) : [];
  
  const index = calendars.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  
  calendars[index] = { ...calendars[index], ...updates };
  localStorage.setItem(EXTERNAL_CALENDARS_KEY, JSON.stringify(calendars));
  
  return calendars[index];
}

export async function updateExternalCalendarAsync(id: string, updates: Partial<ExternalCalendar>): Promise<ExternalCalendar | undefined> {
  if (isSupabaseConfigured && supabase) {
    const supabaseUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) supabaseUpdates.name = updates.name;
    if (updates.url !== undefined) supabaseUpdates.url = updates.url;
    if (updates.roomTypeId !== undefined) supabaseUpdates.room_type_id = updates.roomTypeId || null;
    if (updates.lastSynced !== undefined) supabaseUpdates.last_synced = updates.lastSynced || null;
    if (updates.isActive !== undefined) supabaseUpdates.is_active = updates.isActive;
    
    const { data, error } = await supabase
      .from('external_calendars')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) {
      console.error('Error updating external calendar:', error);
      return undefined;
    }
    
    return toExternalCalendar(data);
  }
  
  return updateExternalCalendar(id, updates);
}

export function removeExternalCalendar(id: string): boolean {
  if (!isClient) return false;
  
  if (isSupabaseConfigured) {
    console.warn('Use removeExternalCalendarAsync() for Supabase');
    return false;
  }
  
  const data = localStorage.getItem(EXTERNAL_CALENDARS_KEY);
  const calendars: ExternalCalendar[] = data ? JSON.parse(data) : [];
  
  const index = calendars.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  calendars.splice(index, 1);
  localStorage.setItem(EXTERNAL_CALENDARS_KEY, JSON.stringify(calendars));
  
  return true;
}

export async function removeExternalCalendarAsync(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('external_calendars')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error removing external calendar:', error);
      return false;
    }
    
    return true;
  }
  
  return removeExternalCalendar(id);
}

// Update external calendar sync timestamp
export function updateExternalCalendarSync(id: string, lastSynced: string): ExternalCalendar | undefined {
  return updateExternalCalendar(id, { lastSynced });
}

export async function updateExternalCalendarSyncAsync(id: string, lastSynced: string): Promise<ExternalCalendar | undefined> {
  return updateExternalCalendarAsync(id, { lastSynced });
}

// Sync external calendar (fetch and import blocked dates)
export async function syncExternalCalendar(id: string): Promise<{ success: boolean; imported?: number; error?: string }> {
  try {
    // Get the calendar details
    const calendars = isSupabaseConfigured 
      ? await getExternalCalendarsAsync() 
      : getExternalCalendars();
    
    const calendar = calendars.find(c => c.id === id);
    if (!calendar) {
      return { success: false, error: 'Calendar not found' };
    }

    // In demo mode, simulate a successful sync
    if (!isSupabaseConfigured) {
      // For demo, just update the last synced time
      updateExternalCalendarSync(id, new Date().toISOString());
      return { success: true, imported: 0 };
    }

    // For production with Supabase, call the sync API
    const response = await fetch('/api/sync-calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calendarId: id }),
    });

    if (!response.ok) {
      return { success: false, error: 'Sync failed' };
    }

    const result = await response.json();
    return { success: true, imported: result.imported || 0 };
  } catch (error) {
    console.error('Error syncing calendar:', error);
    return { success: false, error: 'Sync failed' };
  }
}

// Add blocked dates from external calendar import
export function addBlockedDatesFromImport(
  dates: Omit<BlockedDate, 'id'>[],
  sourceCalendarId: string
): BlockedDate[] {
  if (isSupabaseConfigured) {
    console.warn('Use addBlockedDatesFromImportAsync() for Supabase');
    return [];
  }
  
  const allBlockedDates = getAllBlockedDates();
  const newBlockedDates: BlockedDate[] = [];
  
  for (const date of dates) {
    const exists = allBlockedDates.some(
      b => b.date === date.date && 
           b.propertyId === date.propertyId && 
           b.reason.includes(sourceCalendarId)
    );
    
    if (!exists) {
      const newBlocked: BlockedDate = {
        ...date,
        id: `block-import-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        reason: `[${sourceCalendarId}] ${date.reason}`,
      };
      newBlockedDates.push(newBlocked);
      allBlockedDates.push(newBlocked);
    }
  }
  
  if (isClient && newBlockedDates.length > 0) {
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(allBlockedDates));
  }
  
  return newBlockedDates;
}

export async function addBlockedDatesFromImportAsync(
  dates: Omit<BlockedDate, 'id'>[],
  sourceCalendarId: string
): Promise<BlockedDate[]> {
  if (isSupabaseConfigured && supabase) {
    const allBlockedDates = await getAllBlockedDatesAsync();
    const newBlockedDates: BlockedDate[] = [];
    
    for (const date of dates) {
      const exists = allBlockedDates.some(
        b => b.date === date.date && 
             b.propertyId === date.propertyId && 
             b.reason.includes(sourceCalendarId)
      );
      
      if (!exists) {
        const { data, error } = await supabase
          .from('blocked_dates')
          .insert({
            property_id: date.propertyId,
            date: date.date,
            reason: `[${sourceCalendarId}] ${date.reason}`,
            room_type_id: date.roomTypeId || null,
          })
          .select()
          .single();
        
        if (!error && data) {
          newBlockedDates.push(toBlockedDate(data));
        }
      }
    }
    
    return newBlockedDates;
  }
  
  return addBlockedDatesFromImport(dates, sourceCalendarId);
}

// Remove blocked dates from a specific import source
export function removeBlockedDatesFromSource(sourceCalendarId: string): number {
  if (!isClient) return 0;
  
  if (isSupabaseConfigured) {
    console.warn('Use removeBlockedDatesFromSourceAsync() for Supabase');
    return 0;
  }
  
  const allBlockedDates = getAllBlockedDates();
  const filtered = allBlockedDates.filter(b => !b.reason.includes(`[${sourceCalendarId}]`));
  const removed = allBlockedDates.length - filtered.length;
  
  localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(filtered));
  
  return removed;
}

export async function removeBlockedDatesFromSourceAsync(sourceCalendarId: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    const allBlockedDates = await getAllBlockedDatesAsync();
    const toRemove = allBlockedDates.filter(b => b.reason.includes(`[${sourceCalendarId}]`));
    
    for (const blocked of toRemove) {
      await supabase
        .from('blocked_dates')
        .delete()
        .eq('id', blocked.id);
    }
    
    return toRemove.length;
  }
  
  return removeBlockedDatesFromSource(sourceCalendarId);
}

// =============================================
// UTILITY: Check if using database
// =============================================

export function isUsingDatabase(): boolean {
  return isSupabaseConfigured;
}
