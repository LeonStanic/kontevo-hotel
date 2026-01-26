# 🏘️ Multi-Property Setup Guide

For clients with 5+ properties who need unified management.

---

## Overview

The multi-property system allows one owner to manage multiple properties from a single dashboard:

```
┌─────────────────────────────────────────────────────────────┐
│                    UNIFIED DASHBOARD                         │
├─────────────────────────────────────────────────────────────┤
│  Vila Ana  │  Apt Marija  │  House Petra  │  +12 more...    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  📅 Unified Calendar   │  📊 Consolidated Stats             │
│  💰 Total Revenue      │  📱 Single Notification Channel    │
└─────────────────────────────────────────────────────────────┘
```

---

## URL Structure

### Subdomains (Production)
```
vila-ana.yoursite.com      → Vila Ana booking page
apt-marija.yoursite.com    → Apartment Marija booking page
house-petra.yoursite.com   → House Petra booking page
yoursite.com/dashboard     → Unified owner dashboard
```

### Path-based (Development)
```
localhost:3000/p/vila-ana      → Vila Ana
localhost:3000/p/apt-marija    → Apartment Marija
localhost:3000/dashboard       → Dashboard
```

---

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to SQL Editor
3. Run `supabase-schema-multi-property.sql`

### 2. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
NEXT_PUBLIC_ROOT_DOMAIN=yoursite.com
```

---

## Key Features

### 1. Properties Overview

See all properties at a glance:
- Room count
- Upcoming bookings
- Monthly revenue
- Pending reservations

### 2. Unified Calendar

Color-coded calendar showing bookings across ALL properties:
- Filter by property
- Click to see booking details
- Quick confirm/cancel actions

### 3. Single Notifications

One Telegram bot handles all 15+ properties:
```
🔔 Nova rezervacija!
🏠 Vila Ana
👤 Ivan Horvat
📅 27.01 → 30.01
💰 €360
```

### 4. Consolidated Reports

- Total revenue across all properties
- Per-property breakdown
- Occupancy rates
- Booking trends

---

## Adding a New Property

### Via Dashboard (Recommended)

1. Go to Dashboard → Properties
2. Click "Add Property"
3. Fill in details:
   - Slug (URL-friendly name)
   - Name
   - Description
   - Contact info
4. Add rooms
5. Upload photos
6. Set to "Active"

### Via Database

```sql
INSERT INTO properties (owner_id, slug, name, city, country, status)
VALUES (
  'your-owner-id',
  'new-property',
  'New Property Name',
  'Zagreb',
  'Hrvatska',
  'active'
);
```

---

## Subdomain Configuration

### Vercel

Add wildcard domain in Project Settings → Domains:
```
*.yoursite.com
yoursite.com
```

### Cloudflare

1. Add wildcard DNS record:
   ```
   Type: CNAME
   Name: *
   Target: your-vercel-deployment.vercel.app
   ```

2. Enable "Proxy" (orange cloud)

### Netlify

In `netlify.toml`:
```toml
[[redirects]]
  from = "https://:subdomain.yoursite.com/*"
  to = "https://yoursite.com/property/:subdomain/:splat"
  status = 200
```

---

## Property Management

### Property Status

| Status | Description |
|--------|-------------|
| `draft` | Not visible to public, work in progress |
| `active` | Live and accepting bookings |
| `inactive` | Hidden but data preserved |

### Features Per Property

Each property can have different features enabled:

```typescript
features: {
  payment: { enabled: true, advancePaymentPercent: 30 },
  emailNotifications: { enabled: true },
  telegram: { enabled: true },  // Uses owner's bot
  calendarSync: { enabled: true },
  gallery: { enabled: true },
}
```

---

## Migration from Single Property

If you have existing single-property installations:

1. Export bookings as JSON
2. Set up multi-property database
3. Import bookings with property_id
4. Update owner's notification settings

```sql
-- Import existing bookings
INSERT INTO bookings (property_id, guest_name, check_in, ...)
SELECT 
  'new-property-id',
  guest_name,
  check_in,
  ...
FROM json_populate_recordset(null::bookings, '[your exported JSON]');
```

---

## Pricing Strategies

For 15+ property clients:

| Model | Example |
|-------|---------|
| Per property | €10/month × 15 = €150/month |
| Tiered | Up to 10: €80, Up to 25: €150, Unlimited: €250 |
| Revenue share | 1% of bookings processed |
| Flat rate | €100/month unlimited |

---

## API Endpoints

### Get Owner's Properties
```
GET /api/properties
Authorization: Bearer {token}

Response:
{
  "properties": [...],
  "summary": {
    "propertyCount": 15,
    "totalRevenue": 9320,
    ...
  }
}
```

### Get Property Details
```
GET /api/properties/{slug}

Response:
{
  "property": {...},
  "rooms": [...],
  "stats": {...}
}
```

### Create Booking
```
POST /api/properties/{slug}/bookings
{
  "roomId": "...",
  "guestName": "...",
  "checkIn": "2026-01-27",
  "checkOut": "2026-01-30",
  ...
}
```

---

## Troubleshooting

### Subdomain not working

1. Check DNS propagation: `nslookup vila-ana.yoursite.com`
2. Verify wildcard domain in hosting
3. Check `NEXT_PUBLIC_ROOT_DOMAIN` env var

### Property not found (404)

1. Check property status is `active`
2. Verify slug matches URL
3. Check database connection

### Notifications not sending

1. Verify owner's Telegram settings
2. Check bot token and chat ID
3. Review server logs

---

## Demo Data

The dashboard includes demo data for testing. To use real data:

1. Set up Supabase
2. Run migrations
3. Create your owner account
4. Add properties via dashboard

---

## Need Help?

- Check existing documentation
- Review server logs
- Contact support
