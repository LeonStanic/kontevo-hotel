'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Building2,
  Users,
  Phone,
  Mail,
} from 'lucide-react';
import {
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { hr } from 'date-fns/locale';

// Demo data for bookings across properties
const DEMO_BOOKINGS = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Vila Ana',
    propertyColor: '#3B82F6', // blue
    guestName: 'Ivan Horvat',
    guestPhone: '+385 91 234 5678',
    guestEmail: 'ivan@email.com',
    checkIn: '2026-01-27',
    checkOut: '2026-01-30',
    status: 'confirmed',
    totalPrice: 360,
  },
  {
    id: '2',
    propertyId: '2',
    propertyName: 'Apartman Marija',
    propertyColor: '#8B5CF6', // purple
    guestName: 'Marija Kovač',
    guestPhone: '+385 98 765 4321',
    guestEmail: 'marija@email.com',
    checkIn: '2026-01-28',
    checkOut: '2026-02-02',
    status: 'pending',
    totalPrice: 645,
  },
  {
    id: '3',
    propertyId: '3',
    propertyName: 'Kuća Petra',
    propertyColor: '#10B981', // green
    guestName: 'Petra Babić',
    guestPhone: '+385 99 111 2222',
    guestEmail: 'petra@email.com',
    checkIn: '2026-02-01',
    checkOut: '2026-02-05',
    status: 'confirmed',
    totalPrice: 756,
  },
  {
    id: '4',
    propertyId: '1',
    propertyName: 'Vila Ana',
    propertyColor: '#3B82F6',
    guestName: 'Luka Jurić',
    guestPhone: '+385 91 333 4444',
    guestEmail: 'luka@email.com',
    checkIn: '2026-02-05',
    checkOut: '2026-02-10',
    status: 'confirmed',
    totalPrice: 450,
  },
  {
    id: '5',
    propertyId: '4',
    propertyName: 'Studio Luka',
    propertyColor: '#F59E0B', // amber
    guestName: 'Ana Matić',
    guestPhone: '+385 98 555 6666',
    guestEmail: 'ana@email.com',
    checkIn: '2026-01-29',
    checkOut: '2026-01-31',
    status: 'confirmed',
    totalPrice: 178,
  },
];

const DEMO_PROPERTIES = [
  { id: '1', name: 'Vila Ana', color: '#3B82F6' },
  { id: '2', name: 'Apartman Marija', color: '#8B5CF6' },
  { id: '3', name: 'Kuća Petra', color: '#10B981' },
  { id: '4', name: 'Studio Luka', color: '#F59E0B' },
  { id: '5', name: 'Villa Sunset', color: '#EF4444' },
];

interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyColor: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalPrice: number;
}

export default function UnifiedCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Filter bookings by property
  const filteredBookings = useMemo(() => {
    if (selectedProperty === 'all') return DEMO_BOOKINGS;
    return DEMO_BOOKINGS.filter(b => b.propertyId === selectedProperty);
  }, [selectedProperty]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    
    const days = [];
    let day = start;
    
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    
    return days;
  }, [currentMonth]);

  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    return filteredBookings.filter(booking => {
      const checkIn = parseISO(booking.checkIn);
      const checkOut = parseISO(booking.checkOut);
      return isWithinInterval(date, { start: checkIn, end: addDays(checkOut, -1) });
    });
  };

  // Check if date is check-in or check-out day
  const isCheckInDay = (date: Date, booking: Booking) => {
    return isSameDay(date, parseISO(booking.checkIn));
  };

  const isCheckOutDay = (date: Date, booking: Booking) => {
    return isSameDay(date, addDays(parseISO(booking.checkOut), -1));
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const weekDays = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kalendar</h1>
          <p className="text-gray-500 mt-1">Pregled svih rezervacija na jednom mjestu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold capitalize">
                  {format(currentMonth, 'LLLL yyyy', { locale: hr })}
                </h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="w-[200px]">
                  <Building2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Svi objekti" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Svi objekti</SelectItem>
                  {DEMO_PROPERTIES.map(property => (
                    <SelectItem key={property.id} value={property.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: property.color }}
                        />
                        {property.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {/* Week days header */}
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {calendarDays.map((day, index) => {
                  const dayBookings = getBookingsForDay(day);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[100px] p-1 bg-white
                        ${!isCurrentMonth ? 'bg-gray-50' : ''}
                      `}
                    >
                      <div className={`
                        text-sm font-medium mb-1 text-center w-7 h-7 rounded-full flex items-center justify-center mx-auto
                        ${isToday ? 'bg-blue-600 text-white' : ''}
                        ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                      `}>
                        {format(day, 'd')}
                      </div>
                      
                      {/* Booking bars */}
                      <div className="space-y-1">
                        {dayBookings.slice(0, 3).map(booking => {
                          const isStart = isCheckInDay(day, booking);
                          const isEnd = isCheckOutDay(day, booking);
                          
                          return (
                            <div
                              key={booking.id}
                              onClick={() => setSelectedBooking(booking)}
                              className={`
                                text-xs px-1 py-0.5 text-white truncate cursor-pointer
                                hover:opacity-80 transition-opacity
                                ${isStart ? 'rounded-l-md ml-0' : '-ml-1'}
                                ${isEnd ? 'rounded-r-md mr-0' : '-mr-1'}
                                ${booking.status === 'pending' ? 'opacity-70' : ''}
                              `}
                              style={{ backgroundColor: booking.propertyColor }}
                              title={`${booking.propertyName}: ${booking.guestName}`}
                            >
                              {isStart && booking.guestName.split(' ')[0]}
                            </div>
                          );
                        })}
                        {dayBookings.length > 3 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayBookings.length - 3} više
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                {(selectedProperty === 'all' ? DEMO_PROPERTIES : DEMO_PROPERTIES.filter(p => p.id === selectedProperty)).map(property => (
                  <div key={property.id} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: property.color }}
                    />
                    <span className="text-sm text-gray-600">{property.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Selected booking or upcoming */}
        <div className="space-y-4">
          {selectedBooking ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Detalji rezervacije</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedBooking(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: selectedBooking.propertyColor }}
                  />
                  <span className="font-medium">{selectedBooking.propertyName}</span>
                </div>

                <div>
                  <p className="text-lg font-semibold">{selectedBooking.guestName}</p>
                  <Badge variant={selectedBooking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {selectedBooking.status === 'confirmed' ? 'Potvrđeno' : 'Na čekanju'}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {format(parseISO(selectedBooking.checkIn), 'dd.MM.yyyy')} - {format(parseISO(selectedBooking.checkOut), 'dd.MM.yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{selectedBooking.guestPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{selectedBooking.guestEmail}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Ukupno</span>
                    <span className="text-xl font-bold">€{selectedBooking.totalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedBooking.status === 'pending' && (
                    <Button className="flex-1" size="sm">
                      Potvrdi
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1" size="sm">
                    Detalji
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nadolazeće rezervacije</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredBookings
                    .filter(b => parseISO(b.checkIn) >= new Date())
                    .sort((a, b) => parseISO(a.checkIn).getTime() - parseISO(b.checkIn).getTime())
                    .slice(0, 5)
                    .map(booking => (
                      <div 
                        key={booking.id}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: booking.propertyColor }}
                          />
                          <span className="text-xs text-gray-500">{booking.propertyName}</span>
                        </div>
                        <p className="font-medium text-sm">{booking.guestName}</p>
                        <p className="text-xs text-gray-500">
                          {format(parseISO(booking.checkIn), 'dd.MM.')} - {format(parseISO(booking.checkOut), 'dd.MM.')}
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ovaj mjesec</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rezervacije</span>
                  <span className="font-semibold">{filteredBookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Na čekanju</span>
                  <span className="font-semibold text-amber-600">
                    {filteredBookings.filter(b => b.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Prihod</span>
                  <span className="font-semibold text-green-600">
                    €{filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
