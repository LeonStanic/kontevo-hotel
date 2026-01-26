'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const { property, t } = useProperty();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#rooms', label: t.nav.rooms },
    { href: '#booking', label: t.nav.bookNow },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Hotel Name */}
          <Link href="#" className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <Image
                src={property.logo}
                alt={`${property.hotelName} logo`}
                fill
                className="object-cover"
              />
            </div>
            <span 
              className="text-lg md:text-xl font-semibold hidden sm:block"
              style={{ 
                fontFamily: 'var(--theme-header-font)',
                color: 'var(--theme-primary)'
              }}
            >
              {property.hotelName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--theme-primary)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Book Now Button (Desktop) */}
          <div className="hidden md:block">
            <Button
              asChild
              className="px-6"
              style={{ 
                backgroundColor: 'var(--theme-accent)',
                color: 'white'
              }}
            >
              <a href="#booking">{t.nav.bookDirect}</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" style={{ color: 'var(--theme-primary)' }} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:opacity-70"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="mt-4"
                  style={{ 
                    backgroundColor: 'var(--theme-accent)',
                    color: 'white'
                  }}
                >
                  <a href="#booking" onClick={() => setIsOpen(false)}>
                    {t.nav.bookDirect}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
