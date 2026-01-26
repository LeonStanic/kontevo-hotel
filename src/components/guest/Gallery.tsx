'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Gallery() {
  const { property, t } = useProperty();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? property.propertyPhotos.length - 1 : selectedIndex - 1
    );
  };
  
  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === property.propertyPhotos.length - 1 ? 0 : selectedIndex + 1
    );
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-header-font)',
              color: 'var(--theme-primary)'
            }}
          >
            {t.gallery.title}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.propertyPhotos.map((photo, index) => (
            <div
              key={index}
              className={`relative cursor-pointer group overflow-hidden rounded-xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                <Image
                  src={photo}
                  alt={`${property.hotelName} photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-medium">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black border-none">
          <div className="relative">
            {selectedIndex !== null && (
              <div className="relative aspect-video">
                <Image
                  src={property.propertyPhotos[selectedIndex]}
                  alt={`${property.hotelName} photo ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            
            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            
            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {selectedIndex !== null && `${selectedIndex + 1} / ${property.propertyPhotos.length}`}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
