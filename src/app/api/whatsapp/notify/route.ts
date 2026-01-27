/**
 * WhatsApp Notification API Route
 * 
 * This server-side API handles WhatsApp notifications using Twilio.
 * Client components call this API instead of importing Twilio directly.
 */

import { NextRequest, NextResponse } from 'next/server';
import { Booking, PropertyConfig, RoomType } from '@/types';
import { translations } from '@/lib/i18n/translations';
import { format, Locale } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';

// Date locale mapping
const dateLocales: Record<string, Locale> = { hr, en: enUS, de, it, sl };

// Check if Twilio is configured
function isWhatsAppConfigured(): boolean {
  return !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_WHATSAPP_FROM
  );
}

// Format phone number for WhatsApp
function formatWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (!cleaned.startsWith('+')) {
    if (cleaned.startsWith('0')) {
      cleaned = '+385' + cleaned.substring(1);
    } else {
      cleaned = '+' + cleaned;
    }
  }
  return `whatsapp:${cleaned}`;
}

// Send WhatsApp message
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  if (!isWhatsAppConfigured()) {
    // Demo mode - log to console
    console.log('\n📱 WhatsApp Notification (Demo Mode)');
    console.log('━'.repeat(50));
    console.log(`To: ${to}`);
    console.log(`Message:\n${message}`);
    console.log('━'.repeat(50));
    console.log('(Configure Twilio to send real messages)\n');
    return true;
  }

  try {
    const twilio = (await import('twilio')).default;
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to: formatWhatsAppNumber(to),
      body: message,
    });

    console.log(`✅ WhatsApp sent to ${to}, SID: ${result.sid}`);
    return true;
  } catch (error) {
    console.error('❌ WhatsApp send failed:', error);
    return false;
  }
}

// Build notification message
function buildNewBookingMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const t = translations[property.locale];
  const locale = dateLocales[property.locale] || enUS;

  const checkInFormatted = format(new Date(booking.checkIn), 'dd.MM.yyyy', { locale });
  const checkOutFormatted = format(new Date(booking.checkOut), 'dd.MM.yyyy', { locale });

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  return `🔔 *${t.whatsapp?.newBookingTitle || 'Nova rezervacija!'}*

👤 ${booking.guestName}
📞 ${booking.guestPhone}
📧 ${booking.guestEmail}

🏠 ${roomType.name}
📅 ${checkInFormatted} → ${checkOutFormatted}
🌙 ${nights} ${nights === 1 ? (t.night || 'noć') : (t.nights || 'noći')}
👥 ${booking.guests} ${booking.guests === 1 ? (t.guest || 'gost') : (t.guestPlural || 'gostiju')}

💰 *${property.currency}${booking.totalPrice}*
${booking.payment?.status === 'paid'
    ? `✅ ${t.whatsapp?.advancePaid || 'Ara plaćena'}: ${property.currency}${booking.payment.amount}`
    : `⏳ ${t.whatsapp?.awaitingPayment || 'Čeka plaćanje'}`}

${booking.specialRequests ? `📝 ${booking.specialRequests}` : ''}

${t.whatsapp?.checkDashboard || 'Provjerite nadzornu ploču za potvrdu.'}`;
}

function buildPaymentReceivedMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const t = translations[property.locale];

  if (!booking.payment || booking.payment.status !== 'paid') {
    return '';
  }

  return `💳 *${t.whatsapp?.paymentReceived || 'Plaćanje primljeno!'}*

👤 ${booking.guestName}
🏠 ${roomType.name}

💰 ${t.whatsapp?.advancePaid || 'Ara plaćena'}: *${property.currency}${booking.payment.amount}*
${booking.payment.cardLast4 ? `💳 **** ${booking.payment.cardLast4}` : ''}

📋 ${t.whatsapp?.totalPrice || 'Ukupno'}: ${property.currency}${booking.totalPrice}
📋 ${t.whatsapp?.remainingOnArrival || 'Ostatak na dolasku'}: ${property.currency}${booking.totalPrice - booking.payment.amount}`;
}

function buildGuestArrivingMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const t = translations[property.locale];
  const locale = dateLocales[property.locale] || enUS;

  const checkInFormatted = format(new Date(booking.checkIn), 'EEEE, dd.MM.', { locale });

  return `⏰ *${t.whatsapp?.guestArrivingTomorrow || 'Gost dolazi sutra!'}*

👤 ${booking.guestName}
📞 ${booking.guestPhone}

🏠 ${roomType.name}
📅 ${t.whatsapp?.checkIn || 'Prijava'}: ${checkInFormatted} ${property.checkInTime}
👥 ${booking.guests} ${booking.guests === 1 ? (t.guest || 'gost') : (t.guestPlural || 'gostiju')}

${booking.payment?.status === 'paid'
    ? `✅ ${t.whatsapp?.advancePaid || 'Ara plaćena'}: ${property.currency}${booking.payment.amount}\n📋 ${t.whatsapp?.collectOnArrival || 'Za naplatiti'}: ${property.currency}${booking.totalPrice - booking.payment.amount}`
    : `💰 ${t.whatsapp?.collectOnArrival || 'Za naplatiti'}: ${property.currency}${booking.totalPrice}`}

${booking.specialRequests ? `📝 ${booking.specialRequests}` : ''}`;
}

function buildBookingConfirmedMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const t = translations[property.locale];
  const locale = dateLocales[property.locale] || enUS;

  const checkInFormatted = format(new Date(booking.checkIn), 'dd.MM.yyyy', { locale });

  return `✅ *${t.whatsapp?.bookingConfirmed || 'Rezervacija potvrđena'}*

👤 ${booking.guestName}
🏠 ${roomType.name}
📅 ${checkInFormatted}
💰 ${property.currency}${booking.totalPrice}

${t.whatsapp?.guestNotified || 'Gost je obaviješten putem emaila.'}`;
}

function buildBookingCancelledMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const t = translations[property.locale];
  const locale = dateLocales[property.locale] || enUS;

  const checkInFormatted = format(new Date(booking.checkIn), 'dd.MM.yyyy', { locale });

  return `❌ *${t.whatsapp?.bookingCancelled || 'Rezervacija otkazana'}*

👤 ${booking.guestName}
🏠 ${roomType.name}
📅 ${checkInFormatted}

${booking.payment?.status === 'paid'
    ? `⚠️ ${t.whatsapp?.refundRequired || 'Potreban povrat'}: ${property.currency}${booking.payment.amount}`
    : ''}`;
}

// API Route Handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, booking, roomType, property } = body;

    if (!property.whatsapp?.enabled) {
      return NextResponse.json({ success: false, reason: 'WhatsApp disabled' });
    }

    let message = '';

    switch (type) {
      case 'new_booking':
        if (!property.whatsapp.notifyOnNewBooking) {
          return NextResponse.json({ success: false, reason: 'New booking notifications disabled' });
        }
        message = buildNewBookingMessage(booking, roomType, property);
        break;

      case 'payment_received':
        if (!property.whatsapp.notifyOnPayment) {
          return NextResponse.json({ success: false, reason: 'Payment notifications disabled' });
        }
        message = buildPaymentReceivedMessage(booking, roomType, property);
        break;

      case 'guest_arriving':
        if (!property.whatsapp.notifyOnDayBefore) {
          return NextResponse.json({ success: false, reason: 'Arrival reminders disabled' });
        }
        message = buildGuestArrivingMessage(booking, roomType, property);
        break;

      case 'booking_confirmed':
        message = buildBookingConfirmedMessage(booking, roomType, property);
        break;

      case 'booking_cancelled':
        message = buildBookingCancelledMessage(booking, roomType, property);
        break;

      default:
        return NextResponse.json({ success: false, reason: 'Unknown notification type' });
    }

    if (!message) {
      return NextResponse.json({ success: false, reason: 'Empty message' });
    }

    const success = await sendWhatsAppMessage(property.whatsapp.ownerPhone, message);

    return NextResponse.json({ success });
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
