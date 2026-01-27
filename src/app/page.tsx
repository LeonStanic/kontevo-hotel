import { MarketingLandingPage } from '@/components/marketing';

export const metadata = {
  title: 'Kontevo - Vlastita Booking Web Stranica bez Provizija',
  description: 'Profesionalna web stranica za direktne rezervacije. Bez provizija, bez mjesečnih naknada. Online rezervacije, plaćanja, Telegram obavijesti i više.',
  openGraph: {
    title: 'Kontevo - Vlastita Booking Web Stranica bez Provizija',
    description: 'Prestanite plaćati 15-20% provizije. Dobijte profesionalnu booking stranicu s online rezervacijama i automatskim obavijestima.',
    type: 'website',
  },
};

export default function HomePage() {
  return <MarketingLandingPage />;
}
