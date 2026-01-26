'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Booking, BookingStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Check, 
  X, 
  Eye,
  Filter,
  Users,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { PaymentStatus } from '@/types';
import { format } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';
import { updateBookingStatus } from '@/lib/storage';
import { sendGuestBookingConfirmedEmail } from '@/lib/email';
import { notifyBookingConfirmed, notifyBookingCancelled } from '@/lib/notifications';

interface BookingsTableProps {
  bookings: Booking[];
  onUpdate: () => void;
}

const localeMap = {
  hr: hr,
  en: enUS,
  de: de,
  it: it,
  sl: sl,
};

export function BookingsTable({ bookings, onUpdate }: BookingsTableProps) {
  const { property, t, locale } = useProperty();
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionDialog, setActionDialog] = useState<{ booking: Booking; action: 'confirm' | 'cancel' } | null>(null);

  const dateLocale = localeMap[locale] || enUS;

  const statusConfig: Record<BookingStatus, { label: string; color: string; bgColor: string }> = {
    pending: { label: t.dashboard.pending, color: 'text-amber-700', bgColor: 'bg-amber-100' },
    confirmed: { label: t.dashboard.confirmed, color: 'text-green-700', bgColor: 'bg-green-100' },
    cancelled: { label: t.dashboard.cancelled, color: 'text-red-700', bgColor: 'bg-red-100' },
    completed: { label: t.dashboard.completed, color: 'text-blue-700', bgColor: 'bg-blue-100' },
  };

  const paymentStatusConfig: Record<PaymentStatus, { label: string; color: string; bgColor: string; icon: typeof Check }> = {
    paid: { label: t.payment.paid, color: 'text-green-700', bgColor: 'bg-green-100', icon: Check },
    pending: { label: t.payment.pending, color: 'text-amber-700', bgColor: 'bg-amber-100', icon: AlertCircle },
    failed: { label: t.payment.failed, color: 'text-red-700', bgColor: 'bg-red-100', icon: X },
    refunded: { label: t.payment.refunded, color: 'text-purple-700', bgColor: 'bg-purple-100', icon: CreditCard },
  };

  const filteredBookings = bookings.filter(b => 
    filter === 'all' || b.status === filter
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleAction = async (booking: Booking, action: 'confirm' | 'cancel') => {
    const newStatus: BookingStatus = action === 'confirm' ? 'confirmed' : 'cancelled';
    updateBookingStatus(booking.id, newStatus);
    
    const roomType = property.roomTypes.find(r => r.id === booking.roomTypeId);
    const updatedBooking = { ...booking, status: newStatus };
    
    // Send confirmation email to guest when owner confirms
    if (action === 'confirm') {
      try {
        await sendGuestBookingConfirmedEmail(updatedBooking, property);
      } catch (error) {
        console.error('Failed to send confirmation email:', error);
        // Don't fail the confirmation if email fails
      }
      
      // Send push notification for confirmation
      if (roomType) {
        try {
          await notifyBookingConfirmed({ booking: updatedBooking, roomType, property });
        } catch (error) {
          console.error('Failed to send notification:', error);
        }
      }
    }
    
    // Send push notification for cancellation
    if (action === 'cancel' && roomType) {
      try {
        await notifyBookingCancelled({ booking: updatedBooking, roomType, property });
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    }
    
    setActionDialog(null);
    onUpdate();
  };

  const getRoomName = (roomTypeId: string) => {
    const room = property.roomTypes.find(r => r.id === roomTypeId);
    return room?.name || roomTypeId;
  };

  return (
    <div className="space-y-4">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">{t.dashboard.bookings}</h2>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <Select value={filter} onValueChange={(v) => setFilter(v as BookingStatus | 'all')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t.common.filter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.dashboard.allBookings}</SelectItem>
              <SelectItem value="pending">{t.dashboard.pending}</SelectItem>
              <SelectItem value="confirmed">{t.dashboard.confirmed}</SelectItem>
              <SelectItem value="cancelled">{t.dashboard.cancelled}</SelectItem>
              <SelectItem value="completed">{t.dashboard.completed}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.dashboard.guest}</TableHead>
                <TableHead>{t.dashboard.room}</TableHead>
                <TableHead>{t.dashboard.checkInDate}</TableHead>
                <TableHead>{t.dashboard.checkOutDate}</TableHead>
                <TableHead>{t.dashboard.guestsCount}</TableHead>
                <TableHead>{t.dashboard.totalPrice}</TableHead>
                <TableHead>{t.payment.paymentStatus}</TableHead>
                <TableHead>{t.dashboard.status}</TableHead>
                <TableHead>{t.dashboard.created}</TableHead>
                <TableHead className="text-right">{t.dashboard.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-neutral-500">
                    {t.dashboard.noBookings}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.guestName}</TableCell>
                    <TableCell className="text-sm">{getRoomName(booking.roomTypeId)}</TableCell>
                    <TableCell>{format(new Date(booking.checkIn), 'd. MMM yyyy', { locale: dateLocale })}</TableCell>
                    <TableCell>{format(new Date(booking.checkOut), 'd. MMM yyyy', { locale: dateLocale })}</TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell className="font-semibold">{property.currency}{booking.totalPrice}</TableCell>
                    <TableCell>
                      {booking.payment ? (
                        <Badge 
                          variant="secondary"
                          className={`${paymentStatusConfig[booking.payment.status].bgColor} ${paymentStatusConfig[booking.payment.status].color} gap-1`}
                        >
                          {booking.payment.status === 'paid' && <Check className="w-3 h-3" />}
                          {booking.payment.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                          {property.currency}{booking.payment.amount}
                        </Badge>
                      ) : (
                        <span className="text-neutral-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={`${statusConfig[booking.status].bgColor} ${statusConfig[booking.status].color}`}
                      >
                        {statusConfig[booking.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-500">
                      {format(new Date(booking.createdAt), 'd. MMM', { locale: dateLocale })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => setActionDialog({ booking, action: 'confirm' })}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setActionDialog({ booking, action: 'cancel' })}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={selectedBooking !== null} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-md">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>{t.dashboard.viewDetails}</DialogTitle>
                <DialogDescription>
                  ID: {selectedBooking.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Guest Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-neutral-500">{t.booking.guestDetails}</h4>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedBooking.guestName}</p>
                    <p className="text-sm flex items-center gap-2 text-neutral-600">
                      <Mail className="w-4 h-4" />
                      {selectedBooking.guestEmail}
                    </p>
                    <p className="text-sm flex items-center gap-2 text-neutral-600">
                      <Phone className="w-4 h-4" />
                      {selectedBooking.guestPhone}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-neutral-500">{t.dashboard.bookings}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{t.hero.checkIn}</span>
                    </div>
                    <span className="font-medium">
                      {format(new Date(selectedBooking.checkIn), 'd. MMM yyyy', { locale: dateLocale })}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{t.hero.checkOut}</span>
                    </div>
                    <span className="font-medium">
                      {format(new Date(selectedBooking.checkOut), 'd. MMM yyyy', { locale: dateLocale })}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-neutral-400" />
                      <span>{t.booking.guests}</span>
                    </div>
                    <span className="font-medium">{selectedBooking.guests}</span>
                  </div>
                </div>

                {/* Room & Price */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-neutral-500">{t.dashboard.room}</h4>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="font-medium">{getRoomName(selectedBooking.roomTypeId)}</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {property.currency}{selectedBooking.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                {selectedBooking.payment && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-neutral-500 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      {t.payment.paymentStatus}
                    </h4>
                    <div className={`p-3 rounded-lg ${paymentStatusConfig[selectedBooking.payment.status].bgColor}`}>
                      <div className="flex items-center justify-between">
                        <span className={paymentStatusConfig[selectedBooking.payment.status].color}>
                          {paymentStatusConfig[selectedBooking.payment.status].label}
                        </span>
                        <span className={`font-bold ${paymentStatusConfig[selectedBooking.payment.status].color}`}>
                          {property.currency}{selectedBooking.payment.amount}
                        </span>
                      </div>
                      {selectedBooking.payment.cardLast4 && (
                        <p className="text-sm mt-1 opacity-75">
                          {t.payment.cardEnding} •••• {selectedBooking.payment.cardLast4}
                        </p>
                      )}
                      {selectedBooking.payment.transactionId && (
                        <p className="text-xs mt-1 font-mono opacity-60">
                          {selectedBooking.payment.transactionId}
                        </p>
                      )}
                      {selectedBooking.payment.status === 'paid' && (
                        <p className="text-sm mt-2 opacity-75">
                          {t.payment.remainingOnArrival}: {property.currency}{(selectedBooking.totalPrice - selectedBooking.payment.amount).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                {selectedBooking.specialRequests && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-neutral-500 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {t.booking.specialRequests}
                    </h4>
                    <p className="text-sm text-neutral-600 bg-amber-50 p-3 rounded-lg">
                      {selectedBooking.specialRequests}
                    </p>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-neutral-500">{t.dashboard.status}</span>
                  <Badge 
                    variant="secondary"
                    className={`${statusConfig[selectedBooking.status].bgColor} ${statusConfig[selectedBooking.status].color}`}
                  >
                    {statusConfig[selectedBooking.status].label}
                  </Badge>
                </div>
              </div>

              {selectedBooking.status === 'pending' && (
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setSelectedBooking(null);
                      setActionDialog({ booking: selectedBooking, action: 'cancel' });
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t.dashboard.cancelBooking}
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setSelectedBooking(null);
                      setActionDialog({ booking: selectedBooking, action: 'confirm' });
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {t.dashboard.confirmBooking}
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog !== null} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          {actionDialog && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {actionDialog.action === 'confirm' ? t.dashboard.confirmBooking : t.dashboard.cancelBooking}
                </DialogTitle>
                <DialogDescription>
                  {actionDialog.action === 'confirm'
                    ? `${actionDialog.booking.guestName}?`
                    : `${actionDialog.booking.guestName}?`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setActionDialog(null)}>
                  {t.common.cancel}
                </Button>
                <Button
                  className={actionDialog.action === 'confirm' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                  onClick={() => handleAction(actionDialog.booking, actionDialog.action)}
                >
                  {actionDialog.action === 'confirm' ? t.dashboard.confirmBooking : t.dashboard.cancelBooking}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
