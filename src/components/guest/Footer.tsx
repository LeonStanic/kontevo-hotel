'use client';

import { useProperty } from '@/context/PropertyContext';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const { property, t } = useProperty();

  return (
    <footer 
      className="py-12 px-4 text-white"
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={property.logo}
                  alt={`${property.hotelName} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <span 
                className="text-xl font-semibold"
                style={{ fontFamily: 'var(--theme-header-font)' }}
              >
                {property.hotelName}
              </span>
            </div>
            <p className="text-white/70 text-sm">
              {property.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/70 hover:text-white text-sm transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#rooms" className="text-white/70 hover:text-white text-sm transition-colors">
                  {t.nav.rooms}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white/70 hover:text-white text-sm transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#booking" className="text-white/70 hover:text-white text-sm transition-colors">
                  {t.nav.bookNow}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white text-sm transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contactUs}</h4>
            <address className="not-italic text-white/70 text-sm space-y-2">
              <p>{property.contactInfo.address}</p>
              <p>{property.contactInfo.city}, {property.contactInfo.country}</p>
              <p>
                <a href={`tel:${property.contactInfo.phone}`} className="hover:text-white transition-colors">
                  {property.contactInfo.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${property.contactInfo.email}`} className="hover:text-white transition-colors">
                  {property.contactInfo.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} {property.hotelName}. {t.footer.allRightsReserved}</p>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              {t.nav.ownerLogin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
