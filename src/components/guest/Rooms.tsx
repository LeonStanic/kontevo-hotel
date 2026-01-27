'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { RoomType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';

function RoomCard({ room, onBook }: { room: RoomType; onBook: () => void }) {
  const { property, t } = useProperty();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % room.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + room.photos.length) % room.photos.length);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Photo Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.photos[currentPhoto]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {room.photos.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {room.photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentPhoto ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Price Badge */}
        <div 
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-semibold"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        >
          {property.currency}{room.price}{t.rooms.perNight}
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle 
              className="text-xl"
              style={{ 
                fontFamily: 'var(--theme-header-font)',
                color: 'var(--theme-primary)'
              }}
            >
              {room.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Users className="w-4 h-4" />
              {t.rooms.upToGuests.replace('{count}', room.maxGuests.toString())}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-neutral-600 text-sm line-clamp-2">
          {room.description}
        </p>
        
        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1">
          {room.amenities.slice(0, 4).map((amenity, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 4} {t.rooms.more}
            </Badge>
          )}
        </div>
        
        <Button
          className="w-full"
          onClick={onBook}
          style={{ 
            backgroundColor: 'var(--theme-primary)',
            color: 'white'
          }}
        >
          {t.rooms.selectRoom}
        </Button>
      </CardContent>
    </Card>
  );
}

function RoomDetailDialog({ 
  room, 
  isOpen, 
  onClose, 
  onBook 
}: { 
  room: RoomType | null; 
  isOpen: boolean; 
  onClose: () => void;
  onBook: () => void;
}) {
  const { property, t } = useProperty();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle 
            className="text-2xl"
            style={{ 
              fontFamily: 'var(--theme-header-font)',
              color: 'var(--theme-primary)'
            }}
          >
            {room.name}
          </DialogTitle>
        </DialogHeader>
        
        {/* Photo Gallery */}
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={room.photos[currentPhoto]}
            alt={room.name}
            fill
            className="object-cover"
          />
          {room.photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setCurrentPhoto((prev) => (prev - 1 + room.photos.length) % room.photos.length)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setCurrentPhoto((prev) => (prev + 1) % room.photos.length)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
        
        {/* Thumbnails */}
        {room.photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {room.photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhoto(idx)}
                className={`relative w-20 h-14 rounded-md overflow-hidden flex-shrink-0 ${
                  idx === currentPhoto ? 'ring-2' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ ['--tw-ring-color' as string]: 'var(--theme-primary)' } as React.CSSProperties}
              >
                <Image src={photo} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
        
        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <Users className="w-5 h-5" />
              <span>{t.rooms.upToGuests.replace('{count}', room.maxGuests.toString())}</span>
            </div>
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--theme-primary)' }}
            >
              {property.currency}{room.price}
              <span className="text-sm font-normal text-neutral-500">{t.rooms.perNight}</span>
            </div>
          </div>
          
          <p className="text-neutral-600">{room.description}</p>
          
          {/* All Amenities */}
          <div>
            <h4 className="font-semibold mb-2">{t.rooms.amenities}</h4>
            <div className="grid grid-cols-2 gap-2">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
          
          <Button
            className="w-full"
            size="lg"
            onClick={onBook}
            style={{ 
              backgroundColor: 'var(--theme-accent)',
              color: 'white'
            }}
          >
            {t.rooms.selectRoom}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Rooms() {
  const { property, t } = useProperty();
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const handleBookRoom = (roomId: string) => {
    // Scroll to booking section with the room pre-selected
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to pre-select room
      window.dispatchEvent(new CustomEvent('selectRoom', { detail: roomId }));
    }
    setSelectedRoom(null);
  };

  return (
    <section id="rooms" className="py-20 px-4 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-header-font)',
              color: 'var(--theme-primary)'
            }}
          >
            {t.rooms.title}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {t.rooms.subtitle}
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
        </div>

        {/* Room Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {property.roomTypes.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={() => handleBookRoom(room.id)}
            />
          ))}
        </div>
      </div>

      {/* Room Detail Dialog */}
      <RoomDetailDialog
        room={selectedRoom}
        isOpen={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        onBook={() => selectedRoom && handleBookRoom(selectedRoom.id)}
      />
    </section>
  );
}
