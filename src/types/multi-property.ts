/**
 * Multi-Property Types
 * 
 * Types for managing multiple properties under one owner/dashboard.
 * Used for clients with 5+ properties who need unified management.
 */

// ============================================
// OWNER (manages multiple properties)
// ============================================

export interface Owner {
  id: string;
  email: string;
  name: string;
  phone?: string;
  
  // Notification settings (shared across all properties)
  telegramBotToken?: string;
  telegramChatId?: string;
  whatsappPhone?: string;
  
  createdAt: string;
  updatedAt: string;
}

// ============================================
// PROPERTY
// ============================================

export type PropertyStatus = 'active' | 'inactive' | 'draft';

export interface Property {
  id: string;
  ownerId: string;
  
  // Identification
  slug: string; // For subdomain: vila-ana.domain.com
  name: string;
  tagline?: string;
  description?: string;
  
  // Localization
  locale: 'hr' | 'en' | 'de' | 'it' | 'sl';
  currency: string;
  
  // Branding
  logoUrl?: string;
  heroImageUrl?: string;
  photos: PropertyPhoto[];
  
  // Contact
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  
  // Social
  facebookUrl?: string;
  instagramUrl?: string;
  
  // Theme
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Settings
  checkInTime: string;
  checkOutTime: string;
  directBookingDiscount: number;
  
  // Features
  features: PropertyFeatures;
  
  // Status
  status: PropertyStatus;
  
  // Rooms
  rooms: Room[];
  
  createdAt: string;
  updatedAt: string;
}

export interface PropertyPhoto {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
}

export interface PropertyFeatures {
  payment: {
    enabled: boolean;
    advancePaymentPercent: number;
    testMode?: boolean;
  };
  emailNotifications: {
    enabled: boolean;
    notifyOwnerOnBooking?: boolean;
    notifyGuestOnBooking?: boolean;
    notifyGuestOnConfirm?: boolean;
  };
  telegram: {
    enabled: boolean;
    // Uses owner's telegram settings
  };
  whatsapp: {
    enabled: boolean;
    // Uses owner's whatsapp settings
  };
  calendarSync: {
    enabled: boolean;
    allowImport?: boolean;
    allowExport?: boolean;
  };
  gallery: {
    enabled: boolean;
  };
}

// ============================================
// ROOM
// ============================================

export interface Room {
  id: string;
  propertyId: string;
  
  name: string;
  description?: string;
  price: number;
  maxGuests: number;
  
  photos: RoomPhoto[];
  amenities: string[];
  
  sortOrder: number;
  isActive: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface RoomPhoto {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
}

// ============================================
// BOOKING (with property reference)
// ============================================

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Booking {
  id: string;
  propertyId: string;
  roomId: string;
  
  // Guest info
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  
  // Booking details
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  
  // Pricing
  totalPrice: number;
  
  // Status
  status: BookingStatus;
  
  // Payment
  payment?: {
    status: PaymentStatus;
    amount: number;
    currency: string;
    transactionId?: string;
    cardLast4?: string;
    cardBrand?: string;
    paidAt?: string;
  };
  
  createdAt: string;
  updatedAt: string;
  
  // Joined data (from queries)
  property?: Property;
  room?: Room;
}

// ============================================
// BLOCKED DATE
// ============================================

export interface BlockedDate {
  id: string;
  propertyId: string;
  roomId?: string; // null = all rooms
  date: string;
  reason?: string;
  createdAt: string;
}

// ============================================
// EXTERNAL CALENDAR
// ============================================

export interface ExternalCalendar {
  id: string;
  propertyId: string;
  roomId?: string;
  name: string;
  url: string;
  isActive: boolean;
  lastSynced?: string;
  createdAt: string;
}

// ============================================
// DASHBOARD VIEWS
// ============================================

export interface PropertyOverview {
  id: string;
  slug: string;
  name: string;
  status: PropertyStatus;
  roomCount: number;
  upcomingBookings: number;
  revenueThisMonth: number;
  pendingCount: number;
}

export interface OwnerDashboardSummary {
  ownerId: string;
  propertyCount: number;
  totalUpcomingBookings: number;
  totalPending: number;
  totalRevenueThisMonth: number;
}

// ============================================
// API RESPONSES
// ============================================

export interface PropertiesListResponse {
  properties: PropertyOverview[];
  summary: OwnerDashboardSummary;
}

export interface PropertyDetailResponse {
  property: Property;
  rooms: Room[];
  recentBookings: Booking[];
  stats: {
    bookingsThisMonth: number;
    revenueThisMonth: number;
    occupancyRate: number;
    pendingCount: number;
  };
}

// ============================================
// FORMS
// ============================================

export interface CreatePropertyInput {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  locale?: 'hr' | 'en' | 'de' | 'it' | 'sl';
  currency?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
}

export interface CreateRoomInput {
  propertyId: string;
  name: string;
  description?: string;
  price: number;
  maxGuests: number;
  amenities?: string[];
}

export interface UpdatePropertyInput extends Partial<CreatePropertyInput> {
  id: string;
  status?: PropertyStatus;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  checkInTime?: string;
  checkOutTime?: string;
  directBookingDiscount?: number;
  features?: Partial<PropertyFeatures>;
}
