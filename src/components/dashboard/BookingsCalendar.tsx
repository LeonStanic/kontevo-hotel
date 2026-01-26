'use client';

import { useMemo, useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Booking, BlockedDate } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Ban, CalendarCheck } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths,
  isSameDay,
  isWithinInterval,
  parseISO
} from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';
import { Locale } from '@/lib/i18n';

interface BookingsCalendarProps {
  bookings: Booking[];
  blockedDates: BlockedDate[];
}

interface DayInfo {
  date: Date;
  bookings: Booking[];
  blocked: BlockedDate[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

const localeMap: Record<Locale, typeof enUS> = {
  hr: hr,
  en: enUS,
  de: de,
  it: it,
  sl: sl,
};

export function BookingsCalendar({ bookings, blockedDates }: BookingsCalendarProps) {
  const { property, t, locale } = useProperty();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);

  const dateLocale = localeMap[locale] || enUS;

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Add padding days for the start of the week
    const startDay = monthStart.getDay();
    const paddingStart = Array(startDay).fill(null);

    return [...paddingStart, ...days].map((date) => {
      if (!date) return null;

      const dayBookings = activeBookings.filter(booking => {
        const checkIn = parseISO(booking.checkIn);
        const checkOut = parseISO(booking.checkOut);
        return isWithinInterval(date, { start: checkIn, end: checkOut }) ||
               isSameDay(date, checkIn) ||
               isSameDay(date, checkOut);
      });

      const dayBlocked = blockedDates.filter(blocked => 
        isSameDay(parseISO(blocked.date), date)
      );

      return {
        date,
        bookings: dayBookings,
        blocked: dayBlocked,
        isCurrentMonth: isSameMonth(date, currentMonth),
        isToday: isToday(date),
      };
    });
  }, [currentMonth, activeBookings, blockedDates]);

  const getRoomName = (roomTypeId: string) => {
    const room = property.roomTypes.find(r => r.id === roomTypeId);
    return room?.name || roomTypeId;
  };

  const weekDays = [
    t.dates.sunday.slice(0, 3),
    t.dates.monday.slice(0, 3),
    t.dates.tuesday.slice(0, 3),
    t.dates.wednesday.slice(0, 3),
    t.dates.thursday.slice(0, 3),
    t.dates.friday.slice(0, 3),
    t.dates.saturday.slice(0, 3),
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.dashboard.calendar}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-medium min-w-[140px] text-center">
            {format(currentMonth, 'MMMM yyyy', { locale: dateLocale })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>{t.dashboard.confirmed}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded" />
          <span>{t.dashboard.pending}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span>{t.dashboard.blockedDates}</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-2 sm:p-4">
          {/* Week days header */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-neutral-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const hasConfirmed = day.bookings.some(b => b.status === 'confirmed');
              const hasPending = day.bookings.some(b => b.status === 'pending');
              const hasBlocked = day.blocked.length > 0;

              return (
                <button
                  key={day.date.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    aspect-square p-1 rounded-lg border transition-all text-left flex flex-col
                    ${day.isToday ? 'ring-2 ring-blue-500' : ''}
                    ${day.isCurrentMonth ? 'bg-white' : 'bg-neutral-50 text-neutral-400'}
                    ${(day.bookings.length > 0 || day.blocked.length > 0) ? 'cursor-pointer hover:shadow-md' : ''}
                  `}
                >
                  <span className={`text-xs sm:text-sm font-medium ${day.isToday ? 'text-blue-600' : ''}`}>
                    {format(day.date, 'd')}
                  </span>
                  
                  {/* Status indicators */}
                  <div className="flex flex-wrap gap-0.5 mt-auto">
                    {hasConfirmed && (
                      <div className="w-2 h-2 rounded-full bg-green-500" title={t.dashboard.confirmed} />
                    )}
                    {hasPending && (
                      <div className="w-2 h-2 rounded-full bg-amber-500" title={t.dashboard.pending} />
                    )}
                    {hasBlocked && (
                      <div className="w-2 h-2 rounded-full bg-red-500" title={t.dashboard.blockedDates} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Day Detail Dialog */}
      <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-md">
          {selectedDay && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {format(selectedDay.date, 'EEEE, d. MMMM yyyy', { locale: dateLocale })}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Bookings */}
                {selectedDay.bookings.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-neutral-500 flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4" />
                      {t.dashboard.bookings} ({selectedDay.bookings.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedDay.bookings.map(booking => (
                        <div 
                          key={booking.id}
                          className={`p-3 rounded-lg border-l-4 bg-neutral-50 ${
                            booking.status === 'confirmed' ? 'border-green-500' : 'border-amber-500'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{booking.guestName}</p>
                              <p className="text-sm text-neutral-500">
                                {getRoomName(booking.roomTypeId)}
                              </p>
                            </div>
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                              {booking.status === 'confirmed' ? t.dashboard.confirmed : t.dashboard.pending}
                            </Badge>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">
                            {format(parseISO(booking.checkIn), 'd. MMM', { locale: dateLocale })} - {format(parseISO(booking.checkOut), 'd. MMM', { locale: dateLocale })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blocked Dates */}
                {selectedDay.blocked.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-neutral-500 flex items-center gap-2">
                      <Ban className="w-4 h-4" />
                      {t.dashboard.blockedDates} ({selectedDay.blocked.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedDay.blocked.map(blocked => (
                        <div 
                          key={blocked.id}
                          className="p-3 rounded-lg border-l-4 border-red-500 bg-red-50"
                        >
                          <p className="font-medium text-red-800">{blocked.reason}</p>
                          {blocked.roomTypeId && (
                            <p className="text-sm text-red-600">
                              {t.dashboard.room}: {getRoomName(blocked.roomTypeId)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No events */}
                {selectedDay.bookings.length === 0 && selectedDay.blocked.length === 0 && (
                  <p className="text-center text-neutral-500 py-4">
                    {t.dashboard.noBookings}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
