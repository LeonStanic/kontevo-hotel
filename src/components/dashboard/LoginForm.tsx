'use client';

import { useState } from 'react';
import { PropertyConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from '@/lib/i18n';

interface LoginFormProps {
  property: PropertyConfig;
  onSuccess: () => void;
}

export function LoginForm({ property, onSuccess }: LoginFormProps) {
  const t = getTranslations(property.locale);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === property.ownerPassword) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`auth-${property.id}`, 'true');
      }
      onSuccess();
    } else {
      setError(t.dashboard.invalidPassword);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-neutral-100">
              <Image
                src={property.logo}
                alt={`${property.hotelName} logo`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <CardTitle className="text-2xl">{property.hotelName}</CardTitle>
          <CardDescription>{t.dashboard.ownerDashboardLogin}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="property">{t.dashboard.propertyId}</Label>
              <Input
                id="property"
                value={property.id}
                disabled
                className="bg-neutral-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t.dashboard.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !password}
            >
              {isLoading ? t.dashboard.loggingIn : t.dashboard.login}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>{t.dashboard.demoCredentials}</strong><br />
              {t.dashboard.propertyId}: <code className="bg-amber-100 px-1 rounded">{property.id}</code><br />
              {t.dashboard.password}: <code className="bg-amber-100 px-1 rounded">{property.ownerPassword}</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
