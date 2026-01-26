'use client';

import { createContext, useContext, ReactNode } from 'react';
import { PropertyConfig } from '@/types';
import { Locale, Translations, getTranslations } from '@/lib/i18n';

interface PropertyContextType {
  property: PropertyConfig;
  t: Translations;
  locale: Locale;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ 
  children, 
  property 
}: { 
  children: ReactNode; 
  property: PropertyConfig;
}) {
  const locale = property.locale || 'hr';
  const t = getTranslations(locale);
  
  return (
    <PropertyContext.Provider value={{ property, t, locale }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}

// Shorthand hook for translations
export function useTranslations() {
  const { t, locale } = useProperty();
  return { t, locale };
}
