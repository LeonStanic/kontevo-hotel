'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Ban,
  RefreshCw,
  LogOut,
  Menu,
  ExternalLink,
  Home
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { property } from '@/config/property';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: 'overview' | 'calendar' | 'blocked' | 'sync';
  onTabChange: (tab: 'overview' | 'calendar' | 'blocked' | 'sync') => void;
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const { property: prop, t } = useProperty();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview' as const, label: t.dashboard.overview, icon: LayoutDashboard },
    { id: 'calendar' as const, label: t.dashboard.calendar, icon: CalendarDays },
    { id: 'blocked' as const, label: t.dashboard.blockedDates, icon: Ban },
    { id: 'sync' as const, label: t.dashboard.calendarSync, icon: RefreshCw },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(`auth-${property.id}`);
    }
    router.push('/dashboard');
    router.refresh();
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={prop.logo}
              alt={`${prop.hotelName} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm truncate">{prop.hotelName}</h2>
            <p className="text-xs text-neutral-500">{t.dashboard.title}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === item.id
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          asChild
        >
          <Link href="/" target="_blank">
            <Home className="w-4 h-4" />
            {t.dashboard.viewWebsite}
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {t.dashboard.logout}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r flex-col">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center px-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-2 ml-4">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={prop.logo}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-sm truncate">{prop.hotelName}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
