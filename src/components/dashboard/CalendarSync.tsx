'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { ExternalCalendar } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  RefreshCw, 
  Trash2, 
  Copy,
  Check,
  ExternalLink,
  Calendar,
  Link2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { hr, enUS, de, it, sl } from 'date-fns/locale';
import { Locale } from '@/lib/i18n';
import { 
  getExternalCalendars, 
  addExternalCalendar, 
  removeExternalCalendar, 
  updateExternalCalendarSync,
  syncExternalCalendar
} from '@/lib/storage';

const localeMap: Record<Locale, typeof enUS> = {
  hr: hr,
  en: enUS,
  de: de,
  it: it,
  sl: sl,
};

export function CalendarSync() {
  const { property, t, locale } = useProperty();
  const [calendars, setCalendars] = useState<ExternalCalendar[]>(() => getExternalCalendars(property.id));
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<ExternalCalendar | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<string | null>(null);

  // Form state for adding calendar
  const [calendarName, setCalendarName] = useState('');
  const [calendarUrl, setCalendarUrl] = useState('');
  const [calendarRoomId, setCalendarRoomId] = useState<string>('all');

  const dateLocale = localeMap[locale] || enUS;

  // Generate export URL (this would be your actual domain in production)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
  const exportUrl = `${baseUrl}/api/calendar/${property.id}/export.ics`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(exportUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleAddCalendar = () => {
    if (!calendarName || !calendarUrl) return;

    addExternalCalendar({
      propertyId: property.id,
      name: calendarName,
      url: calendarUrl,
      roomTypeId: calendarRoomId === 'all' ? undefined : calendarRoomId,
      isActive: true,
    });

    setCalendars(getExternalCalendars(property.id));
    setShowAddDialog(false);
    setCalendarName('');
    setCalendarUrl('');
    setCalendarRoomId('all');
  };

  const handleRemoveCalendar = (calendar: ExternalCalendar) => {
    removeExternalCalendar(calendar.id);
    setCalendars(getExternalCalendars(property.id));
    setDeleteConfirm(null);
  };

  const handleSyncCalendar = async (calendar: ExternalCalendar) => {
    setSyncingId(calendar.id);
    setSyncError(null);
    setSyncSuccess(null);

    try {
      const result = await syncExternalCalendar(calendar.id);
      if (result.success) {
        updateExternalCalendarSync(calendar.id, new Date().toISOString());
        setCalendars(getExternalCalendars(property.id));
        setSyncSuccess(calendar.id);
        setTimeout(() => setSyncSuccess(null), 3000);
      } else {
        setSyncError(calendar.id);
      }
    } catch (err) {
      setSyncError(calendar.id);
    } finally {
      setSyncingId(null);
    }
  };

  const getRoomName = (roomTypeId?: string) => {
    if (!roomTypeId) return t.dashboard.allRooms;
    const room = property.roomTypes.find(r => r.id === roomTypeId);
    return room?.name || roomTypeId;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">{t.dashboard.calendarSync}</h2>
        <p className="text-sm text-neutral-500 mt-1">
          {t.dashboard.calendarSyncDescription}
        </p>
      </div>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t.dashboard.exportCalendar}
          </CardTitle>
          <CardDescription>
            {t.dashboard.exportDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={exportUrl} 
              readOnly 
              className="font-mono text-sm bg-neutral-50"
            />
            <Button variant="outline" onClick={handleCopyUrl}>
              {copiedUrl ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg space-y-2 text-sm">
            <p className="font-medium text-blue-900">{t.dashboard.howToConnect}</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>{t.dashboard.copyUrl}</li>
              <li>{t.dashboard.gotoCalendarSettings}</li>
              <li>{t.dashboard.findImportSync}</li>
              <li>{t.dashboard.pasteUrlSave}</li>
            </ol>
          </div>

          <div className="text-sm text-neutral-600">
            <p className="font-medium">{t.dashboard.multipleRoomTypes}</p>
            <p>{t.dashboard.exportRoomHint}</p>
            <code className="block mt-1 p-2 bg-neutral-100 rounded text-xs">
              {t.dashboard.exportExample} {exportUrl}?room=studio-apartment
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              {t.dashboard.importCalendars}
            </CardTitle>
            <CardDescription>
              {t.dashboard.importDescription}
            </CardDescription>
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t.dashboard.addExternalCalendar}
          </Button>
        </CardHeader>
        <CardContent>
          {calendars.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <Calendar className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
              <p className="text-neutral-500">{t.dashboard.noExternalCalendars}</p>
              <p className="text-sm text-neutral-400 mt-1">
                {t.dashboard.addCalendarsToSync}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {calendars.map(calendar => (
                <div 
                  key={calendar.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                      <p className="font-medium">{calendar.name}</p>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Badge variant="outline" className="text-xs">
                          {getRoomName(calendar.roomTypeId)}
                        </Badge>
                        {calendar.lastSynced && (
                          <span>
                            {t.dashboard.lastSynced} {format(new Date(calendar.lastSynced), 'd. MMM, HH:mm', { locale: dateLocale })}
                          </span>
                        )}
                        {!calendar.lastSynced && (
                          <span className="text-amber-600">{t.dashboard.never}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {syncSuccess === calendar.id && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="w-3 h-3 mr-1" />
                        {t.dashboard.syncComplete}
                      </Badge>
                    )}
                    {syncError === calendar.id && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {t.dashboard.syncError}
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSyncCalendar(calendar)}
                      disabled={syncingId === calendar.id}
                    >
                      {syncingId === calendar.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      <span className="ml-2 hidden sm:inline">{t.dashboard.syncNow}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setDeleteConfirm(calendar)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.howItWorks}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">↗️ {t.dashboard.export}</h4>
              <p className="text-sm text-green-700">{t.dashboard.syncExplanation.export}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">↙️ {t.dashboard.import}</h4>
              <p className="text-sm text-blue-700">{t.dashboard.syncExplanation.import}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">🔄 {t.dashboard.twoWaySync}</h4>
              <p className="text-sm text-purple-700">{t.dashboard.syncExplanation.twoWay}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">⏱️ {t.dashboard.syncFrequency}</h4>
              <p className="text-sm text-amber-700">{t.dashboard.syncExplanation.frequency}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Calendar Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.dashboard.addExternalCalendar}</DialogTitle>
            <DialogDescription>
              {t.dashboard.enterIcalUrl}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calendar-name">{t.dashboard.calendarName}</Label>
              <Input
                id="calendar-name"
                value={calendarName}
                onChange={(e) => setCalendarName(e.target.value)}
                placeholder="Booking.com, Airbnb..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calendar-url">{t.dashboard.icalUrl}</Label>
              <Input
                id="calendar-url"
                value={calendarUrl}
                onChange={(e) => setCalendarUrl(e.target.value)}
                placeholder="https://..."
              />
              <p className="text-xs text-neutral-500">
                {t.dashboard.findInExportSettings}
              </p>
            </div>

            <div className="space-y-2">
              <Label>{t.dashboard.applyToRoom}</Label>
              <Select value={calendarRoomId} onValueChange={setCalendarRoomId}>
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
            <Button onClick={handleAddCalendar} disabled={!calendarName || !calendarUrl}>
              {t.common.add} {t.dashboard.calendar}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.dashboard.removeCalendar}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.dashboard.removeCalendarDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteConfirm && handleRemoveCalendar(deleteConfirm)}
            >
              {t.common.remove}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
