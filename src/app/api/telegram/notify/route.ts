/**
 * Telegram Notification API Route
 * 
 * FREE alternative to WhatsApp!
 * Uses Telegram Bot API to send instant notifications.
 * 
 * Setup (5 minutes):
 * 1. Open Telegram, search for @BotFather
 * 2. Send /newbot and follow instructions
 * 3. Copy the bot token
 * 4. Start a chat with your bot, then get your chat ID from:
 *    https://api.telegram.org/bot<TOKEN>/getUpdates
 * 5. Add token and chat ID to property config
 */

import { NextRequest, NextResponse } from 'next/server';
import { Booking, PropertyConfig, RoomType } from '@/types';
import { translations } from '@/lib/i18n/translations';
import { format, Locale } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';

const dateLocales: Record<string, Locale> = { hr, en: enUS, de, it, sl };

// Send message via Telegram Bot API
async function sendTelegramMessage(botToken: string, chatId: string, message: string): Promise<boolean> {
  if (!botToken || !chatId) {
    // Demo mode - log to console
    console.log('\n📱 Telegram Notification (Demo Mode)');
    console.log('━'.repeat(50));
    console.log(`Chat ID: ${chatId || '(not configured)'}`);
    console.log(`Message:\n${message}`);
    console.log('━'.repeat(50));
    console.log('(Configure botToken and chatId to send real messages)\n');
    return true;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    
    if (result.ok) {
      console.log(`✅ Telegram sent to ${chatId}`);
      return true;
    } else {
      console.error('❌ Telegram error:', result.description);
      return false;
    }
  } catch (error) {
    console.error('❌ Telegram send failed:', error);
    return false;
  }
}

// Build notification messages
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

  return `🔔 *Nova rezervacija!*

👤 *${booking.guestName}*
📞 ${booking.guestPhone}
📧 ${booking.guestEmail}

🏠 ${roomType.name}
📅 ${checkInFormatted} → ${checkOutFormatted}
🌙 ${nights} ${nights === 1 ? (t.night || 'noć') : (t.nights || 'noći')}
👥 ${booking.guests} ${booking.guests === 1 ? (t.guest || 'gost') : (t.guestPlural || 'gostiju')}

💰 *${property.currency}${booking.totalPrice}*
${booking.payment?.status === 'paid'
    ? `✅ Ara plaćena: ${property.currency}${booking.payment.amount}`
    : `⏳ Čeka plaćanje`}
${booking.specialRequests ? `\n📝 ${booking.specialRequests}` : ''}

_Provjerite upravljačku ploču za potvrdu._`;
}

function buildPaymentReceivedMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  if (!booking.payment || booking.payment.status !== 'paid') return '';

  return `💳 *Plaćanje primljeno!*

👤 ${booking.guestName}
🏠 ${roomType.name}

💰 Ara: *${property.currency}${booking.payment.amount}*
${booking.payment.cardLast4 ? `💳 **** ${booking.payment.cardLast4}` : ''}

📋 Ukupno: ${property.currency}${booking.totalPrice}
📋 Ostatak: ${property.currency}${booking.totalPrice - booking.payment.amount}`;
}

function buildGuestArrivingMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const locale = dateLocales[property.locale] || enUS;
  const checkInFormatted = format(new Date(booking.checkIn), 'EEEE, dd.MM.', { locale });

  return `⏰ *Gost dolazi sutra!*

👤 *${booking.guestName}*
📞 ${booking.guestPhone}

🏠 ${roomType.name}
📅 ${checkInFormatted} ${property.checkInTime}
👥 ${booking.guests} gostiju

${booking.payment?.status === 'paid'
    ? `✅ Ara: ${property.currency}${booking.payment.amount}\n📋 Za naplatiti: ${property.currency}${booking.totalPrice - booking.payment.amount}`
    : `💰 Za naplatiti: ${property.currency}${booking.totalPrice}`}
${booking.specialRequests ? `\n📝 ${booking.specialRequests}` : ''}`;
}

function buildBookingConfirmedMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const locale = dateLocales[property.locale] || enUS;
  const checkInFormatted = format(new Date(booking.checkIn), 'dd.MM.yyyy', { locale });

  return `✅ *Rezervacija potvrđena*

👤 ${booking.guestName}
🏠 ${roomType.name}
📅 ${checkInFormatted}
💰 ${property.currency}${booking.totalPrice}

_Gost je obaviješten putem emaila._`;
}

function buildBookingCancelledMessage(
  booking: Booking,
  roomType: RoomType,
  property: PropertyConfig
): string {
  const locale = dateLocales[property.locale] || enUS;
  const checkInFormatted = format(new Date(booking.checkIn), 'dd.MM.yyyy', { locale });

  return `❌ *Rezervacija otkazana*

👤 ${booking.guestName}
🏠 ${roomType.name}
📅 ${checkInFormatted}
${booking.payment?.status === 'paid'
    ? `\n⚠️ Potreban povrat: ${property.currency}${booking.payment.amount}`
    : ''}`;
}

// API Route Handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, booking, roomType, property } = body;

    // Check if Telegram is enabled
    const telegramConfig = property.features?.telegram;
    if (!telegramConfig?.enabled) {
      return NextResponse.json({ success: false, reason: 'Telegram disabled' });
    }

    let message = '';

    switch (type) {
      case 'new_booking':
        if (!telegramConfig.notifyOnNewBooking) {
          return NextResponse.json({ success: false, reason: 'New booking notifications disabled' });
        }
        message = buildNewBookingMessage(booking, roomType, property);
        break;

      case 'payment_received':
        if (!telegramConfig.notifyOnPayment) {
          return NextResponse.json({ success: false, reason: 'Payment notifications disabled' });
        }
        message = buildPaymentReceivedMessage(booking, roomType, property);
        break;

      case 'guest_arriving':
        if (!telegramConfig.notifyOnDayBefore) {
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

    const success = await sendTelegramMessage(
      telegramConfig.botToken,
      telegramConfig.chatId,
      message
    );

    return NextResponse.json({ success });
  } catch (error) {
    console.error('Telegram API error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
