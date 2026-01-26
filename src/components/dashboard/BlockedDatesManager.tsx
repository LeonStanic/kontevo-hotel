'use client';

import { useState, useMemo } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { BlockedDate } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Plus, 
  Trash2, 
  CalendarIcon,
  Ban,
  Filter
} from 'lucide-react';
import { format, isBefore, isAfter, startOfDay } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';
import { Locale } from '@/lib/i18n';
import { addBlockedDate, removeBlockedDate } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface BlockedDatesManagerProps {
  blockedDates: BlockedDate[];
  onUpdate: () => void;
}

const localeMap: Record<Locale, typeof enUS> = {
  hr: hr,
  en: enUS,
  de: de,
  it: it,
  sl: sl,
};

export function BlockedDatesManager({ blockedDates, onUpdate }: BlockedDatesManagerProps) {
  const { property, t, locale } = useProperty();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<BlockedDate | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  // Form state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState('');
  const [roomTypeId, setRoomTypeId] = useState<string>('all');

  const dateLocale = localeMap[locale] || enUS;
  const today = startOfDay(new Date());

  const filteredDates = useMemo(() => {
    return blockedDates
      .filter(blocked => {
        const date = new Date(blocked.date);
        if (filter === 'upcoming') return isAfter(date, today) || format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
        if (filter === 'past') return isBefore(date, today);
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [blockedDates, filter, today]);

  const handleAdd = () => {
    if (!selectedDate || !reason) return;

    addBlockedDate({
      propertyId: property.id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      reason,
      roomTypeId: roomTypeId === 'all' ? undefined : roomTypeId,
    });

    setShowAddDialog(false);
    setSelectedDate(undefined);
    setReason('');
    setRoomTypeId('all');
    onUpdate();
  };

  const handleDelete = (blocked: BlockedDate) => {
    removeBlockedDate(blocked.id);
    setDeleteConfirm(null);
    onUpdate();
  };

  const getRoomName = (roomTypeId?: string) => {
    if (!roomTypeId) return t.dashboard.allRooms;
    const room = property.roomTypes.find(r => r.id === roomTypeId);
    return room?.name || roomTypeId;
  };

  const upcomingCount = blockedDates.filter(b => {
    const date = new Date(b.date);
    return isAfter(date, today) || format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">{t.dashboard.blockedDates}</h2>
          <p className="text-sm text-neutral-500">
            {upcomingCount} {t.dashboard.upcomingBlocked}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-[130px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.dashboard.allBlockedDates}</SelectItem>
              <SelectItem value="upcoming">{t.common.upcoming}</SelectItem>
              <SelectItem value="past">{t.common.past}</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t.dashboard.blockDate}
          </Button>
        </div>
      </div>

      {/* Blocked Dates List */}
      <div className="grid gap-3">
        {filteredDates.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Ban className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-500">{t.dashboard.noBlockedDates}</p>
            </CardContent>
          </Card>
        ) : (
          filteredDates.map((blocked) => {
            const date = new Date(blocked.date);
            const isPast = isBefore(date, today);

            return (
              <Card key={blocked.id} className={cn(isPast && 'opacity-60')}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className={cn(
                        'w-12 h-12 rounded-lg flex flex-col items-center justify-center',
                        isPast ? 'bg-neutral-100' : 'bg-red-100'
                      )}
                    >
                      <span className={cn(
                        'text-xs font-medium',
                        isPast ? 'text-neutral-500' : 'text-red-600'
                      )}>
                        {format(date, 'MMM', { locale: dateLocale })}
                      </span>
                      <span className={cn(
                        'text-lg font-bold',
                        isPast ? 'text-neutral-700' : 'text-red-700'
                      )}>
                        {format(date, 'd')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{blocked.reason}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getRoomName(blocked.roomTypeId)}
                        </Badge>
                        {isPast && (
                          <Badge variant="secondary" className="text-xs">
                            {t.common.past}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setDeleteConfirm(blocked)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.dashboard.blockDate}</DialogTitle>
            <DialogDescription>
              {t.dashboard.blockDateDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t.dashboard.selectDate}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !selectedDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'd. MMMM yyyy', { locale: dateLocale }) : t.dashboard.pickADate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < today}
                    initialFocus
                    locale={dateLocale}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">{t.dashboard.reason}</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.dashboard.blockReasonPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.dashboard.applyTo}</Label>
              <Select value={roomTypeId} onValueChange={setRoomTypeId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.dashboard.allRooms}</SelectItem>
                  {property.roomTypes.map(room => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleAdd} disabled={!selectedDate || !reason}>
              {t.dashboard.blockDate}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.dashboard.removeBlockedDate}</DialogTitle>
            <DialogDescription>
              {t.dashboard.removeBlockedDateDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              {t.common.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              {t.common.remove}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
