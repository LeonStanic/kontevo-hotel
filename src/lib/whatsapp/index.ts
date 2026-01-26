/**
 * WhatsApp Notification Client
 * 
 * Client-side functions that call the WhatsApp API route.
 * The actual Twilio integration happens server-side in /api/whatsapp/notify.
 */

import { Booking, PropertyConfig, RoomType } from '@/types';

interface BookingNotificationData {
  booking: Booking;
  roomType: RoomType;
  property: PropertyConfig;
}

/**
 * Send notification to owner: New booking received
 */
export async function notifyOwnerNewBooking(data: BookingNotificationData): Promise<boolean> {
  return sendNotification('new_booking', data);
}

/**
 * Send notification to owner: Payment received
 */
export async function notifyOwnerPaymentReceived(data: BookingNotificationData): Promise<boolean> {
  return sendNotification('payment_received', data);
}

/**
 * Send notification to owner: Guest arriving tomorrow
 */
export async function notifyOwnerGuestArrivingTomorrow(data: BookingNotificationData): Promise<boolean> {
  return sendNotification('guest_arriving', data);
}

/**
 * Send notification to owner: Booking confirmed
 */
export async function notifyOwnerBookingConfirmed(data: BookingNotificationData): Promise<boolean> {
  return sendNotification('booking_confirmed', data);
}

/**
 * Send notification to owner: Booking cancelled
 */
export async function notifyOwnerBookingCancelled(data: BookingNotificationData): Promise<boolean> {
  return sendNotification('booking_cancelled', data);
}

/**
 * Internal: Call the WhatsApp API route
 */
async function sendNotification(
  type: 'new_booking' | 'payment_received' | 'guest_arriving' | 'booking_confirmed' | 'booking_cancelled',
  data: BookingNotificationData
): Promise<boolean> {
  try {
    const response = await fetch('/api/whatsapp/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        booking: data.booking,
        roomType: data.roomType,
        property: data.property,
      }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error(`Failed to send WhatsApp notification (${type}):`, error);
    return false;
  }
}

/**
 * Check all bookings and send "guest arriving tomorrow" notifications
 * This should be called by a cron job or scheduled function daily
 */
export async function sendDailyArrivalReminders(
  bookings: Booking[],
  property: PropertyConfig
): Promise<void> {
  if (!property.whatsapp?.enabled || !property.whatsapp.notifyOnDayBefore) {
    return;
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const arrivingTomorrow = bookings.filter(
    b => b.status === 'confirmed' && b.checkIn.startsWith(tomorrowStr)
  );

  for (const booking of arrivingTomorrow) {
    const roomType = property.roomTypes.find(r => r.id === booking.roomTypeId);
    if (roomType) {
      await notifyOwnerGuestArrivingTomorrow({ booking, roomType, property });
    }
  }
}
