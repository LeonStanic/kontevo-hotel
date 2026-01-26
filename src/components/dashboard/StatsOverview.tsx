'use client';

import { useMemo } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking } from '@/types';
import { 
  CalendarCheck, 
  DollarSign, 
  Percent, 
  Clock,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface StatsOverviewProps {
  bookings: Booking[];
}

export function StatsOverview({ bookings }: StatsOverviewProps) {
  const { property, t } = useProperty();

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    // This month's bookings
    const thisMonthBookings = bookings.filter(b => {
      const created = new Date(b.createdAt);
      return created.getMonth() === thisMonth && 
             created.getFullYear() === thisYear &&
             b.status !== 'cancelled';
    });

    // Last month's bookings (for comparison)
    const lastMonthBookings = bookings.filter(b => {
      const created = new Date(b.createdAt);
      return created.getMonth() === lastMonth && 
             created.getFullYear() === lastMonthYear &&
             b.status !== 'cancelled';
    });

    // Revenue calculations
    const thisMonthRevenue = thisMonthBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const lastMonthRevenue = lastMonthBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    // Occupancy rate (simplified: days booked / total days in month)
    const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
    const totalRoomDays = property.roomTypes.length * daysInMonth;
    
    const bookedDays = thisMonthBookings.reduce((sum, b) => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return sum + nights;
    }, 0);

    const occupancyRate = totalRoomDays > 0 ? (bookedDays / totalRoomDays) * 100 : 0;

    // Pending bookings
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;

    // Calculate trends
    const bookingsTrend = lastMonthBookings.length > 0 
      ? ((thisMonthBookings.length - lastMonthBookings.length) / lastMonthBookings.length) * 100 
      : 0;

    const revenueTrend = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0;

    return {
      totalBookingsThisMonth: thisMonthBookings.length,
      revenue: thisMonthRevenue,
      occupancyRate: Math.min(occupancyRate, 100),
      pendingBookings,
      bookingsTrend,
      revenueTrend,
    };
  }, [bookings, property.roomTypes.length]);

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-neutral-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-neutral-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Total Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-neutral-600">
            {t.dashboard.bookingsThisMonth}
          </CardTitle>
          <CalendarCheck className="w-5 h-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalBookingsThisMonth}</div>
          <div className={`flex items-center gap-1 text-sm ${getTrendColor(stats.bookingsTrend)}`}>
            {getTrendIcon(stats.bookingsTrend)}
            <span>
              {stats.bookingsTrend > 0 ? '+' : ''}
              {stats.bookingsTrend.toFixed(0)}% {t.dashboard.vsLastMonth}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-neutral-600">
            {t.dashboard.revenueThisMonth}
          </CardTitle>
          <DollarSign className="w-5 h-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {property.currency}{stats.revenue.toLocaleString()}
          </div>
          <div className={`flex items-center gap-1 text-sm ${getTrendColor(stats.revenueTrend)}`}>
            {getTrendIcon(stats.revenueTrend)}
            <span>
              {stats.revenueTrend > 0 ? '+' : ''}
              {stats.revenueTrend.toFixed(0)}% {t.dashboard.vsLastMonth}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Occupancy Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-neutral-600">
            {t.dashboard.occupancyRate}
          </CardTitle>
          <Percent className="w-5 h-5 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {stats.occupancyRate.toFixed(0)}%
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.occupancyRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pending Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-neutral-600">
            {t.dashboard.pendingReview}
          </CardTitle>
          <Clock className="w-5 h-5 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.pendingBookings}</div>
          <p className="text-sm text-neutral-500">
            {stats.pendingBookings === 0 
              ? t.dashboard.allCaughtUp 
              : t.dashboard.awaitingConfirmation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
