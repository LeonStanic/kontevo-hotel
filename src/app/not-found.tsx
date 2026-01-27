import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { property } from '@/config/property';

export default function NotFound() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: property.theme.primaryColor }}
    >
      <div className="text-center text-white">
        <div className="text-9xl font-bold opacity-20 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="opacity-70 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button 
          asChild 
          style={{ backgroundColor: property.theme.accentColor }}
          className="text-white"
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
