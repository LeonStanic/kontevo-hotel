'use client';

import { ThemeConfig } from '@/types';
import { ReactNode, useEffect } from 'react';

interface ThemedWrapperProps {
  theme: ThemeConfig;
  children: ReactNode;
}

export function ThemedWrapper({ theme, children }: ThemedWrapperProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primaryColor);
    root.style.setProperty('--theme-secondary', theme.secondaryColor);
    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--theme-font', theme.fontFamily);
    root.style.setProperty('--theme-header-font', theme.headerFont);
  }, [theme]);

  return (
    <div 
      className="min-h-screen"
      style={{ 
        fontFamily: theme.fontFamily,
      }}
    >
      {children}
    </div>
  );
}
