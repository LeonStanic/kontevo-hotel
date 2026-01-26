'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Property } from '@/types/multi-property';
import { PropertyConfig } from '@/types';
import { PropertyProvider, useProperty } from '@/context/PropertyContext';
import { Booking, BlockedDate } from '@/types';
import { getBookings, getBlockedDates, initializeStorage } from '@/lib/storage';
import {
  DashboardLayout,
  LoginForm,
  StatsOverview,
  BookingsTable,
  BookingsCalendar,
  BlockedDatesManager,
  CalendarSync,
} from '@/components/dashboard';

type DashboardTab = 'overview' | 'calendar' | 'blocked' | 'sync';

// Helper function to convert Property (multi-property) to PropertyConfig
function convertPropertyToConfig(property: Property): PropertyConfig {
  return {
    id: property.id,
    hotelName: property.name,
    tagline: property.tagline || '',
    description: property.description || '',
    logo: property.logoUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
    heroImage: property.heroImageUrl || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=1080&fit=crop',
    propertyPhotos: property.photos.map(p => p.url),
    roomTypes: property.rooms.map(room => ({
      id: room.id,
      name: room.name,
      description: room.description || '',
      price: room.price,
      maxGuests: room.maxGuests,
      photos: room.photos.map(p => p.url),
      amenities: room.amenities,
    })),
    contactInfo: {
      address: property.address || '',
      city: property.city || '',
      country: property.country || '',
      phone: property.phone || '',
      email: property.email || '',
      socialMedia: {
        facebook: property.facebookUrl,
        instagram: property.instagramUrl,
      },
    },
    theme: {
      primaryColor: property.primaryColor,
      secondaryColor: property.secondaryColor,
      accentColor: property.accentColor,
      fontFamily: '"Inter", system-ui, sans-serif',
      headerFont: '"Outfit", system-ui, sans-serif',
    },
    ownerPassword: 'demo123', // In production, this should come from the property or owner
    checkInTime: property.checkInTime,
    checkOutTime: property.checkOutTime,
    directBookingDiscount: property.directBookingDiscount,
    locale: property.locale,
    currency: property.currency,
    features: {
      payment: property.features.payment,
      emailNotifications: property.features.emailNotifications,
      telegram: property.features.telegram,
      whatsapp: property.features.whatsapp,
      calendarSync: property.features.calendarSync,
      gallery: property.features.gallery,
      discountCodes: { enabled: false },
      reviewsCollection: { enabled: false },
    },
  };
}

// Demo function to get property by slug
// In production, this would fetch from database
function getPropertyBySlug(slug: string): Property | null {
  // Demo properties matching the ones in properties page
  const demoProperties: Property[] = [
    {
      id: '1',
      ownerId: '1',
      slug: 'vila-ana',
      name: 'Vila Ana',
      tagline: 'Vaš savršeni odmor',
      description: 'Prekrasna vila za nezaboravan boravak.',
      locale: 'hr',
      currency: '€',
      primaryColor: '#1e3a5f',
      secondaryColor: '#3d5a80',
      accentColor: '#ee6c4d',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      directBookingDiscount: 10,
      features: {
        payment: { enabled: false, advancePaymentPercent: 30 },
        emailNotifications: { enabled: true },
        telegram: { enabled: false },
        whatsapp: { enabled: false },
        calendarSync: { enabled: true },
        gallery: { enabled: true },
      },
      status: 'active',
      rooms: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      ownerId: '1',
      slug: 'apartman-marija',
      name: 'Apartman Marija',
      tagline: 'Udobnost i stil',
      description: 'Moderan apartman u centru grada.',
      locale: 'hr',
      currency: '€',
      primaryColor: '#1e3a5f',
      secondaryColor: '#3d5a80',
      accentColor: '#ee6c4d',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      directBookingDiscount: 10,
      features: {
        payment: { enabled: false, advancePaymentPercent: 30 },
        emailNotifications: { enabled: true },
        telegram: { enabled: false },
        whatsapp: { enabled: false },
        calendarSync: { enabled: true },
        gallery: { enabled: true },
      },
      status: 'active',
      rooms: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      ownerId: '1',
      slug: 'house-petra',
      name: 'Kuća Petra',
      tagline: 'Porodična kuća za odmor',
      description: 'Prostrana kuća idealna za porodice.',
      locale: 'hr',
      currency: '€',
      primaryColor: '#1e3a5f',
      secondaryColor: '#3d5a80',
      accentColor: '#ee6c4d',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      directBookingDiscount: 10,
      features: {
        payment: { enabled: false, advancePaymentPercent: 30 },
        emailNotifications: { enabled: true },
        telegram: { enabled: false },
        whatsapp: { enabled: false },
        calendarSync: { enabled: true },
        gallery: { enabled: true },
      },
      status: 'active',
      rooms: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      ownerId: '1',
      slug: 'studio-luka',
      name: 'Studio Luka',
      tagline: 'Kompaktan i funkcionalan',
      description: 'Studio apartman za solo putnike.',
      locale: 'hr',
      currency: '€',
      primaryColor: '#1e3a5f',
      secondaryColor: '#3d5a80',
      accentColor: '#ee6c4d',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      directBookingDiscount: 10,
      features: {
        payment: { enabled: false, advancePaymentPercent: 30 },
        emailNotifications: { enabled: true },
        telegram: { enabled: false },
        whatsapp: { enabled: false },
        calendarSync: { enabled: true },
        gallery: { enabled: true },
      },
      status: 'active',
      rooms: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      ownerId: '1',
      slug: 'villa-sunset',
      name: 'Villa Sunset',
      tagline: 'Luksuzna vila s pogledom',
      description: 'Ekskluzivna vila za posebne trenutke.',
      locale: 'hr',
      currency: '€',
      primaryColor: '#1e3a5f',
      secondaryColor: '#3d5a80',
      accentColor: '#ee6c4d',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      directBookingDiscount: 10,
      features: {
        payment: { enabled: false, advancePaymentPercent: 30 },
        emailNotifications: { enabled: true },
        telegram: { enabled: false },
        whatsapp: { enabled: false },
        calendarSync: { enabled: true },
        gallery: { enabled: true },
      },
      status: 'draft',
      rooms: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return demoProperties.find(p => p.slug === slug) || null;
}

function DashboardContent() {
  const { property: prop, t } = useProperty();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);

  const refreshData = useCallback(() => {
    setBookings(getBookings(prop.id));
    setBlockedDates(getBlockedDates(prop.id));
  }, [prop.id]);

  useEffect(() => {
    initializeStorage();
    refreshData();
  }, [refreshData]);

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
            <p className="text-neutral-500">{t.dashboard.welcome} {prop.hotelName}.</p>
          </div>
          <StatsOverview bookings={bookings} />
          <BookingsTable bookings={bookings} onUpdate={refreshData} />
        </div>
      )}

      {activeTab === 'calendar' && (
        <BookingsCalendar bookings={bookings} blockedDates={blockedDates} />
      )}

      {activeTab === 'blocked' && (
        <BlockedDatesManager blockedDates={blockedDates} onUpdate={refreshData} />
      )}

      {activeTab === 'sync' && (
        <CalendarSync />
      )}
    </DashboardLayout>
  );
}

export default function PropertyDashboardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [propertyConfig, setPropertyConfig] = useState<PropertyConfig | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load property by slug
    const loadedProperty = getPropertyBySlug(slug);
    setProperty(loadedProperty);
    
    if (loadedProperty) {
      const config = convertPropertyToConfig(loadedProperty);
      setPropertyConfig(config);
      
      // Check authentication
      if (typeof window !== 'undefined') {
        const auth = sessionStorage.getItem(`auth-${config.id}`);
        setIsAuthenticated(auth === 'true');
      }
    }
    
    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Učitavanje...</p>
        </div>
      </div>
    );
  }

  if (!property || !propertyConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Objekt nije pronađen</p>
          <a 
            href="/dashboard/properties"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Povratak na objekte
          </a>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm 
        property={propertyConfig} 
        onSuccess={() => setIsAuthenticated(true)} 
      />
    );
  }

  return (
    <PropertyProvider property={propertyConfig}>
      <DashboardContent />
    </PropertyProvider>
  );
}
