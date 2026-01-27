// Core types for the hotel booking system

export interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number; // per night
  maxGuests: number;
  photos: string[];
  amenities: string[];
}

export interface ContactInfo {
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  headerFont: string;
}

export type SupportedLocale = 'hr' | 'en' | 'de' | 'it' | 'sl';

export interface PropertyConfig {
  id: string;
  hotelName: string;
  tagline: string;
  description: string;
  logo: string;
  heroImage: string;
  propertyPhotos: string[];
  roomTypes: RoomType[];
  contactInfo: ContactInfo;
  theme: ThemeConfig;
  ownerPassword: string; // Simple password for demo
  checkInTime: string;
  checkOutTime: string;
  directBookingDiscount: number; // percentage
  locale: SupportedLocale; // Language: 'hr' | 'en' | 'de' | 'it' | 'sl'
  currency: string; // Currency symbol, e.g., '€', '$', 'kn'
  
  // ⚡ FEATURES - All optional, toggle per client
  features?: FeaturesConfig;
  
  // Legacy (for backwards compatibility) - use features.* instead
  payment?: PaymentConfig;
  whatsapp?: WhatsAppConfig;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Payment configuration for property
export interface PaymentConfig {
  enabled: boolean;
  advancePaymentPercent: number; // e.g., 30 means 30% advance
  testMode?: boolean; // Demo/test mode vs production (defaults to true/demo)
  // For future real payment integration:
  // stripePublicKey?: string;
  // paypalClientId?: string;
}

// WhatsApp notification configuration
export interface WhatsAppConfig {
  enabled: boolean;
  ownerPhone?: string; // Owner's WhatsApp number (with country code, e.g., +385...)
  // Notification preferences
  notifyOnNewBooking?: boolean;
  notifyOnPayment?: boolean;
  notifyOnDayBefore?: boolean; // Guest arriving tomorrow reminder
}

// Telegram notification configuration (FREE!)
export interface TelegramConfig {
  enabled: boolean;
  botToken?: string; // Get from @BotFather
  chatId?: string; // Owner's chat ID or group ID
  notifyOnNewBooking?: boolean;
  notifyOnPayment?: boolean;
  notifyOnDayBefore?: boolean;
}

// Email notification configuration
export interface EmailNotificationsConfig {
  enabled: boolean;
  notifyOwnerOnBooking?: boolean;
  notifyGuestOnBooking?: boolean;
  notifyGuestOnConfirm?: boolean;
}

// Calendar sync configuration
export interface CalendarSyncConfig {
  enabled: boolean;
  allowImport?: boolean;
  allowExport?: boolean;
}

// Simple feature toggle
export interface SimpleFeatureConfig {
  enabled: boolean;
}

// All features configuration
export interface FeaturesConfig {
  payment: PaymentConfig;
  emailNotifications: EmailNotificationsConfig;
  telegram: TelegramConfig;
  whatsapp: WhatsAppConfig;
  calendarSync: CalendarSyncConfig;
  gallery: SimpleFeatureConfig;
  discountCodes: SimpleFeatureConfig;
  reviewsCollection: SimpleFeatureConfig;
}

// Payment information for a booking
export interface PaymentInfo {
  status: PaymentStatus;
  amount: number; // Amount paid/to pay
  currency: string;
  method?: string; // 'card', 'paypal', etc.
  transactionId?: string;
  paidAt?: string; // ISO date string
  cardLast4?: string; // Last 4 digits of card
  cardBrand?: string; // 'visa', 'mastercard', etc.
}

export interface Booking {
  id: string;
  propertyId: string;
  roomTypeId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  specialRequests: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string; // ISO date string
  // Payment fields
  payment?: PaymentInfo;
}

export interface BlockedDate {
  id: string;
  propertyId: string;
  date: string; // ISO date string
  reason: string;
  roomTypeId?: string; // If specific to a room, otherwise all rooms
}

export interface DashboardStats {
  totalBookingsThisMonth: number;
  revenue: number;
  occupancyRate: number;
  pendingBookings: number;
}

// External calendar sync (iCal)
export interface ExternalCalendar {
  id: string;
  propertyId: string;
  name: string; // e.g., "Booking.com", "Airbnb"
  url: string; // iCal feed URL
  roomTypeId?: string; // Optional: sync to specific room
  lastSynced?: string; // ISO date string
  isActive: boolean;
}
