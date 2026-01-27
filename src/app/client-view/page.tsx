import { property } from '@/config/property';
import { PropertyProvider } from '@/context/PropertyContext';
import { 
  ThemedWrapper, 
  Header, 
  Hero, 
  About, 
  Gallery, 
  Rooms, 
  BookingForm, 
  Contact, 
  Footer 
} from '@/components/guest';

export default function ClientViewPage() {
  return (
    <PropertyProvider property={property}>
      <ThemedWrapper theme={property.theme}>
        <Header />
        <main>
          <Hero />
          <About />
          <Gallery />
          <Rooms />
          <BookingForm />
          <Contact />
      </main>
        <Footer />
      </ThemedWrapper>
    </PropertyProvider>
  );
}
