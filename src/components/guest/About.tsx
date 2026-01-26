'use client';

import { useProperty } from '@/context/PropertyContext';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export function About() {
  const { property, t } = useProperty();

  return (
    <section id="about" className="py-20 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-header-font)',
              color: 'var(--theme-primary)'
            }}
          >
            {t.about.welcomeTo} {property.hotelName}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <div>
            <div className="prose prose-lg max-w-none">
              {property.description.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-neutral-600 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="p-6 rounded-xl text-white"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              <MapPin className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-semibold mb-1">{t.contact.address}</h3>
              <p className="text-sm opacity-80">
                {property.contactInfo.city}, {property.contactInfo.country}
              </p>
            </div>
            
            <div 
              className="p-6 rounded-xl text-white"
              style={{ backgroundColor: 'var(--theme-secondary)' }}
            >
              <Clock className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-semibold mb-1">{t.hero.checkIn}/{t.hero.checkOut}</h3>
              <p className="text-sm opacity-80">
                {property.checkInTime} / {property.checkOutTime}
              </p>
            </div>
            
            <div 
              className="p-6 rounded-xl border-2"
              style={{ borderColor: 'var(--theme-primary)' }}
            >
              <Phone 
                className="w-8 h-8 mb-3" 
                style={{ color: 'var(--theme-primary)' }}
              />
              <h3 
                className="font-semibold mb-1"
                style={{ color: 'var(--theme-primary)' }}
              >
                {t.contact.phone}
              </h3>
              <p className="text-sm text-neutral-600">
                {property.contactInfo.phone}
              </p>
            </div>
            
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            >
              <Mail className="w-8 h-8 mb-3 text-white opacity-80" />
              <h3 className="font-semibold mb-1 text-white">{t.contact.email}</h3>
              <p className="text-sm text-white opacity-80 break-all">
                {property.contactInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
