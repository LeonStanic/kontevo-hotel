'use client';

import { useProperty } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export function Hero() {
  const { property, t } = useProperty();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${property.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Direct Booking Banner */}
        <Badge 
          className="mb-6 px-4 py-2 text-sm font-medium animate-pulse"
          style={{ 
            backgroundColor: 'var(--theme-accent)',
            color: 'white'
          }}
        >
          <Star className="w-4 h-4 mr-2 inline" />
          {t.hero.bookDirectSave} {property.directBookingDiscount}%
        </Badge>
        
        {/* Hotel Name */}
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
          style={{ fontFamily: 'var(--theme-header-font)' }}
        >
          {property.hotelName}
        </h1>
        
        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 font-light">
          {property.tagline}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6"
            style={{ 
              backgroundColor: 'var(--theme-accent)',
              color: 'white'
            }}
          >
            <a href="#booking">{t.hero.checkAvailability}</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <a href="#rooms">{t.hero.exploreRooms}</a>
          </Button>
        </div>
        
        {/* Property Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
          <div>
            <span className="block text-2xl font-semibold">{property.roomTypes.length}</span>
            <span className="text-sm">{t.hero.roomTypes}</span>
          </div>
          <div className="border-l border-white/30 pl-8">
            <span className="block text-2xl font-semibold">{t.hero.checkIn}</span>
            <span className="text-sm">{property.checkInTime}</span>
          </div>
          <div className="border-l border-white/30 pl-8">
            <span className="block text-2xl font-semibold">{t.hero.checkOut}</span>
            <span className="text-sm">{property.checkOutTime}</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
