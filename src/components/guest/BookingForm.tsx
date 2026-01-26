'use client';

import { useState, useEffect, useMemo } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Check, 
  Loader2, 
  Sparkles,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';
import { createBooking, isRoomAvailable, getBlockedDates } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { PaymentForm } from './PaymentForm';
import { PaymentInfo } from '@/types';
import { sendGuestBookingConfirmationEmail, sendOwnerNewBookingNotificationEmail } from '@/lib/email';
import { notifyNewBooking, notifyPaymentReceived } from '@/lib/notifications';

type BookingStep = 'dates' | 'room' | 'guest' | 'confirm' | 'payment' | 'success';

const localeMap = {
  hr: hr,
  en: enUS,
  de: de,
  it: it,
  sl: sl,
};

export function BookingForm() {
  const { property, t, locale } = useProperty();
  const [step, setStep] = useState<BookingStep>('dates');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Booking state
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  
  // Check if payment is enabled
  const paymentEnabled = property.payment?.enabled ?? false;

  const dateLocale = localeMap[locale] || enUS;

  // Listen for room selection from Rooms component
  useEffect(() => {
    const handleSelectRoom = (e: CustomEvent<string>) => {
      setSelectedRoomId(e.detail);
      if (checkIn && checkOut) {
        setStep('guest');
      } else {
        setStep('dates');
      }
    };

    window.addEventListener('selectRoom', handleSelectRoom as EventListener);
    return () => window.removeEventListener('selectRoom', handleSelectRoom as EventListener);
  }, [checkIn, checkOut]);

  // Get blocked dates for the calendar
  const blockedDates = useMemo(() => {
    const blocked = getBlockedDates(property.id);
    return blocked.map(b => new Date(b.date));
  }, [property.id]);

  // Calculate price
  const selectedRoom = property.roomTypes.find(r => r.id === selectedRoomId);
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const basePrice = selectedRoom ? selectedRoom.price * nights : 0;
  const discount = basePrice * (property.directBookingDiscount / 100);
  const totalPrice = basePrice - discount;

  // Check availability for rooms
  const availableRooms = useMemo(() => {
    if (!checkIn || !checkOut) return property.roomTypes;
    
    return property.roomTypes.filter(room => 
      isRoomAvailable(
        property.id,
        room.id,
        checkIn.toISOString().split('T')[0],
        checkOut.toISOString().split('T')[0]
      )
    );
  }, [property, checkIn, checkOut]);

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from) setCheckIn(range.from);
    if (range?.to) setCheckOut(range.to);
  };

  const handleProceedToPaymentOrSubmit = async () => {
    if (!checkIn || !checkOut || !selectedRoomId || !guestName || !guestEmail || !guestPhone) {
      return;
    }

    if (paymentEnabled) {
      // Go to payment step
      setStep('payment');
    } else {
      // Submit directly without payment
      await handleFinalSubmit(null);
    }
  };

  const handlePaymentComplete = async (payment: PaymentInfo) => {
    setPaymentInfo(payment);
    await handleFinalSubmit(payment);
  };

  const handleSkipPayment = async () => {
    const pendingPayment: PaymentInfo = {
      status: 'pending',
      amount: Math.round(totalPrice * ((property.payment?.advancePaymentPercent || 30) / 100) * 100) / 100,
      currency: property.currency,
    };
    setPaymentInfo(pendingPayment);
    await handleFinalSubmit(pendingPayment);
  };

  const handleFinalSubmit = async (payment: PaymentInfo | null) => {
    if (!checkIn || !checkOut || !selectedRoomId || !guestName || !guestEmail || !guestPhone) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const booking = createBooking({
      propertyId: property.id,
      roomTypeId: selectedRoomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      guests,
      specialRequests,
      totalPrice,
      payment: payment || undefined,
    });

    setBookingId(booking.id);
    
    // Send email notifications
    try {
      // Send confirmation email to guest
      await sendGuestBookingConfirmationEmail(booking, property);
      
      // Send notification email to property owner
      await sendOwnerNewBookingNotificationEmail(booking, property);
    } catch (error) {
      console.error('Failed to send email notifications:', error);
      // Don't fail the booking if emails fail
    }

    // Send push notifications to owner (Telegram/WhatsApp if enabled)
    try {
      const roomType = property.roomTypes.find(r => r.id === selectedRoomId);
      if (roomType) {
        await notifyNewBooking({ booking, roomType, property });
        
        // If payment was made, also send payment notification
        if (booking.payment?.status === 'paid') {
          await notifyPaymentReceived({ booking, roomType, property });
        }
      }
    } catch (error) {
      console.error('Failed to send push notification:', error);
      // Don't fail the booking if notifications fail
    }

    setIsSubmitting(false);
    setStep('success');
  };

  const resetForm = () => {
    setStep('dates');
    setCheckIn(undefined);
    setCheckOut(undefined);
    setSelectedRoomId('');
    setGuests(1);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
    setBookingId(null);
    setPaymentInfo(null);
  };

  // Steps configuration
  const allSteps = paymentEnabled 
    ? ['dates', 'room', 'guest', 'confirm', 'payment'] as const
    : ['dates', 'room', 'guest', 'confirm'] as const;
  
  const getStepIndex = (s: BookingStep) => {
    const idx = allSteps.indexOf(s as typeof allSteps[number]);
    return idx >= 0 ? idx : 0;
  };

  const canProceedToRoom = checkIn && checkOut && nights > 0;
  const canProceedToGuest = canProceedToRoom && selectedRoomId;
  const canProceedToConfirm = canProceedToGuest && guestName && guestEmail && guestPhone;

  const formatNights = (n: number) => {
    return n === 1 ? `1 ${t.booking.night}` : `${n} ${t.booking.nights}`;
  };

  const formatGuests = (n: number) => {
    return n === 1 ? `1 ${t.booking.guest}` : `${n} ${t.booking.guests}`;
  };

  return (
    <section id="booking" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge 
            className="mb-4"
            style={{ 
              backgroundColor: 'var(--theme-accent)',
              color: 'white'
            }}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            {t.hero.bookDirectSave} {property.directBookingDiscount}%!
          </Badge>
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-header-font)',
              color: 'var(--theme-primary)'
            }}
          >
            {t.booking.title}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
        </div>

        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 text-sm">
              {allSteps.map((s, idx) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors',
                      step === s || getStepIndex(step) > idx
                        ? 'text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    )}
                    style={{
                      backgroundColor: step === s || getStepIndex(step) > idx 
                        ? 'var(--theme-primary)' 
                        : undefined
                    }}
                  >
                    {getStepIndex(step) > idx ? (
                      <Check className="w-4 h-4" />
                    ) : s === 'payment' ? (
                      <CreditCard className="w-4 h-4" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < allSteps.length - 1 && (
                    <div 
                      className={cn(
                        'w-8 h-0.5 mx-1',
                        getStepIndex(step) > idx
                          ? 'bg-[var(--theme-primary)]'
                          : 'bg-neutral-200'
                      )}
                      style={{
                        backgroundColor: getStepIndex(step) > idx 
                          ? 'var(--theme-primary)' 
                          : undefined
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            {/* Step 1: Select Dates */}
            {step === 'dates' && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>{t.booking.selectDates}</CardTitle>
                  <CardDescription>{t.booking.checkInDate} - {t.booking.checkOutDate}</CardDescription>
                </CardHeader>
                
                <div className="flex justify-center">
                  <Calendar
                    mode="range"
                    selected={{ from: checkIn, to: checkOut }}
                    onSelect={handleDateSelect}
                    numberOfMonths={2}
                    locale={dateLocale}
                    disabled={(date) => 
                      date < new Date() || 
                      blockedDates.some(d => d.toDateString() === date.toDateString())
                    }
                    className="rounded-md border"
                  />
                </div>

                {checkIn && checkOut && (
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <p className="text-lg">
                      <span className="font-semibold">{format(checkIn, 'd. MMM yyyy', { locale: dateLocale })}</span>
                      {' → '}
                      <span className="font-semibold">{format(checkOut, 'd. MMM yyyy', { locale: dateLocale })}</span>
                    </p>
                    <p className="text-neutral-600">{formatNights(nights)}</p>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!canProceedToRoom}
                  onClick={() => setStep('room')}
                  style={{ 
                    backgroundColor: 'var(--theme-primary)',
                    color: 'white'
                  }}
                >
                  {t.common.next}
                </Button>
              </div>
            )}

            {/* Step 2: Select Room */}
            {step === 'room' && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>{t.booking.selectRoom}</CardTitle>
                  <CardDescription>
                    {format(checkIn!, 'd. MMM', { locale: dateLocale })} - {format(checkOut!, 'd. MMM yyyy', { locale: dateLocale })} ({formatNights(nights)})
                  </CardDescription>
                </CardHeader>

                {availableRooms.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                    <p className="text-neutral-600">{t.booking.selectDatesFirst}</p>
                    <Button variant="outline" onClick={() => setStep('dates')} className="mt-4">
                      {t.common.back}
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {availableRooms.map((room) => (
                      <div
                        key={room.id}
                        className={cn(
                          'p-4 rounded-lg border-2 cursor-pointer transition-all',
                          selectedRoomId === room.id
                            ? 'border-[var(--theme-primary)] bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        )}
                        onClick={() => setSelectedRoomId(room.id)}
                        style={{
                          borderColor: selectedRoomId === room.id ? 'var(--theme-primary)' : undefined
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{room.name}</h3>
                            <p className="text-sm text-neutral-600 flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {t.rooms.upToGuests.replace('{count}', room.maxGuests.toString())}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold" style={{ color: 'var(--theme-primary)' }}>
                              {property.currency}{room.price * nights}
                            </p>
                            <p className="text-xs text-neutral-500">{property.currency}{room.price}{t.rooms.perNight}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('dates')} className="flex-1">
                    {t.common.back}
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!canProceedToGuest}
                    onClick={() => setStep('guest')}
                    style={{ 
                      backgroundColor: 'var(--theme-primary)',
                      color: 'white'
                    }}
                  >
                    {t.common.next}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Guest Information */}
            {step === 'guest' && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>{t.booking.guestDetails}</CardTitle>
                </CardHeader>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">{t.booking.fullName} *</Label>
                    <Input
                      id="name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ivan Horvat"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t.booking.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="ivan@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t.booking.phone} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+385 91 234 5678"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">{t.booking.numberOfGuests}</Label>
                    <Select 
                      value={guests.toString()} 
                      onValueChange={(v) => setGuests(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: selectedRoom?.maxGuests || 1 }, (_, i) => i + 1).map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {formatGuests(n)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="requests">{t.booking.specialRequests}</Label>
                    <Textarea
                      id="requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder={t.booking.specialRequestsPlaceholder}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('room')} className="flex-1">
                    {t.common.back}
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!canProceedToConfirm}
                    onClick={() => setStep('confirm')}
                    style={{ 
                      backgroundColor: 'var(--theme-primary)',
                      color: 'white'
                    }}
                  >
                    {t.common.next}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 'confirm' && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>{t.booking.priceSummary}</CardTitle>
                </CardHeader>

                <div className="space-y-4">
                  {/* Booking Summary */}
                  <div className="p-4 bg-neutral-50 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">{t.dashboard.room}</span>
                      <span className="font-medium">{selectedRoom?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">{t.hero.checkIn}</span>
                      <span className="font-medium">{format(checkIn!, 'd. MMM yyyy', { locale: dateLocale })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">{t.hero.checkOut}</span>
                      <span className="font-medium">{format(checkOut!, 'd. MMM yyyy', { locale: dateLocale })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">{t.booking.nights}</span>
                      <span className="font-medium">{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">{t.booking.guests}</span>
                      <span className="font-medium">{guests}</span>
                    </div>
                  </div>

                  {/* Guest Info */}
                  <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
                    <p className="font-medium">{guestName}</p>
                    <p className="text-sm text-neutral-600">{guestEmail}</p>
                    <p className="text-sm text-neutral-600">{guestPhone}</p>
                    {specialRequests && (
                      <p className="text-sm text-neutral-600 mt-2">
                        <span className="font-medium">{t.booking.specialRequests}:</span> {specialRequests}
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--theme-primary)' }}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">
                          {property.currency}{selectedRoom?.price} × {nights} {t.booking.nights}
                        </span>
                        <span>{property.currency}{basePrice}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>{t.booking.directDiscount} ({property.directBookingDiscount}%)</span>
                        <span>-{property.currency}{discount.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                        <span>{t.booking.total}</span>
                        <span style={{ color: 'var(--theme-primary)' }}>{property.currency}{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('guest')} className="flex-1">
                    {t.common.back}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleProceedToPaymentOrSubmit}
                    disabled={isSubmitting}
                    style={{ 
                      backgroundColor: 'var(--theme-accent)',
                      color: 'white'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.booking.submitting}
                      </>
                    ) : paymentEnabled ? (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        {t.payment.title}
                      </>
                    ) : (
                      t.booking.submitBooking
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {step === 'payment' && (
              <PaymentForm
                totalPrice={totalPrice}
                onPaymentComplete={handlePaymentComplete}
                onBack={() => setStep('confirm')}
                onSkip={handleSkipPayment}
              />
            )}

            {/* Success */}
            {step === 'success' && (
              <div className="text-center py-8 space-y-6">
                <div 
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                >
                  <Check className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--theme-header-font)',
                      color: 'var(--theme-primary)'
                    }}
                  >
                    {t.booking.bookingSuccess}
                  </h3>
                  <p className="text-neutral-600">
                    {t.booking.bookingSuccessMessage}
                  </p>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg inline-block">
                  <p className="text-sm text-neutral-600">Booking Reference</p>
                  <p className="font-mono font-bold text-lg">{bookingId}</p>
                </div>

                {/* Payment Status */}
                {paymentInfo && (
                  <div className={cn(
                    'p-4 rounded-lg inline-block',
                    paymentInfo.status === 'paid' ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
                  )}>
                    <div className="flex items-center gap-2 justify-center">
                      {paymentInfo.status === 'paid' ? (
                        <>
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">{t.payment.paid}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          <span className="font-medium text-amber-800">{t.payment.pending}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm mt-1">
                      {paymentInfo.status === 'paid' ? (
                        <span className="text-green-700">
                          {t.payment.advancePayment}: {property.currency}{paymentInfo.amount.toFixed(2)}
                          {paymentInfo.cardLast4 && ` • ${t.payment.cardEnding} ${paymentInfo.cardLast4}`}
                        </span>
                      ) : (
                        <span className="text-amber-700">
                          {t.payment.remainingOnArrival}: {property.currency}{totalPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                )}
                
                <div className="text-sm text-neutral-600">
                  <p>{guestEmail}</p>
                </div>
                
                <Button variant="outline" onClick={resetForm}>
                  {t.common.back}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
