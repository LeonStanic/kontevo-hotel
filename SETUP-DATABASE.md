# 🗄️ Database Setup Guide

This guide shows you how to add a free Supabase database to your Hotel Booking System.

## Why Add a Database?

By default, the app uses localStorage (browser storage) which:
- ❌ Only works per device/browser
- ❌ Gets cleared when users clear their cache
- ❌ Can't sync between devices

With Supabase, you get:
- ✅ Persistent data storage
- ✅ Data syncs across all devices
- ✅ Real booking management
- ✅ Free tier: 500MB, 50K monthly users

---

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub (free)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `hotel-booking` (or your preference)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait ~2 minutes for setup

---

## Step 2: Create Database Tables

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see "Success" message

---

## Step 3: Get Your API Keys

1. Go to **Project Settings** (gear icon, bottom left)
2. Click **"API"** in the sidebar
3. Copy these values:
   - **Project URL** → `https://xxxxx.supabase.co`
   - **anon public key** → `eyJhbGci...` (long string)

---

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Base URL (for email links)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Replace the values with your actual Supabase credentials.

---

## Step 5: Restart Development Server

```bash
# Stop the current server (Ctrl+C) then:
npm run dev
```

The app will automatically detect Supabase and use database storage!

---

## Verify It's Working

1. Open your app in the browser
2. Open browser DevTools → Console
3. You should NOT see any "Use xxxAsync() for Supabase" warnings
4. Make a test booking
5. Check Supabase dashboard → Table Editor → `bookings` table
6. Your booking should appear there!

---

## Deployment with Supabase

When deploying to Vercel/Netlify:

1. Go to your hosting dashboard
2. Find **Environment Variables** settings
3. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
   - `NEXT_PUBLIC_BASE_URL` = your deployed URL

---

## Security Note

The default setup uses **public policies** for demo purposes. For production:

1. Enable Supabase Authentication
2. Update Row Level Security (RLS) policies
3. Restrict write access to authenticated users

Example secure policy for bookings:

```sql
-- Only allow property owners to update bookings
CREATE POLICY "Owners can update bookings" ON bookings
  FOR UPDATE USING (
    auth.uid() = (SELECT owner_id FROM properties WHERE id = property_id)
  );
```

---

## Troubleshooting

### "Table does not exist" error
→ Make sure you ran the SQL schema in Step 2

### "Invalid API key" error
→ Double-check your `.env.local` values, restart the dev server

### Bookings not appearing in Supabase
→ Check browser console for errors
→ Verify RLS policies allow inserts

### Still using localStorage?
→ Make sure `NEXT_PUBLIC_SUPABASE_URL` starts with `https://`
→ Restart the dev server after adding env vars

---

## Optional: Sample Data

To add sample bookings to your database, uncomment the sample data section at the bottom of `supabase-schema.sql` and run it again in the SQL Editor.

---

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
