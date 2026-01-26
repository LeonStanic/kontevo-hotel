import { PropertyConfig } from '@/types';

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     PROPERTY CONFIGURATION                                 ║
 * ║                                                                           ║
 * ║  Quick Setup for New Client:                                              ║
 * ║  1. Update PROPERTY DETAILS section                                       ║
 * ║  2. Update CONTACT INFORMATION                                            ║
 * ║  3. Configure ROOM TYPES with client's apartments                         ║
 * ║  4. Set ownerPassword                                                     ║
 * ║  5. Toggle FEATURES based on client package                               ║
 * ║  6. Deploy!                                                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

export const property: PropertyConfig = {
  // Unique identifier (used in URLs and storage)
  id: 'kontevo-apartments',

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ LOCALIZATION                                                            │
  // └─────────────────────────────────────────────────────────────────────────┘
  locale: 'hr',        // 'hr' | 'en' | 'de' | 'it' | 'sl'
  currency: '€',       // Currency symbol

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ PROPERTY DETAILS                                                        │
  // └─────────────────────────────────────────────────────────────────────────┘
  hotelName: 'Kontevo Apartments',
  tagline: 'Moderan smještaj u srcu grada',
  description: `Dobrodošli u Kontevo Apartments, gdje suvremeni dizajn susreće urbanu udobnost. Naš boutique apartmanski kompleks nudi pažljivo dizajnirane životne prostore koji spajaju udobnost sa stilom, pružajući savršenu bazu za kratke boravke i dulje posjete.

Svaki apartman ima moderne sadržaje, potpuno opremljenu kuhinju i premium namještaj. Smješteni u živahnom centru grada, samo ste korak od restorana, kafića, trgovina i javnog prijevoza. Bilo da putujete poslovno ili privatno, Kontevo Apartments pruža autentično lokalno iskustvo sa svim udobnostima doma.

Naš posvećeni tim brine se o svakom detalju, od besprijekornog self check-ina do 24/7 podrške. Doživite slobodu apartmanskog života s kvalitetom usluge boutique hotela.`,

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ BRANDING                                                                │
  // └─────────────────────────────────────────────────────────────────────────┘
  logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
  heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=1080&fit=crop',
  propertyPhotos: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
  ],

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ ROOM TYPES / APARTMENT TYPES                                            │
  // └─────────────────────────────────────────────────────────────────────────┘
  roomTypes: [
    {
      id: 'studio-apartment',
      name: 'Studio apartman',
      description: 'Ugodan i praktičan studio savršen za solo putnike ili parove.',
      price: 89,
      maxGuests: 2,
      photos: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
      ],
      amenities: ['Bračni krevet', 'Kuhinja', 'Besplatan WiFi', 'Smart TV', 'Klima', 'Perilica rublja'],
    },
    {
      id: 'one-bedroom',
      name: 'Jednosobni apartman',
      description: 'Prostrani jednosobni apartman s odvojenim dnevnim boravkom.',
      price: 129,
      maxGuests: 3,
      photos: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      ],
      amenities: ['King krevet', 'Dnevni boravak', 'Potpuna kuhinja', 'Besplatan WiFi', 'Smart TV', 'Klima', 'Balkon'],
    },
  ],

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ CONTACT INFORMATION                                                     │
  // └─────────────────────────────────────────────────────────────────────────┘
  contactInfo: {
    address: 'Centralna ulica 42',
    city: 'Zagreb',
    country: 'Hrvatska',
    phone: '+385 1 234 5678',
    email: 'info@kontevo-apartments.com',
    socialMedia: {
      instagram: 'https://instagram.com/kontevoapartments',
      facebook: 'https://facebook.com/kontevoapartments',
    },
  },

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ THEME CUSTOMIZATION                                                     │
  // └─────────────────────────────────────────────────────────────────────────┘
  theme: {
    primaryColor: '#1e3a5f',      // Deep navy blue
    secondaryColor: '#3d5a80',    // Medium blue
    accentColor: '#ee6c4d',       // Warm coral/orange
    fontFamily: '"Inter", system-ui, sans-serif',
    headerFont: '"Outfit", system-ui, sans-serif',
  },

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ SETTINGS                                                                │
  // └─────────────────────────────────────────────────────────────────────────┘
  ownerPassword: 'kontevo2024',   // Dashboard access password
  checkInTime: '15:00',
  checkOutTime: '11:00',
  directBookingDiscount: 10,      // Percentage discount for direct bookings

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║                                                                           ║
  // ║                        ⚡ FEATURES TOGGLE ⚡                               ║
  // ║                                                                           ║
  // ║  Enable/disable features based on client package.                         ║
  // ║  Each feature can be independently configured.                            ║
  // ║                                                                           ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝

  features: {
    // ─────────────────────────────────────────────────────────────────────────
    // ONLINE PAYMENT (Advance payment collection)
    // Cost: Free (demo) / ~3% per transaction (Stripe)
    // ─────────────────────────────────────────────────────────────────────────
    payment: {
      enabled: false,             // ← Toggle this
      advancePaymentPercent: 30,  // Collect 30% advance
      testMode: true,             // Demo mode (no real charges)
    },

    // ─────────────────────────────────────────────────────────────────────────
    // EMAIL NOTIFICATIONS
    // Cost: Free (100/day with Resend) / ~$0.001/email after
    // ─────────────────────────────────────────────────────────────────────────
    emailNotifications: {
      enabled: true,              // ← Toggle this
      notifyOwnerOnBooking: true,
      notifyGuestOnBooking: true,
      notifyGuestOnConfirm: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TELEGRAM NOTIFICATIONS (FREE - Recommended!)
    // Cost: FREE, unlimited messages
    // Setup: Create bot with @BotFather, get chat ID
    // ─────────────────────────────────────────────────────────────────────────
    telegram: {
      enabled: false,             // ← Toggle this
      botToken: '',               // Get from @BotFather
      chatId: '',                 // Owner's chat ID
      notifyOnNewBooking: true,
      notifyOnPayment: true,
      notifyOnDayBefore: true,    // Guest arriving tomorrow reminder
    },

    // ─────────────────────────────────────────────────────────────────────────
    // WHATSAPP NOTIFICATIONS (Paid - Twilio)
    // Cost: ~$0.005/message
    // Setup: Twilio account + WhatsApp Business API
    // ─────────────────────────────────────────────────────────────────────────
    whatsapp: {
      enabled: false,             // ← Toggle this
      ownerPhone: '',             // +385911234567
      notifyOnNewBooking: true,
      notifyOnPayment: true,
      notifyOnDayBefore: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // CALENDAR SYNC (iCal import/export)
    // Cost: FREE
    // Sync with Booking.com, Airbnb, VRBO, Google Calendar
    // ─────────────────────────────────────────────────────────────────────────
    calendarSync: {
      enabled: true,              // ← Toggle this
      allowImport: true,          // Import from other platforms
      allowExport: true,          // Export to other platforms
    },

    // ─────────────────────────────────────────────────────────────────────────
    // GALLERY (Photo gallery section)
    // Cost: FREE
    // ─────────────────────────────────────────────────────────────────────────
    gallery: {
      enabled: true,              // ← Toggle this
    },

    // ─────────────────────────────────────────────────────────────────────────
    // DISCOUNT CODES (Promo codes for guests)
    // Cost: FREE
    // Coming soon!
    // ─────────────────────────────────────────────────────────────────────────
    discountCodes: {
      enabled: false,             // ← Toggle this (not yet implemented)
    },

    // ─────────────────────────────────────────────────────────────────────────
    // REVIEWS COLLECTION (Request reviews after checkout)
    // Cost: FREE
    // Coming soon!
    // ─────────────────────────────────────────────────────────────────────────
    reviewsCollection: {
      enabled: false,             // ← Toggle this (not yet implemented)
    },
  },

  // Legacy compatibility (will be removed in future versions)
  // Use features.payment instead
  payment: {
    enabled: false,
    advancePaymentPercent: 30,
    testMode: true,
  },
  // Use features.whatsapp instead
  whatsapp: {
    enabled: false,
    ownerPhone: '',
    notifyOnNewBooking: true,
    notifyOnPayment: true,
    notifyOnDayBefore: true,
  },
};
