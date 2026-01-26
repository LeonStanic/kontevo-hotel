'use client';

import { useProperty } from '@/context/PropertyContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

export function Contact() {
  const { property, t } = useProperty();

  return (
    <section id="contact" className="py-20 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-header-font)',
              color: 'var(--theme-primary)'
            }}
          >
            {t.contact.title}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Address */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{t.contact.address}</h3>
              <p className="text-sm text-neutral-600">
                {property.contactInfo.address}<br />
                {property.contactInfo.city}<br />
                {property.contactInfo.country}
              </p>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'var(--theme-secondary)' }}
              >
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{t.contact.phone}</h3>
              <a 
                href={`tel:${property.contactInfo.phone}`}
                className="text-sm hover:underline"
                style={{ color: 'var(--theme-primary)' }}
              >
                {property.contactInfo.phone}
              </a>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{t.contact.email}</h3>
              <a 
                href={`mailto:${property.contactInfo.email}`}
                className="text-sm hover:underline break-all"
                style={{ color: 'var(--theme-primary)' }}
              >
                {property.contactInfo.email}
              </a>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-neutral-800"
              >
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{t.hero.checkIn}/{t.hero.checkOut}</h3>
              <p className="text-sm text-neutral-600">
                {t.contact.checkInTime}: {property.checkInTime}<br />
                {t.contact.checkOutTime}: {property.checkOutTime}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media */}
        {property.contactInfo.socialMedia && (
          <div className="mt-12 text-center">
            <h3 className="font-semibold mb-4">{t.contact.followUs}</h3>
            <div className="flex justify-center gap-4">
              {property.contactInfo.socialMedia.facebook && (
                <a
                  href={property.contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              )}
              {property.contactInfo.socialMedia.instagram && (
                <a
                  href={property.contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: 'var(--theme-secondary)' }}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              )}
              {property.contactInfo.socialMedia.twitter && (
                <a
                  href={property.contactInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
