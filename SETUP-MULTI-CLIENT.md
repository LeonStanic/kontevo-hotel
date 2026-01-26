# 🏨 Multi-Client Setup Guide

This guide explains how to deploy the Hotel Booking System for multiple clients efficiently.

---

## 📋 Overview: Your Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR MAIN REPO                           │
│         (Template with all features)                        │
└─────────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Client A   │ │  Client B   │ │  Client C   │
    │ Vila Marija │ │ Apartmani X │ │ Hotel Lux   │
    │             │ │             │ │             │
    │ Their DB    │ │ Their DB    │ │ Their DB    │
    │ Their Email │ │ Their Email │ │ Their Email │
    └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 🚀 Quick Setup for New Client (15 minutes)

### Step 1: Clone Your Template

```bash
# Clone your main repo for the new client
git clone https://github.com/your-username/hotel-booking-template client-name
cd client-name

# Remove git history (fresh start for client)
rm -rf .git
git init
```

### Step 2: Update Property Config

Edit `src/config/property.ts`:

```typescript
export const property: PropertyConfig = {
  id: 'vila-marija',                    // Unique ID
  hotelName: 'Vila Marija',             // Client's name
  tagline: 'Odmor uz more',             // Their tagline
  locale: 'hr',                         // hr, en, de, it, sl
  currency: '€',                        // €, $, kn
  
  // Update all other fields...
  
  ownerPassword: 'unique-password-123', // Dashboard access
  
  email: {
    ownerEmail: 'vlasnik@vila-marija.hr',
    sendEmails: true,
  },
};
```

### Step 3: Client Creates Free Supabase

Send client these instructions:

1. Go to [supabase.com](https://supabase.com) → Sign up free
2. Create new project (any name, save password)
3. Go to **SQL Editor** → New Query
4. Copy contents of `supabase-schema.sql` → Run
5. Go to **Settings** → **API** → Copy:
   - Project URL
   - anon public key

### Step 4: Deploy to Vercel (Free)

```bash
# Install Vercel CLI (one time)
npm i -g vercel

# Deploy
vercel
```

When prompted, add environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` = client's Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = client's anon key
- `NEXT_PUBLIC_BASE_URL` = https://client-domain.vercel.app

### Step 5: Custom Domain (Optional)

1. Client buys domain (e.g., `vila-marija.hr`)
2. In Vercel: Settings → Domains → Add
3. Client updates DNS at their registrar

---

## 📧 Email Setup Options

### Option A: Shared Resend Account (Easiest)

You manage one Resend account for all clients:

1. Create account at [resend.com](https://resend.com)
2. Add each client's domain: Resend → Domains → Add
3. They add DNS records to verify
4. Add `RESEND_API_KEY` to each client's Vercel

**Pricing:**
- Free: 3,000 emails/month (shared across all clients)
- Pro: $20/month for 50,000 emails

### Option B: Client Gets Own Resend (More Independent)

Each client creates their own Resend account:

1. Client signs up at resend.com
2. Adds their domain
3. Gets their own API key
4. Adds to their Vercel deployment

---

## 💰 Cost Breakdown Per Client

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel Hosting | ✅ Unlimited | - |
| Supabase DB | ✅ 500MB, 50K users | $25/mo |
| Resend Email | ✅ 3K emails/mo | $20/mo |
| Domain | ❌ | ~$10-15/year |

**Total cost per client: €0-10/year** (just domain)

---

## 📁 Files to Update Per Client

| File | What to Change |
|------|----------------|
| `src/config/property.ts` | Everything - main config |
| `public/` | Logo, favicon, images |
| `vercel.json` | (optional) redirects |

**Files that stay the same:**
- All components
- All libraries
- Database schema
- Email templates (they use translations)

---

## 🔄 Updating All Clients

When you add features to your main template:

```bash
# In your template repo
git add .
git commit -m "New feature: XYZ"
git push

# For each client that wants the update:
cd client-folder
git remote add template https://github.com/you/hotel-booking-template
git fetch template
git merge template/main
# Resolve any conflicts in property.ts
git push
```

---

## 🛡️ Security Checklist Per Client

- [ ] Change `ownerPassword` in property.ts
- [ ] Use unique Supabase project
- [ ] Verify email domain in Resend
- [ ] Set proper `NEXT_PUBLIC_BASE_URL`
- [ ] Test booking flow end-to-end

---

## 📊 Managing Multiple Clients

### Track Your Clients

Create a spreadsheet:

| Client | Domain | Supabase Project | Vercel Project | Status |
|--------|--------|------------------|----------------|--------|
| Vila Marija | vila-marija.hr | vila-marija-xxx | vila-marija | ✅ Live |
| Apartmani Lux | apartmani-lux.hr | apartmani-lux-xxx | apartmani-lux | 🔧 Setup |

### Supabase Organization (Optional)

If you manage databases for clients:

1. Create Supabase Organization
2. Add projects under organization
3. Easier billing and management
4. But: Pro tier needed for >2 projects

---

## 🚨 Common Issues

### "Invalid Supabase key"
→ Client copied wrong key (use anon, not service_role)

### Emails not sending
→ Check Resend domain verification
→ Check `RESEND_API_KEY` is set in Vercel

### Bookings not saving
→ Run SQL schema in Supabase
→ Check RLS policies are created

### Dashboard login fails
→ Check `ownerPassword` in property.ts matches what they're entering

---

## 💡 Tips for Success

1. **Create a checklist** for each new client setup
2. **Document client-specific changes** in their repo
3. **Use staging environments** for testing
4. **Set up monitoring** (Vercel has free analytics)
5. **Backup client data** periodically from Supabase

---

## 📞 Client Handoff Checklist

When delivering to client:

- [ ] Site is live and working
- [ ] Client has dashboard password
- [ ] Client has Supabase access (if they want it)
- [ ] Test booking works end-to-end
- [ ] Emails are being received
- [ ] Custom domain is configured
- [ ] Client knows how to access dashboard
- [ ] Basic training provided
