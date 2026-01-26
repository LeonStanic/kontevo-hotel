/**
 * Unified Notification Service
 * 
 * Handles all notification channels based on property features config.
 * Each channel is optional and can be independently enabled/disabled.
 * 
 * Supported channels:
 * - 📧 Email (via Resend) - free tier: 100/day
 * - 📱 Telegram (via Bot API) - FREE, unlimited
 * - 💬 WhatsApp (via Twilio) - ~$0.005/msg
 */

import { Booking, PropertyConfig, RoomType } from '@/types';

interface NotificationData {
  booking: Booking;
  roomType: RoomType;
  property: PropertyConfig;
}

type NotificationType = 
  | 'new_booking' 
  | 'payment_received' 
  | 'guest_arriving' 
  | 'booking_confirmed' 
  | 'booking_cancelled';

/**
 * Send notification via Telegram (FREE!)
 */
async function sendTelegramNotification(
  type: NotificationType,
  data: NotificationData
): Promise<boolean> {
  const { property } = data;
  
  // Check if Telegram is enabled via features config
  if (!property.features?.telegram?.enabled) {
    return false;
  }

  try {
    const response = await fetch('/api/telegram/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...data }),
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Telegram notification failed:', error);
    return false;
  }
}

/**
 * Send notification via WhatsApp (Twilio - paid)
 */
async function sendWhatsAppNotification(
  type: NotificationType,
  data: NotificationData
): Promise<boolean> {
  const { property } = data;
  
  // Check if WhatsApp is enabled (via features or legacy config)
  const whatsappEnabled = property.features?.whatsapp?.enabled || property.whatsapp?.enabled;
  if (!whatsappEnabled) {
    return false;
  }

  try {
    const response = await fetch('/api/whatsapp/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...data }),
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('WhatsApp notification failed:', error);
    return false;
  }
}

/**
 * Main notification function - sends to all enabled channels
 */
export async function sendOwnerNotification(
  type: NotificationType,
  data: NotificationData
): Promise<{ telegram: boolean; whatsapp: boolean }> {
  // Send to all enabled channels in parallel
  const [telegram, whatsapp] = await Promise.all([
    sendTelegramNotification(type, data),
    sendWhatsAppNotification(type, data),
  ]);

  return { telegram, whatsapp };
}

// ============================================
// Convenience functions for specific events
// ============================================

/**
 * Notify owner: New booking received
 */
export async function notifyNewBooking(data: NotificationData) {
  return sendOwnerNotification('new_booking', data);
}

/**
 * Notify owner: Payment received
 */
export async function notifyPaymentReceived(data: NotificationData) {
  return sendOwnerNotification('payment_received', data);
}

/**
 * Notify owner: Guest arriving tomorrow
 */
export async function notifyGuestArriving(data: NotificationData) {
  return sendOwnerNotification('guest_arriving', data);
}

/**
 * Notify owner: Booking confirmed
 */
export async function notifyBookingConfirmed(data: NotificationData) {
  return sendOwnerNotification('booking_confirmed', data);
}

/**
 * Notify owner: Booking cancelled
 */
export async function notifyBookingCancelled(data: NotificationData) {
  return sendOwnerNotification('booking_cancelled', data);
}

/**
 * Check which notification channels are enabled
 */
export function getEnabledChannels(property: PropertyConfig): {
  email: boolean;
  telegram: boolean;
  whatsapp: boolean;
} {
  return {
    email: property.features?.emailNotifications?.enabled ?? true, // Default on
    telegram: property.features?.telegram?.enabled ?? false,
    whatsapp: property.features?.whatsapp?.enabled ?? property.whatsapp?.enabled ?? false,
  };
}

/**
 * Send daily arrival reminders (call from cron job)
 */
export async function sendDailyArrivalReminders(
  bookings: Booking[],
  property: PropertyConfig
): Promise<void> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const arrivingTomorrow = bookings.filter(
    b => b.status === 'confirmed' && b.checkIn.startsWith(tomorrowStr)
  );

  for (const booking of arrivingTomorrow) {
    const roomType = property.roomTypes.find(r => r.id === booking.roomTypeId);
    if (roomType) {
      await notifyGuestArriving({ booking, roomType, property });
    }
  }
}
