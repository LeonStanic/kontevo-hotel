'use client';

import { useEffect, useState, useCallback } from 'react';
import { property } from '@/config/property';
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

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem(`auth-${property.id}`);
      setIsAuthenticated(auth === 'true');
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="animate-pulse text-neutral-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm 
        property={property} 
        onSuccess={() => setIsAuthenticated(true)} 
      />
    );
  }

  return (
    <PropertyProvider property={property}>
      <DashboardContent />
    </PropertyProvider>
  );
}
