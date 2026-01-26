-- =============================================
-- Hotel Booking System - Supabase Schema
-- =============================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste & Run
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- BOOKINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id TEXT NOT NULL,
  room_type_id TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid_advance', 'paid_full', 'refunded')),
  payment_intent_id TEXT,
  amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- =============================================
-- BLOCKED DATES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id TEXT NOT NULL,
  date DATE NOT NULL,
  reason TEXT NOT NULL,
  room_type_id TEXT, -- NULL means all rooms
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, date, room_type_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blocked_dates_property_id ON blocked_dates(property_id);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_date ON blocked_dates(date);

-- =============================================
-- EXTERNAL CALENDARS TABLE (for iCal sync)
-- =============================================
CREATE TABLE IF NOT EXISTS external_calendars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  room_type_id TEXT, -- NULL means all rooms
  last_synced TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_external_calendars_property_id ON external_calendars(property_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_calendars ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo (adjust for production!)
-- For production, you should use proper authentication

-- Bookings policies
CREATE POLICY "Allow public read bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update bookings" ON bookings
  FOR UPDATE USING (true);

-- Blocked dates policies
CREATE POLICY "Allow public read blocked_dates" ON blocked_dates
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert blocked_dates" ON blocked_dates
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete blocked_dates" ON blocked_dates
  FOR DELETE USING (true);

-- External calendars policies
CREATE POLICY "Allow public read external_calendars" ON external_calendars
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert external_calendars" ON external_calendars
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update external_calendars" ON external_calendars
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete external_calendars" ON external_calendars
  FOR DELETE USING (true);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================
-- Uncomment below to add sample bookings

/*
INSERT INTO bookings (property_id, room_type_id, guest_name, guest_email, guest_phone, check_in, check_out, guests, total_price, status, payment_status)
VALUES 
  ('kontevo-apartments', 'one-bedroom', 'Marko Horvat', 'marko@example.com', '+385 91 123 4567', '2026-02-01', '2026-02-05', 2, 464.00, 'confirmed', 'paid_advance'),
  ('kontevo-apartments', 'studio-apartment', 'Ana Kovačević', 'ana@example.com', '+385 92 234 5678', '2026-02-10', '2026-02-12', 1, 160.20, 'pending', 'pending'),
  ('kontevo-apartments', 'penthouse', 'John Smith', 'john@example.com', '+1 555 123 4567', '2026-02-15', '2026-02-20', 3, 1345.50, 'confirmed', 'paid_full');
*/

-- =============================================
-- DONE!
-- =============================================
-- Your database is now ready to use.
-- Copy your Supabase URL and anon key to .env.local
