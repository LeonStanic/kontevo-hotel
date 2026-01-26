import { Booking, PropertyConfig } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { format } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';

const localeMap = {
  hr: hr,
  en: enUS,
  de: de,
  it: it,
  sl: sl,
};

// Check if real email service is configured
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const isEmailConfigured = Boolean(RESEND_API_KEY);

// Helper to get room name
const getRoomName = (property: PropertyConfig, roomTypeId: string): string => {
  const room = property.roomTypes.find(r => r.id === roomTypeId);
  return room ? room.name : roomTypeId;
};

// Helper to format date
const formatDate = (dateString: string, locale: PropertyConfig['locale']): string => {
  const date = new Date(dateString);
  return format(date, 'dd. MMMM yyyy.', { locale: localeMap[locale] });
};

// Helper to format currency
const formatCurrency = (amount: number, currency: string): string => {
  return `${currency}${amount.toFixed(2)}`;
};

// Helper to get payment status text
const getPaymentStatusText = (
  booking: Booking,
  property: PropertyConfig,
  t: ReturnType<typeof getTranslations>
): string => {
  if (booking.paymentStatus === 'paid_advance' && booking.amountPaid) {
    return `${t.booking.payment.advancePayment}: ${formatCurrency(booking.amountPaid, property.currency)}`;
  }
  if (booking.paymentStatus === 'paid_full') {
    return t.booking.payment.payFull;
  }
  return t.booking.payment.payLater;
};

/**
 * Send email using Resend API (production) or console log (development)
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  from: string
): Promise<{ success: boolean; error?: string }> {
  // If Resend is configured, use it
  if (isEmailConfigured && RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: from,
          to: to,
          subject: subject,
          text: body,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Resend API error:', error);
        return { success: false, error: error.message || 'Failed to send email' };
      }

      console.log(`✉️ Email sent to ${to}: ${subject}`);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Development mode - log to console
  console.log('\n' + '='.repeat(60));
  console.log('📧 MOCK EMAIL (add RESEND_API_KEY to enable real emails)');
  console.log('='.repeat(60));
  console.log(`From: ${from}`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('-'.repeat(60));
  console.log(body);
  console.log('='.repeat(60) + '\n');
  
  return { success: true };
}

/**
 * Send booking confirmation email to guest when booking is created
 */
export async function sendGuestBookingConfirmationEmail(
  booking: Booking,
  property: PropertyConfig
): Promise<void> {
  if (!property.email?.sendEmails) {
    return;
  }

  const t = getTranslations(property.locale);
  const roomName = getRoomName(property, booking.roomTypeId);
  const checkInDate = formatDate(booking.checkIn, property.locale);
  const checkOutDate = formatDate(booking.checkOut, property.locale);
  const totalPrice = formatCurrency(booking.totalPrice, property.currency);
  const paymentStatus = getPaymentStatusText(booking, property, t);

  const subject = t.email.bookingConfirmationSubject;
  
  const body = t.email.bookingConfirmationBody
    .replace(/{guestName}/g, booking.guestName)
    .replace(/{propertyName}/g, property.hotelName)
    .replace(/{bookingId}/g, booking.id)
    .replace(/{roomName}/g, roomName)
    .replace(/{checkInDate}/g, checkInDate)
    .replace(/{checkOutDate}/g, checkOutDate)
    .replace(/{guests}/g, booking.guests.toString())
    .replace(/{totalPrice}/g, totalPrice)
    .replace(/{paymentStatus}/g, paymentStatus);

  await sendEmail(
    booking.guestEmail,
    subject,
    body,
    `${property.hotelName} <${property.contactInfo.email}>`
  );
}

/**
 * Send new booking notification email to property owner
 */
export async function sendOwnerNewBookingNotificationEmail(
  booking: Booking,
  property: PropertyConfig
): Promise<void> {
  if (!property.email?.sendEmails || !property.email?.ownerEmail) {
    return;
  }

  const t = getTranslations(property.locale);
  const roomName = getRoomName(property, booking.roomTypeId);
  const checkInDate = formatDate(booking.checkIn, property.locale);
  const checkOutDate = formatDate(booking.checkOut, property.locale);
  const totalPrice = formatCurrency(booking.totalPrice, property.currency);
  const paymentStatus = getPaymentStatusText(booking, property, t);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const dashboardLink = `${baseUrl}/dashboard`;

  const subject = t.email.ownerNewBookingSubject.replace(/{bookingId}/g, booking.id);
  
  const body = t.email.ownerNewBookingBody
    .replace(/{propertyName}/g, property.hotelName)
    .replace(/{bookingId}/g, booking.id)
    .replace(/{roomName}/g, roomName)
    .replace(/{checkInDate}/g, checkInDate)
    .replace(/{checkOutDate}/g, checkOutDate)
    .replace(/{guests}/g, booking.guests.toString())
    .replace(/{guestName}/g, booking.guestName)
    .replace(/{guestEmail}/g, booking.guestEmail)
    .replace(/{guestPhone}/g, booking.guestPhone)
    .replace(/{totalPrice}/g, totalPrice)
    .replace(/{paymentStatus}/g, paymentStatus)
    .replace(/{dashboardLink}/g, dashboardLink);

  await sendEmail(
    property.email.ownerEmail,
    subject,
    body,
    `${property.hotelName} Booking System <${property.contactInfo.email}>`
  );
}

/**
 * Send booking confirmed email to guest when owner confirms
 */
export async function sendGuestBookingConfirmedEmail(
  booking: Booking,
  property: PropertyConfig
): Promise<void> {
  if (!property.email?.sendEmails) {
    return;
  }

  const t = getTranslations(property.locale);
  const roomName = getRoomName(property, booking.roomTypeId);
  const checkInDate = formatDate(booking.checkIn, property.locale);
  const checkOutDate = formatDate(booking.checkOut, property.locale);
  const totalPrice = formatCurrency(booking.totalPrice, property.currency);
  const paymentStatus = getPaymentStatusText(booking, property, t);

  const subject = t.email.ownerBookingConfirmedSubject
    .replace(/{bookingId}/g, booking.id)
    .replace(/{propertyName}/g, property.hotelName);
  
  const body = t.email.ownerBookingConfirmedBody
    .replace(/{guestName}/g, booking.guestName)
    .replace(/{bookingId}/g, booking.id)
    .replace(/{propertyName}/g, property.hotelName)
    .replace(/{roomName}/g, roomName)
    .replace(/{checkInDate}/g, checkInDate)
    .replace(/{checkOutDate}/g, checkOutDate)
    .replace(/{guests}/g, booking.guests.toString())
    .replace(/{totalPrice}/g, totalPrice)
    .replace(/{paymentStatus}/g, paymentStatus);

  await sendEmail(
    booking.guestEmail,
    subject,
    body,
    `${property.hotelName} <${property.contactInfo.email}>`
  );
}

/**
 * Check if email service is properly configured
 */
export function isEmailServiceConfigured(): boolean {
  return isEmailConfigured;
}
