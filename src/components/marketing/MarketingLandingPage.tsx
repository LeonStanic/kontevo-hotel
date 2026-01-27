'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Calendar,
  CreditCard,
  Bell,
  BarChart3,
  Globe,
  Smartphone,
  MessageCircle,
  Mail,
  Check,
  ChevronRight,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Building2,
  CalendarCheck,
  Phone,
  Send,
  Play,
  CheckCircle2,
  X,
  Menu,
  ExternalLink,
} from 'lucide-react';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  highlight = false 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  highlight?: boolean;
}) => (
  <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${highlight ? 'border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white' : 'border border-gray-200 bg-white'}`}>
    <CardContent className="p-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${highlight ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      {highlight && (
        <Badge className="absolute top-4 right-4 bg-emerald-500">Popular</Badge>
      )}
    </CardContent>
  </Card>
);

// Pricing card component
const PricingCard = ({
  name,
  price,
  monthlyPrice,
  description,
  features,
  highlighted = false,
  ctaText = 'Kontaktirajte nas',
}: {
  name: string;
  price: string;
  monthlyPrice?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}) => (
  <Card className={`relative overflow-hidden transition-all duration-300 ${highlighted ? 'border-2 border-emerald-500 shadow-2xl scale-105 bg-white' : 'border border-gray-200 bg-white hover:shadow-lg'}`}>
    {highlighted && (
      <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white text-center py-2 text-sm font-medium">
        Najpopularniji izbor
      </div>
    )}
    <CardHeader className={`${highlighted ? 'pt-12' : 'pt-6'} pb-4`}>
      <CardTitle className="text-xl font-bold text-gray-900">{name}</CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
      <div className="mt-4">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {price !== 'Po dogovoru' && <span className="text-gray-500 ml-2">jednokratno</span>}
      </div>
      {monthlyPrice && (
        <div className="mt-2">
          <span className="text-xl font-semibold text-gray-700">+ {monthlyPrice}</span>
          <span className="text-gray-500 ml-2">/ mjesečno</span>
        </div>
      )}
    </CardHeader>
    <CardContent className="pt-0">
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className={`w-full ${highlighted ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-900 hover:bg-gray-800'}`}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {ctaText}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
);

// Demo preview component
const DemoPreview = ({ 
  title, 
  description, 
  imageSrc, 
  features,
  reverse = false 
}: {
  title: string;
  description: string;
  imageSrc: string;
  features: string[];
  reverse?: boolean;
}) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
    <div className="flex-1 space-y-6">
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex-1 w-full">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 flex items-center gap-2 px-4">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full mt-8 object-cover"
        />
      </div>
    </div>
  </div>
);

// Testimonial component
const Testimonial = ({
  quote,
  author,
  role,
  avatar,
  rating = 5,
}: {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating?: number;
}) => (
  <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">&quot;{quote}&quot;</p>
      <div className="flex items-center gap-4">
        <img 
          src={avatar} 
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// FAQ Item component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 pr-8">{question}</span>
        <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export function MarketingLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormStatus({
        loading: false,
        success: false,
        error: 'Ime i email su obavezni.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        loading: false,
        success: false,
        error: 'Nevažeća email adresa.',
      });
      return;
    }

    setFormStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({
          loading: false,
          success: true,
          error: null,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: '',
          message: '',
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setFormStatus({
          loading: false,
          success: false,
          error: data.error || 'Došlo je do greške. Molimo pokušajte ponovno.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        loading: false,
        success: false,
        error: 'Došlo je do greške. Molimo pokušajte ponovno.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Kontevo</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-900 transition-colors">Značajke</button>
              <button onClick={() => scrollToSection('demo')} className="text-gray-600 hover:text-gray-900 transition-colors">Demo</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-900 transition-colors">Cijene</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Kontakt
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-gray-600">Značajke</button>
            <button onClick={() => scrollToSection('demo')} className="block w-full text-left py-2 text-gray-600">Demo</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-gray-600">Cijene</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-gray-600">FAQ</button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Kontakt
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                <Zap className="w-3 h-3 mr-1" />
                Novo: Telegram obavijesti potpuno besplatne
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Vlastita booking
                <span className="text-emerald-500"> web stranica </span>
                bez provizija
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Prestanite plaćati 15-20% provizije Booking.com-u i Airbnb-u. 
                Dobijte profesionalnu web stranicu s online rezervacijama, 
                plaćanjima i automatskim obavijestima — sve pod vašom kontrolom.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-6"
                  onClick={() => scrollToSection('demo')}
                >
                  Pogledajte demo
                  <Play className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-gray-300"
                  onClick={() => scrollToSection('contact')}
                >
                  Zatražite ponudu
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Bez mjesečnih naknada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Potpuna kontrola</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <img 
                    src="/demo-screenshots/demo-04-dashboard.png" 
                    alt="Kontevo Booking System Preview"
                    className="w-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                <AnimatedCounter end={15} suffix="%" />
              </div>
              <p className="text-gray-400">Prosječna ušteda na provizijama</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                24/7
              </div>
              <p className="text-gray-400">Automatske rezervacije</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                <AnimatedCounter end={5} suffix=" min" />
              </div>
              <p className="text-gray-400">Setup vrijeme</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-gray-400">Vaša kontrola</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Zašto vlasnici smještaja biraju Kontevo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Booking platforme uzimaju previše. Vrijeme je za promjenu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Problem */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-700">
                  <X className="w-6 h-6" />
                  Problemi s OTA platformama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    'Provizije od 15-20% po rezervaciji',
                    'Nemogućnost direktne komunikacije s gostima',
                    'Složena pravila otkazivanja',
                    'Ovisnost o tuđoj platformi',
                    'Teško gradite vlastitu bazu gostiju',
                    'Ograničene mogućnosti prilagodbe',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                  Kontevo rješenje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    'Nula provizija — jednorazni trošak',
                    'Direktan kontakt s gostima od prve sekunde',
                    'Vaša vlastita pravila rezervacija',
                    'Web stranica potpuno pod vašom kontrolom',
                    'Gradite vlastitu bazu lojalnih gostiju',
                    'Potpuno prilagodljivo vašem brendu',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700">Sve što trebate</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kompletno rješenje za direktne rezervacije
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sve značajke potrebne za profesionalno upravljanje smještajem — bez kompliciranih integracija.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Calendar}
              title="Online rezervacije"
              description="Prihvaćajte rezervacije 24/7 s automatskom provjerom dostupnosti i blokiranjem datuma."
              highlight
            />
            <FeatureCard
              icon={CreditCard}
              title="Online plaćanja"
              description="Naplatite avans ili puni iznos online. Sigurno, jednostavno, bez komplikacija."
            />
            <FeatureCard
              icon={Bell}
              title="Telegram obavijesti"
              description="Besplatne instant obavijesti na mobitel za nove rezervacije, plaćanja i podsjetnike."
            />
            <FeatureCard
              icon={Globe}
              title="Višejezična podrška"
              description="Automatski prikaz na hrvatskom, engleskom, njemačkom, talijanskom ili slovenskom."
            />
            <FeatureCard
              icon={CalendarCheck}
              title="Sinkronizacija kalendara"
              description="Povezivanje s Booking.com, Airbnb i ostalim platformama za izbjegavanje duplikata."
            />
            <FeatureCard
              icon={BarChart3}
              title="Dashboard s analitikom"
              description="Pratite rezervacije, prihode, popunjenost i trendove na jednom mjestu."
            />
            <FeatureCard
              icon={Mail}
              title="Email obavijesti"
              description="Automatski emailovi gostima s potvrdom rezervacije i svim potrebnim informacijama."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobilno prilagođeno"
              description="Savršen izgled na svim uređajima — desktop, tablet i mobitel."
            />
            <FeatureCard
              icon={Shield}
              title="Sigurno i pouzdano"
              description="Zaštićen pristup dashboardu, sigurna obrada plaćanja, pouzdani serveri."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700">Interaktivni prikaz</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pogledajte kako to funkcionira
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Od atraktivne web stranice do moćnog dashboarda — sve što dobivate s Kontevo sustavom.
            </p>
          </div>

          <div className="space-y-24">
            <DemoPreview
              title="Profesionalna web stranica za goste"
              description="Moderna, brza i potpuno prilagodljiva web stranica koja prikazuje vaš smještaj u najboljem svjetlu. Potpuno responzivna za sve uređaje."
              imageSrc="/demo-screenshots/demo-01-hero.png"
              features={[
                'Atraktivan hero odjeljak s vašim fotografijama',
                'Galerija s lightbox pregledom',
                'Detaljan prikaz soba i apartmana',
                'Integrirana forma za rezervacije',
                'Kontakt informacije i karta',
              ]}
            />

            <DemoPreview
              title="Prikaz soba i apartmana"
              description="Svaka soba prikazana s profesionalnim fotografijama, detaljnim opisom, listom sadržaja i cijenom. Gosti mogu lako usporediti opcije."
              imageSrc="/demo-screenshots/demo-02-rooms.png"
              features={[
                'Karusel fotografija za svaku sobu',
                'Lista sadržaja (WiFi, klima, TV...)',
                'Cijena po noćenju s popustom za direktnu rezervaciju',
                'Maksimalan broj gostiju',
                'Detaljan opis u modalnom prozoru',
              ]}
              reverse
            />

            <DemoPreview
              title="Jednostavan proces rezervacije"
              description="Korak-po-korak rezervacija koja vodi goste kroz odabir datuma, sobe, unos podataka i opcionalnu uplatu. Sve u par minuta."
              imageSrc="/demo-screenshots/demo-03-booking.png"
              features={[
                'Odabir datuma s kalendarom',
                'Automatska provjera dostupnosti',
                'Izračun ukupne cijene s popustom',
                'Forma za podatke gosta',
                'Opcija online plaćanja avansa',
              ]}
            />

            <DemoPreview
              title="Moćan dashboard za vlasnike"
              description="Sve što trebate za upravljanje rezervacijama na jednom mjestu. Pregled statistika, potvrđivanje rezervacija, blokiranje datuma i više."
              imageSrc="/demo-screenshots/demo-04-dashboard.png"
              features={[
                'Pregled ukupnih statistika (rezervacije, prihod, popunjenost)',
                'Lista svih rezervacija s filterima',
                'Kalendarski prikaz zauzetosti',
                'Blokiranje datuma za održavanje',
                'Sinkronizacija s vanjskim kalendarima',
              ]}
              reverse
            />
          </div>

          <div className="mt-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Isprobajte demo uživo
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Pogledajte kako izgleda stranica za goste i kako funkcionira dashboard za vlasnike.
                  Demo koristi testne podatke — slobodno eksperimentirajte!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6"
                  onClick={() => window.open('/', '_blank')}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Web stranica za goste
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-6"
                  onClick={() => window.open('/dashboard', '_blank')}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Dashboard za vlasnike
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Demo lozinka za dashboard: <code className="bg-gray-700 text-emerald-400 px-2 py-1 rounded">kontevo2024</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700">Integracije</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Povezano sa svime što koristite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sinkronizirajte kalendar s postojećim platformama i primajte obavijesti gdje god želite.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">B</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Booking.com</h3>
              <p className="text-sm text-gray-600">iCal sinkronizacija kalendara</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-500">A</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Airbnb</h3>
              <p className="text-sm text-gray-600">iCal sinkronizacija kalendara</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sky-100 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Telegram</h3>
              <p className="text-sm text-gray-600">Besplatne instant obavijesti</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-600">Business API obavijesti</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700">Transparentne cijene</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Bez provizija po rezervaciji
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jednokratna investicija za izradu + simbolična mjesečna naknada za održavanje i podršku.
              <br />
              <span className="text-emerald-600 font-medium">Nema skrivenih troškova. Nema provizija.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              name="Standard"
              price="€1.000"
              monthlyPrice="€50"
              description="Kompletno rješenje za jedan objekt"
              highlighted
              features={[
                'Profesionalna web stranica s rezervacijama',
                'Neograničen broj soba/apartmana',
                'Online plaćanja (opciono)',
                'Email obavijesti',
                'Telegram obavijesti (besplatno)',
                'WhatsApp obavijesti (opciono)',
                'Sinkronizacija kalendara (Booking, Airbnb)',
                'Dashboard s analitikom',
                'Prilagođeni dizajn po vašem brendu',
                'Tehnička podrška i održavanje',
                'Redovita ažuriranja sustava',
              ]}
              ctaText="Zatražite ponudu"
            />

            <PricingCard
              name="Enterprise"
              price="Po dogovoru"
              description="Za više objekata ili agencije"
              features={[
                'Sve iz Standard paketa',
                'Multi-property dashboard',
                'Jedinstveni kalendar za sve objekte',
                'Konsolidirano izvještavanje prihoda',
                'Poddomena ili zasebna domena po objektu',
                'Custom integracije po potrebi',
                'Prioritetna tehnička podrška',
                'Dedicated account manager',
                'SLA garancija dostupnosti',
              ]}
              ctaText="Kontaktirajte nas"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Niste sigurni koji paket vam treba? Razgovarajmo!
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Zatražite besplatnu konzultaciju
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700">Zadovoljni korisnici</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Što kažu naši klijenti
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              quote="Od kad koristim Kontevo, uštedio sam preko 3.000€ godišnje na provizijama. Direktne rezervacije čine sada 60% mog prometa."
              author="Marko Horvat"
              role="Vlasnik apartmana, Split"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            />
            <Testimonial
              quote="Telegram obavijesti su fantastične! Dobijem odmah notification kad netko rezervira, a sve je potpuno besplatno."
              author="Ana Kovačević"
              role="Vlasnica B&B, Dubrovnik"
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />
            <Testimonial
              quote="Profesionalna web stranica koja izgleda bolje od većine hotela. Gosti često komentiraju kako im je lako bilo rezervirati."
              author="Ivan Babić"
              role="Vlasnik vila, Istra"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700">FAQ</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Često postavljana pitanja
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            <FAQItem
              question="Trebam li tehničko znanje za korištenje sustava?"
              answer="Ne! Sustav je dizajniran za jednostavno korištenje. Dashboard je intuitivan, a mi brinemo o svim tehničkim aspektima postavljanja i održavanja."
            />
            <FAQItem
              question="Mogu li i dalje koristiti Booking.com i Airbnb?"
              answer="Apsolutno! Kontevo se savršeno integrira s postojećim platformama kroz iCal sinkronizaciju kalendara. Tako izbjegavate duple rezervacije."
            />
            <FAQItem
              question="Kako funkcionira online plaćanje?"
              answer="Koristimo sigurnu integraciju za obradu kartica. Možete naplatiti avans (npr. 30%) ili puni iznos. Novac ide direktno na vaš račun."
            />
            <FAQItem
              question="Koliko dugo traje izrada stranice?"
              answer="Tipično 3-5 radnih dana od trenutka kada dobijemo sve materijale (fotografije, opise, podatke). U hitnim slučajevima možemo i brže."
            />
            <FAQItem
              question="Što ako želim promjene nakon lansiranja?"
              answer="Manje promjene (tekstovi, cijene, fotografije) možete sami napraviti kroz dashboard. Za veće izmjene dizajna, tu smo za vas uz dogovorenu naknadu."
            />
            <FAQItem
              question="Je li moguće imati stranicu na više jezika?"
              answer="Da! Sustav automatski podržava hrvatski, engleski, njemački, talijanski i slovenski. Stranica se prikazuje na jeziku pretraživača posjetitelja."
            />
            <FAQItem
              question="Što se događa ako mi treba pomoć?"
              answer="Svaki paket uključuje period podrške. Tijekom tog vremena smo dostupni za sva pitanja i pomoć. Nakon toga, podrška je dostupna uz simboličnu mjesečnu naknadu."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Kontaktirajte nas
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Spremni za vlastitu booking stranicu?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Ispunite formu i javit ćemo vam se unutar 24 sata s besplatnom konzultacijom 
                i prijedlogom rješenja prilagođenog vašim potrebama.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">info@kontevo.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telefon</p>
                    <p className="text-white font-medium">+385 91 196 2005</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telegram</p>
                    <p className="text-white font-medium">@kontevo</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                {formStatus.success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Hvala vam na upitu!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Vaš upit je uspješno poslan. Javit ćemo vam se unutar 24 sata.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFormStatus({ loading: false, success: false, error: null })}
                    >
                      Pošalji novi upit
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {formStatus.error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-600">{formStatus.error}</p>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Ime i prezime *</Label>
                      <Input 
                        id="name" 
                        placeholder="Ivan Horvat"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, name: e.target.value }));
                          if (formStatus.error) {
                            setFormStatus(prev => ({ ...prev, error: null }));
                          }
                        }}
                        className="mt-1.5"
                        required
                        disabled={formStatus.loading}
                      />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="ivan@email.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, email: e.target.value }));
                            if (formStatus.error) {
                              setFormStatus(prev => ({ ...prev, error: null }));
                            }
                          }}
                          className="mt-1.5"
                          required
                          disabled={formStatus.loading}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input 
                          id="phone" 
                          placeholder="+385 91 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1.5"
                          disabled={formStatus.loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="propertyType">Tip smještaja</Label>
                        <Input 
                          id="propertyType" 
                          placeholder="Apartman, vila, B&B..."
                          value={formData.propertyType}
                          onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                          className="mt-1.5"
                          disabled={formStatus.loading}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Poruka (opcionalno)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Opišite vaš smještaj i što vas zanima..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="mt-1.5 min-h-[120px]"
                        disabled={formStatus.loading}
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Šalje se...
                        </>
                      ) : (
                        <>
                          Pošalji upit
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      Odgovaramo unutar 24 sata. Vaši podaci su sigurni.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Prestanite plaćati provizije. Počnite danas.
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Pridružite se vlasnicima koji su već uštedjeli tisuće eura prelaskom na vlastitu booking stranicu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => scrollToSection('contact')}
            >
              Zatražite ponudu
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => window.open('/dashboard', '_blank')}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Isprobajte dashboard
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-emerald-200 text-sm">
            Demo lozinka: <code className="bg-white/20 px-2 py-1 rounded">kontevo2024</code>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">Kontevo</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privatnost</a>
              <a href="#" className="hover:text-white transition-colors">Uvjeti korištenja</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
            </div>

            <p className="text-sm">
              © 2026 Kontevo. Sva prava pridržana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MarketingLandingPage;
