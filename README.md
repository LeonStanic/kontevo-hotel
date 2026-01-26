# Kontevo Apartments - Booking System

A modern, fully-featured apartment/hotel booking system template built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## ✨ Features

### Guest-Facing Website (`/`)
- 🎨 **Fully customizable** - Colors, fonts, and branding from config
- 🌍 **Multi-language support** - Croatian, English, German, Italian, Slovenian
- 🏠 **Hero section** with property name, tagline, and "Book Direct" banner
- 📸 **Photo gallery** with lightbox viewer
- 🛏️ **Room/Apartment showcase** with photos, amenities, and pricing
- 📅 **Complete booking system** - Date picker, room selection, guest form, price calculation
- 📱 **Mobile responsive** - Beautiful on all devices
- 🎯 **Direct booking discount** - Configurable percentage off
- 💶 **Configurable currency** - €, $, kn, or any symbol

### Owner Dashboard (`/dashboard`)
- 🔐 **Password-protected** access
- 📊 **Stats overview** - Bookings, revenue, occupancy rate
- 📋 **Bookings table** - View, filter, confirm/cancel bookings
- 🗓️ **Calendar view** - Visual representation of bookings
- 🚫 **Date blocking** - Block dates for maintenance, personal use
- 🔄 **Calendar Sync** - Avoid double bookings with OTA integration
- 📊 **Real-time updates** - localStorage persistence

### 🔄 Calendar Sync (Booking.com/Airbnb Integration)
Prevent double bookings when using multiple platforms:

- **Export iCal Feed** - Share your availability with Booking.com, Airbnb, VRBO
- **Import External Calendars** - Block dates from OTA platforms
- **Two-way Sync** - Full synchronization in both directions
- **Per-room Calendars** - Separate feeds for each room type

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Guest-facing website
│   ├── dashboard/
│   │   └── page.tsx          # Owner dashboard
│   ├── api/
│   │   ├── calendar/         # iCal export endpoint
│   │   └── sync-calendar/    # iCal import proxy
│   ├── globals.css           # Global styles + theme variables
│   └── layout.tsx            # Root layout
├── components/
│   ├── guest/                # Guest website components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   ├── Rooms.tsx
│   │   ├── BookingForm.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── dashboard/            # Dashboard components
│   │   ├── DashboardLayout.tsx
│   │   ├── LoginForm.tsx
│   │   ├── StatsOverview.tsx
│   │   ├── BookingsTable.tsx
│   │   ├── BookingsCalendar.tsx
│   │   ├── BlockedDatesManager.tsx
│   │   └── CalendarSync.tsx  # OTA calendar integration
│   └── ui/                   # shadcn/ui components
├── config/
│   └── property.ts           # ⭐ MAIN CONFIGURATION FILE
├── context/
│   └── PropertyContext.tsx   # Property context provider
├── lib/
│   ├── storage.ts            # localStorage operations
│   ├── demo-data.ts          # Sample bookings
│   ├── ical.ts               # iCal generation/parsing
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript interfaces
```

## 🌍 Localization (Multi-language Support)

The system supports multiple European languages out of the box:

| Code | Language | Status |
|------|----------|--------|
| `hr` | **Croatian** | ✅ Default |
| `en` | English | ✅ Complete |
| `de` | German | ✅ Complete |
| `it` | Italian | ✅ Complete |
| `sl` | Slovenian | ✅ Complete |

### Setting the Language

In `src/config/property.ts`:

```typescript
export const property: PropertyConfig = {
  // ...
  locale: 'hr',  // Croatian (default)
  currency: '€', // Currency symbol
  // ...
};
```

### What Gets Translated

- ✅ Navigation menu
- ✅ Hero section (buttons, labels)
- ✅ Room cards (buttons, guest counts)
- ✅ Booking form (all labels, placeholders, buttons)
- ✅ Contact section
- ✅ Footer
- ✅ Dashboard (all labels)
- ✅ Date picker (month/day names)

### Adding a New Language

1. Open `src/lib/i18n/translations.ts`
2. Add a new locale to the `translations` object
3. Copy the structure from an existing language
4. Translate all strings

### Property Content

Note: The `locale` setting translates the **UI labels**, but property-specific content (hotel name, tagline, room names, descriptions, amenities) should be written directly in the target language in `property.ts`.

## 🔄 Calendar Sync with Booking.com/Airbnb

### How It Works

To prevent double bookings when your property is listed on multiple platforms:

1. **Export your calendar** (Dashboard → Calendar Sync)
   - Copy the iCal URL: `https://yourdomain.com/api/calendar`
   - Add it to Booking.com, Airbnb, VRBO (they will import your bookings)

2. **Import external calendars**
   - Get the iCal export URL from Booking.com/Airbnb
   - Add it in Dashboard → Calendar Sync → Add Calendar
   - Those dates will be blocked in your system

### Finding iCal URLs

**Booking.com:**
1. Go to Rates & Availability → Calendar Sync
2. Copy the "Export Calendar" URL

**Airbnb:**
1. Go to Calendar → Availability settings
2. Scroll to "Connect calendars" → "Export calendar"
3. Copy the iCal link

**VRBO/HomeAway:**
1. Go to Calendar → Import/Export
2. Copy the export URL

### Per-Room Calendars

If you have multiple room types, you can export separate calendars:

```
https://yourdomain.com/api/calendar?room=studio-apartment
https://yourdomain.com/api/calendar?room=one-bedroom
https://yourdomain.com/api/calendar?room=penthouse
```

## 🏨 Setting Up for a New Client

### Step 1: Clone the Repository

```bash
git clone <this-repo> client-name-apartments
cd client-name-apartments
npm install
```

### Step 2: Update the Configuration

Edit `src/config/property.ts` with the client's information:

```typescript
export const property: PropertyConfig = {
  id: 'client-apartments',           // Unique ID (used for storage)
  locale: 'hr',                      // Language: 'hr', 'en', 'de', 'it', 'sl'
  currency: '€',                     // Currency symbol
  hotelName: 'Client Apartments',    // Display name
  tagline: 'Your Perfect Stay',      // Tagline shown on hero
  description: '...',                // About section text
  
  logo: 'https://...',              // Logo image URL
  heroImage: 'https://...',         // Hero background image
  propertyPhotos: [...],            // Gallery photos
  
  roomTypes: [                       // Rooms/apartments
    {
      id: 'studio',
      name: 'Studio Apartment',
      description: '...',
      price: 99,                     // Price per night
      maxGuests: 2,
      photos: [...],
      amenities: ['WiFi', 'TV', ...],
    },
    // Add more room types...
  ],
  
  contactInfo: {
    address: '...',
    city: '...',
    country: '...',
    phone: '...',
    email: '...',
    socialMedia: { ... },
  },
  
  theme: {
    primaryColor: '#1e3a5f',        // Main brand color
    secondaryColor: '#3d5a80',      // Secondary color
    accentColor: '#ee6c4d',         // CTA button color
    fontFamily: '"Inter", ...',     // Body font
    headerFont: '"Outfit", ...',    // Heading font
  },
  
  ownerPassword: 'change-this!',    // Dashboard password
  checkInTime: '15:00',
  checkOutTime: '11:00',
  directBookingDiscount: 10,        // Percentage off
};
```

### Step 3: Replace Images

Update the image URLs in the config with actual property photos:
- `logo` - Property logo (square, ~200x200px)
- `heroImage` - Hero background (wide, ~1920x1080px)
- `propertyPhotos` - Gallery photos (6+ photos, ~800x600px)
- Room photos in each `roomTypes` entry

### Step 4: Clear Demo Data

Open browser console and run:

```javascript
localStorage.clear();
location.reload();
```

### Step 5: Deploy

Deploy to Vercel, Netlify, or your preferred hosting:

```bash
npm run build
npm run start
```

## 🎨 Theme Customization

Each property can have its own color scheme and fonts:

```typescript
theme: {
  primaryColor: '#1e3a5f',    // Headers, buttons, footer
  secondaryColor: '#3d5a80',  // Secondary elements
  accentColor: '#ee6c4d',     // CTAs, badges, highlights
  fontFamily: '"Inter", system-ui, sans-serif',
  headerFont: '"Outfit", system-ui, sans-serif',
}
```

### Available Google Fonts (pre-loaded)

- **Serif:** Playfair Display, Source Serif 4, Crimson Pro
- **Decorative:** Cinzel
- **Sans-serif:** DM Sans, Outfit, Inter

## 📊 Demo Credentials

- **URL:** http://localhost:3000/dashboard
- **Password:** `kontevo2024`

## 🗄️ Data Storage

### Default: localStorage (Demo Mode)

Out of the box, the app uses localStorage for quick demos:

- Bookings: `hotel-booking-bookings`
- Blocked dates: `hotel-booking-blocked-dates`
- External calendars: `hotel-booking-external-calendars`

### Production: Supabase Database (Free)

For real deployments, enable persistent database storage:

1. Create free account at [supabase.com](https://supabase.com)
2. Run the schema from `supabase-schema.sql`
3. Add environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The app **automatically detects** Supabase and switches to database storage.

📖 See **[SETUP-DATABASE.md](./SETUP-DATABASE.md)** for detailed instructions.

### Reset Demo Data

```javascript
localStorage.removeItem('hotel-booking-initialized');
localStorage.removeItem('hotel-booking-bookings');
localStorage.removeItem('hotel-booking-blocked-dates');
localStorage.removeItem('hotel-booking-external-calendars');
location.reload();
```

## 📧 Email Notifications

The system sends automatic emails for:
- ✉️ **Booking received** - Confirmation to guest
- ✉️ **New booking alert** - Notification to owner
- ✉️ **Booking confirmed** - When owner confirms

### Default: Console Logging (Demo)

Without configuration, emails are logged to the console.

### Production: Resend (Free 3K/month)

1. Create account at [resend.com](https://resend.com)
2. Add your domain and verify DNS
3. Add environment variable:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

## 💳 Payment Integration

Advance payment collection is built-in:

```typescript
// src/config/property.ts
features: {
  payment: {
    enabled: true,
    advancePaymentPercent: 30,  // Collect 30% upfront
    testMode: true,             // Demo mode (no real charges)
  },
}
```

📖 See **[SETUP-PAYMENT.md](./SETUP-PAYMENT.md)** for detailed setup instructions:
- ✅ Quick demo mode setup (no charges)
- 🔄 Stripe integration for production
- 💰 Fee structure and costs
- 🔒 Security best practices

## 🏨 Multi-Client Deployment

This template is designed for agencies managing multiple properties:

```
Your Template Repo
       │
       ├── Client A (Vila Marija)
       │   └── Their own Supabase + Vercel
       │
       ├── Client B (Apartmani Lux)
       │   └── Their own Supabase + Vercel
       │
       └── Client C (Hotel Zagreb)
           └── Their own Supabase + Vercel
```

📖 See **[SETUP-MULTI-CLIENT.md](./SETUP-MULTI-CLIENT.md)** for detailed workflow.

### Cost Per Client

| Service | Free Tier |
|---------|-----------|
| Vercel Hosting | ✅ Unlimited |
| Supabase Database | ✅ 500MB |
| Resend Email | ✅ 3K emails/month |
| **Total** | **€0/month** |

## 🚀 Production Checklist

- [ ] Update `src/config/property.ts` with client info
- [ ] Set up Supabase database
- [ ] Configure email (Resend)
- [ ] Deploy to Vercel
- [ ] Add custom domain
- [ ] Test booking flow end-to-end
- [ ] Change dashboard password

## 📝 TypeScript Interfaces

### PropertyConfig

```typescript
interface PropertyConfig {
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
  ownerPassword: string;
  checkInTime: string;
  checkOutTime: string;
  directBookingDiscount: number;
}
```

### RoomType

```typescript
interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  photos: string[];
  amenities: string[];
}
```

### Booking

```typescript
interface Booking {
  id: string;
  propertyId: string;
  roomTypeId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}
```

### ExternalCalendar

```typescript
interface ExternalCalendar {
  id: string;
  propertyId: string;
  name: string;           // e.g., "Booking.com", "Airbnb"
  url: string;            // iCal feed URL
  roomTypeId?: string;    // Optional: sync to specific room
  lastSynced?: string;
  isActive: boolean;
}
```

## 📦 Dependencies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

## 📄 License

MIT License - Feel free to use this template for your clients!

---

Built with ❤️ for the hospitality industry
