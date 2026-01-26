'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Building2,
  Plus,
  Search,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  ExternalLink,
  Settings,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PropertyOverview, OwnerDashboardSummary } from '@/types/multi-property';

// Demo data - in production this comes from database
const DEMO_PROPERTIES: PropertyOverview[] = [
  {
    id: '1',
    slug: 'vila-ana',
    name: 'Vila Ana',
    status: 'active',
    roomCount: 4,
    upcomingBookings: 8,
    revenueThisMonth: 2340,
    pendingCount: 2,
  },
  {
    id: '2',
    slug: 'apartman-marija',
    name: 'Apartman Marija',
    status: 'active',
    roomCount: 2,
    upcomingBookings: 5,
    revenueThisMonth: 1890,
    pendingCount: 1,
  },
  {
    id: '3',
    slug: 'house-petra',
    name: 'Kuća Petra',
    status: 'active',
    roomCount: 6,
    upcomingBookings: 12,
    revenueThisMonth: 4200,
    pendingCount: 3,
  },
  {
    id: '4',
    slug: 'studio-luka',
    name: 'Studio Luka',
    status: 'active',
    roomCount: 1,
    upcomingBookings: 3,
    revenueThisMonth: 890,
    pendingCount: 0,
  },
  {
    id: '5',
    slug: 'villa-sunset',
    name: 'Villa Sunset',
    status: 'draft',
    roomCount: 5,
    upcomingBookings: 0,
    revenueThisMonth: 0,
    pendingCount: 0,
  },
];

const DEMO_SUMMARY: OwnerDashboardSummary = {
  ownerId: '1',
  propertyCount: 5,
  totalUpcomingBookings: 28,
  totalPending: 6,
  totalRevenueThisMonth: 9320,
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyOverview[]>(DEMO_PROPERTIES);
  const [summary, setSummary] = useState<OwnerDashboardSummary>(DEMO_SUMMARY);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeProperties = properties.filter(p => p.status === 'active').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Aktivno</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Nacrt</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700">Neaktivno</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Moji objekti</h1>
          <p className="text-gray-500 mt-1">Upravljajte svim svojim nekretninama na jednom mjestu</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Dodaj objekt
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ukupno objekata</p>
                <p className="text-3xl font-bold">{summary.propertyCount}</p>
                <p className="text-xs text-gray-400 mt-1">{activeProperties} aktivnih</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Nadolazeće rezervacije</p>
                <p className="text-3xl font-bold">{summary.totalUpcomingBookings}</p>
                <p className="text-xs text-gray-400 mt-1">Svih objekata</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Na čekanju</p>
                <p className="text-3xl font-bold text-amber-600">{summary.totalPending}</p>
                <p className="text-xs text-gray-400 mt-1">Zahtjeva potvrdu</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Prihod ovaj mjesec</p>
                <p className="text-3xl font-bold text-green-600">€{summary.totalRevenueThisMonth.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">Svi objekti</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Pretraži objekte..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {property.slug}.yourdomain.com
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Pregledaj stranicu
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Uredi objekt
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Postavke
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Obriši
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-2">
                {getStatusBadge(property.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{property.roomCount}</p>
                  <p className="text-xs text-gray-500">Soba</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{property.upcomingBookings}</p>
                  <p className="text-xs text-gray-500">Rezervacija</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prihod ovaj mjesec</span>
                  <span className="font-semibold">€{property.revenueThisMonth.toLocaleString()}</span>
                </div>
                {property.pendingCount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-600">Na čekanju</span>
                    <Badge variant="outline" className="text-amber-600 border-amber-200">
                      {property.pendingCount}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/dashboard/property/${property.slug}`}>
                    Upravljaj
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/p/${property.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Property Card */}
        <Card className="border-2 border-dashed hover:border-primary/50 hover:bg-gray-50/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-700">Dodaj novi objekt</h3>
            <p className="text-sm text-gray-500 mt-1">Vila, apartman, kuća...</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Footer */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Ukupna statistika</h3>
              <p className="text-blue-100 text-sm">Svih {summary.propertyCount} objekata</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold">€{summary.totalRevenueThisMonth.toLocaleString()}</p>
                <p className="text-xs text-blue-200">Prihod ovaj mjesec</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{summary.totalUpcomingBookings}</p>
                <p className="text-xs text-blue-200">Nadolazeće rezervacije</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{((summary.totalUpcomingBookings / (summary.propertyCount * 30)) * 100).toFixed(0)}%</p>
                <p className="text-xs text-blue-200">Prosječna zauzetost</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
