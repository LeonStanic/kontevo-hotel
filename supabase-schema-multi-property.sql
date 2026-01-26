-- =====================================================
-- MULTI-PROPERTY HOTEL BOOKING SYSTEM
-- Database Schema for Supabase
-- =====================================================
-- 
-- This schema supports:
-- - Multiple properties per owner
-- - Subdomain routing (vila-ana.yoursite.com)
-- - Unified dashboard management
-- - Per-property rooms, bookings, blocked dates
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE property_status AS ENUM ('active', 'inactive', 'draft');

-- =====================================================
-- OWNERS TABLE
-- =====================================================
-- Each owner can have multiple properties

CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL, -- For dashboard login
  
  -- Notification settings (shared across all properties)
  telegram_bot_token TEXT,
  telegram_chat_id TEXT,
  whatsapp_phone TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROPERTIES TABLE
-- =====================================================
-- Each property has its own subdomain/slug

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  
  -- Identification
  slug TEXT UNIQUE NOT NULL, -- Used for subdomain: vila-ana.domain.com
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  
  -- Localization
  locale TEXT DEFAULT 'hr' CHECK (locale IN ('hr', 'en', 'de', 'it', 'sl')),
  currency TEXT DEFAULT '€',
  
  -- Branding
  logo_url TEXT,
  hero_image_url TEXT,
  
  -- Contact
  address TEXT,
  city TEXT,
  country TEXT,
  phone TEXT,
  email TEXT,
  
  -- Social Media
  facebook_url TEXT,
  instagram_url TEXT,
  
  -- Theme
  primary_color TEXT DEFAULT '#1e3a5f',
  secondary_color TEXT DEFAULT '#3d5a80',
  accent_color TEXT DEFAULT '#ee6c4d',
  
  -- Settings
  check_in_time TEXT DEFAULT '15:00',
  check_out_time TEXT DEFAULT '11:00',
  direct_booking_discount INTEGER DEFAULT 10,
  
  -- Features (JSON for flexibility)
  features JSONB DEFAULT '{
    "payment": {"enabled": false, "advancePaymentPercent": 30},
    "emailNotifications": {"enabled": true},
    "telegram": {"enabled": false},
    "whatsapp": {"enabled": false},
    "calendarSync": {"enabled": true},
    "gallery": {"enabled": true}
  }'::jsonb,
  
  -- Status
  status property_status DEFAULT 'draft',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for subdomain lookup
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_owner ON properties(owner_id);

-- =====================================================
-- PROPERTY PHOTOS TABLE
-- =====================================================

CREATE TABLE property_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_photos ON property_photos(property_id);

-- =====================================================
-- ROOMS TABLE
-- =====================================================
-- Each property has multiple rooms/units

CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  max_guests INTEGER NOT NULL DEFAULT 2,
  
  -- Amenities stored as JSON array
  amenities JSONB DEFAULT '[]'::jsonb,
  
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rooms_property ON rooms(property_id);

-- =====================================================
-- ROOM PHOTOS TABLE
-- =====================================================

CREATE TABLE room_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_room_photos ON room_photos(room_id);

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- Guest info
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  
  -- Booking details
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  
  -- Pricing
  total_price DECIMAL(10, 2) NOT NULL,
  
  -- Status
  status booking_status DEFAULT 'pending',
  
  -- Payment info
  payment_status payment_status DEFAULT 'pending',
  payment_amount DECIMAL(10, 2),
  payment_currency TEXT,
  payment_transaction_id TEXT,
  payment_card_last4 TEXT,
  payment_card_brand TEXT,
  payment_paid_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_property ON bookings(property_id);
CREATE INDEX idx_bookings_room ON bookings(room_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_bookings_status ON bookings(status);

-- =====================================================
-- BLOCKED DATES TABLE
-- =====================================================

CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE, -- NULL = all rooms
  
  date DATE NOT NULL,
  reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blocked_dates_property ON blocked_dates(property_id);
CREATE INDEX idx_blocked_dates_date ON blocked_dates(date);

-- =====================================================
-- EXTERNAL CALENDARS TABLE
-- =====================================================

CREATE TABLE external_calendars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL, -- "Booking.com", "Airbnb"
  url TEXT NOT NULL, -- iCal URL
  
  is_active BOOLEAN DEFAULT true,
  last_synced TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_external_calendars_property ON external_calendars(property_id);

-- =====================================================
-- VIEWS FOR DASHBOARD
-- =====================================================

-- Property overview with stats
CREATE VIEW property_overview AS
SELECT 
  p.id,
  p.slug,
  p.name,
  p.status,
  COUNT(DISTINCT r.id) as room_count,
  COUNT(DISTINCT CASE WHEN b.status IN ('pending', 'confirmed') 
    AND b.check_in >= CURRENT_DATE THEN b.id END) as upcoming_bookings,
  COALESCE(SUM(CASE WHEN b.status = 'confirmed' 
    AND b.check_in >= DATE_TRUNC('month', CURRENT_DATE)
    AND b.check_in < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    THEN b.total_price END), 0) as revenue_this_month,
  COUNT(DISTINCT CASE WHEN b.status = 'pending' THEN b.id END) as pending_count
FROM properties p
LEFT JOIN rooms r ON r.property_id = p.id
LEFT JOIN bookings b ON b.property_id = p.id
GROUP BY p.id, p.slug, p.name, p.status;

-- Owner dashboard summary
CREATE VIEW owner_dashboard_summary AS
SELECT 
  o.id as owner_id,
  COUNT(DISTINCT p.id) as property_count,
  COUNT(DISTINCT CASE WHEN b.status IN ('pending', 'confirmed') 
    AND b.check_in >= CURRENT_DATE THEN b.id END) as total_upcoming_bookings,
  COUNT(DISTINCT CASE WHEN b.status = 'pending' THEN b.id END) as total_pending,
  COALESCE(SUM(CASE WHEN b.status = 'confirmed' 
    AND b.check_in >= DATE_TRUNC('month', CURRENT_DATE)
    AND b.check_in < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    THEN b.total_price END), 0) as total_revenue_this_month
FROM owners o
LEFT JOIN properties p ON p.owner_id = o.id
LEFT JOIN bookings b ON b.property_id = p.id
GROUP BY o.id;

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_calendars ENABLE ROW LEVEL SECURITY;

-- Public can read active properties (for booking pages)
CREATE POLICY "Public can view active properties" ON properties
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view property photos" ON property_photos
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE id = property_id AND status = 'active')
  );

CREATE POLICY "Public can view active rooms" ON rooms
  FOR SELECT USING (
    is_active = true AND
    EXISTS (SELECT 1 FROM properties WHERE id = property_id AND status = 'active')
  );

CREATE POLICY "Public can view room photos" ON room_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rooms r 
      JOIN properties p ON p.id = r.property_id 
      WHERE r.id = room_id AND r.is_active = true AND p.status = 'active'
    )
  );

-- Public can create bookings for active properties
CREATE POLICY "Public can create bookings" ON bookings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM properties WHERE id = property_id AND status = 'active')
  );

-- Public can view blocked dates for availability checking
CREATE POLICY "Public can view blocked dates" ON blocked_dates
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE id = property_id AND status = 'active')
  );

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_owners_updated_at
  BEFORE UPDATE ON owners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Uncomment to insert sample data:

/*
-- Create a test owner
INSERT INTO owners (id, email, name, phone, password_hash)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'owner@example.com',
  'Ivan Horvat',
  '+385911234567',
  'demo2024' -- In production, use proper hashing!
);

-- Create sample properties
INSERT INTO properties (owner_id, slug, name, tagline, description, city, country, status)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'vila-ana', 'Vila Ana', 'Mirni raj na obali', 'Prekrasna vila s pogledom na more...', 'Split', 'Hrvatska', 'active'),
  ('00000000-0000-0000-0000-000000000001', 'apartman-marija', 'Apartman Marija', 'U srcu starog grada', 'Udoban apartman u centru...', 'Dubrovnik', 'Hrvatska', 'active'),
  ('00000000-0000-0000-0000-000000000001', 'house-petra', 'Kuća Petra', 'Obiteljski odmor', 'Prostrana kuća za obitelji...', 'Zadar', 'Hrvatska', 'active');

-- Create rooms for Vila Ana
INSERT INTO rooms (property_id, name, description, price, max_guests)
SELECT 
  p.id,
  'Dvokrevetna soba',
  'Udobna soba s pogledom na more',
  120,
  2
FROM properties p WHERE p.slug = 'vila-ana';
*/
