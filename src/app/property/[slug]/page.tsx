'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Property } from '@/types/multi-property';

// In production, this would fetch from database
// For now, we'll show a placeholder

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch property from database by slug
    // For now, simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Demo property data
      setProperty({
        id: '1',
        ownerId: '1',
        slug: slug,
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        tagline: 'Vaš savršeni odmor',
        description: 'Prekrasna nekretnina za nezaboravan boravak.',
        locale: 'hr',
        currency: '€',
        primaryColor: '#1e3a5f',
        secondaryColor: '#3d5a80',
        accentColor: '#ee6c4d',
        checkInTime: '15:00',
        checkOutTime: '11:00',
        directBookingDiscount: 10,
        features: {
          payment: { enabled: false, advancePaymentPercent: 30 },
          emailNotifications: { enabled: true },
          telegram: { enabled: false },
          whatsapp: { enabled: false },
          calendarSync: { enabled: true },
          gallery: { enabled: true },
        },
        status: 'active',
        rooms: [],
        photos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Učitavanje...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Objekt nije pronađen</p>
          <a 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Povratak na početnu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section 
        className="relative h-[60vh] flex items-center justify-center text-white"
        style={{ 
          backgroundColor: property.primaryColor,
          backgroundImage: property.heroImageUrl ? `url(${property.heroImageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <p className="text-lg mb-4 opacity-90">Rezerviraj direktno i uštedi {property.directBookingDiscount}%</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{property.name}</h1>
          {property.tagline && (
            <p className="text-xl md:text-2xl opacity-90">{property.tagline}</p>
          )}
          <div className="mt-8 flex gap-4 justify-center">
            <a 
              href="#booking"
              className="px-8 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: property.accentColor }}
            >
              Rezerviraj
            </a>
            <a 
              href="#rooms"
              className="px-8 py-3 bg-white/20 backdrop-blur rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Pogledaj smještaj
            </a>
          </div>
        </div>
      </section>

      {/* Placeholder content */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">🚧 Stranica u izgradnji</h2>
          <p className="text-gray-600 mb-6">
            Ova stranica će prikazivati punu booking stranicu za <strong>{property.name}</strong>.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 text-left">
            <h3 className="font-semibold mb-2">Property Slug: <code className="bg-blue-100 px-2 py-1 rounded">{slug}</code></h3>
            <p className="text-sm text-gray-600">
              U produkciji, ova stranica će:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
              <li>Učitati podatke o objektu iz baze</li>
              <li>Prikazati galeriju fotografija</li>
              <li>Pokazati dostupne sobe/apartmane</li>
              <li>Omogućiti rezervaciju i plaćanje</li>
            </ul>
          </div>
          <div className="mt-6">
            <a 
              href="/dashboard/properties"
              className="text-blue-600 hover:underline"
            >
              ← Povratak na dashboard
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
