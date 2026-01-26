# 📋 New Client Setup Checklist

Quick reference for setting up a new client. Copy this file and check off items as you go.

---

## Client Information

| Field | Value |
|-------|-------|
| Client Name | |
| Property Name | |
| Contact Email | |
| Contact Phone | |
| Domain | |

---

## 1. Basic Setup ✅

- [ ] Clone repository
- [ ] Update `src/config/property.ts`:
  - [ ] `id` - Unique identifier (e.g., `vila-marija`)
  - [ ] `hotelName` - Property name
  - [ ] `tagline` - Short description
  - [ ] `description` - Full description
  - [ ] `locale` - Language (hr/en/de/it/sl)
  - [ ] `currency` - Currency symbol (€, $, kn)

## 2. Branding 🎨

- [ ] `logo` - Upload client's logo
- [ ] `heroImage` - Main banner image
- [ ] `propertyPhotos` - Gallery images (6-10 recommended)
- [ ] `theme`:
  - [ ] `primaryColor` - Main color
  - [ ] `secondaryColor` - Secondary color
  - [ ] `accentColor` - Accent/CTA color

## 3. Room Types 🛏️

- [ ] Configure each room/apartment:
  - [ ] `id` - Unique ID
  - [ ] `name` - Room name
  - [ ] `description` - Description
  - [ ] `price` - Price per night
  - [ ] `maxGuests` - Maximum guests
  - [ ] `photos` - Room photos
  - [ ] `amenities` - List of amenities

## 4. Contact Information 📞

- [ ] `contactInfo`:
  - [ ] `address` - Street address
  - [ ] `city` - City
  - [ ] `country` - Country
  - [ ] `phone` - Phone number
  - [ ] `email` - Email address
  - [ ] `socialMedia` (optional):
    - [ ] Facebook URL
    - [ ] Instagram URL

## 5. Settings ⚙️

- [ ] `ownerPassword` - Dashboard access password
- [ ] `checkInTime` - Check-in time (e.g., "15:00")
- [ ] `checkOutTime` - Check-out time (e.g., "11:00")
- [ ] `directBookingDiscount` - Discount percentage (e.g., 10)

---

## 6. Features Toggle ⚡

### Which features does the client want?

| Feature | Enabled | Notes |
|---------|---------|-------|
| **Email Notifications** | ☐ Yes / ☐ No | Free (100/day) |
| **Telegram Notifications** | ☐ Yes / ☐ No | FREE! |
| **WhatsApp Notifications** | ☐ Yes / ☐ No | ~$0.005/msg |
| **Online Payment** | ☐ Yes / ☐ No | ~3% fee |
| **Calendar Sync** | ☐ Yes / ☐ No | Free |
| **Gallery** | ☐ Yes / ☐ No | Free |
| **Discount Codes** | ☐ Yes / ☐ No | Coming soon |
| **Reviews Collection** | ☐ Yes / ☐ No | Coming soon |

### Feature Configuration:

#### If Telegram ✅
- [ ] Client creates bot via @BotFather
- [ ] Get bot token
- [ ] Get chat ID
- [ ] Add to `features.telegram.botToken`
- [ ] Add to `features.telegram.chatId`

#### If WhatsApp ✅
- [ ] Set up Twilio account
- [ ] Add `TWILIO_ACCOUNT_SID` to .env
- [ ] Add `TWILIO_AUTH_TOKEN` to .env
- [ ] Add `TWILIO_WHATSAPP_FROM` to .env
- [ ] Add owner phone to `features.whatsapp.ownerPhone`

#### If Payment ✅
- [ ] Set `features.payment.enabled: true`
- [ ] Set `features.payment.advancePaymentPercent`
- [ ] **Demo mode**: Set `testMode: true` (no charges)
- [ ] **Production**: Follow [SETUP-PAYMENT.md](./SETUP-PAYMENT.md)
  - [ ] Create Stripe account
  - [ ] Get API keys
  - [ ] Add `STRIPE_SECRET_KEY` to .env
  - [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to .env
  - [ ] Set `testMode: false`
  - [ ] Test payment flow

#### If Email ✅
- [ ] Set up Resend account (or use shared)
- [ ] Add `RESEND_API_KEY` to .env
- [ ] Verify sending domain

---

## 7. Database (Production) 🗄️

- [ ] Client creates Supabase project (free tier)
- [ ] Run `supabase-schema.sql`
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` to .env
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to .env

---

## 8. Deployment 🚀

- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Set up custom domain (optional)
- [ ] Test booking flow
- [ ] Test notifications
- [ ] Send access credentials to client

---

## Handover Checklist

- [ ] Dashboard URL: `https://[domain]/dashboard`
- [ ] Dashboard password: `[password]`
- [ ] Telegram bot name (if enabled): `@[botname]`
- [ ] Support contact: `[your email]`

---

## Notes

```
[Add any client-specific notes here]
```
