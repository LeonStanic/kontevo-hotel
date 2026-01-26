export type Locale = 'hr' | 'en' | 'de' | 'it' | 'sl';

export interface Translations {
  // Navigation
  nav: {
    about: string;
    gallery: string;
    rooms: string;
    bookNow: string;
    contact: string;
    bookDirect: string;
    ownerLogin: string;
  };
  
  // Hero
  hero: {
    bookDirectSave: string;
    checkAvailability: string;
    exploreRooms: string;
    roomTypes: string;
    checkIn: string;
    checkOut: string;
  };
  
  // About
  about: {
    welcomeTo: string;
  };
  
  // Gallery
  gallery: {
    title: string;
    subtitle: string;
    close: string;
    previous: string;
    next: string;
  };
  
  // Rooms
  rooms: {
    title: string;
    subtitle: string;
    perNight: string;
    upToGuests: string;
    selectRoom: string;
    amenities: string;
    more: string;
  };
  
  // Booking
  booking: {
    title: string;
    subtitle: string;
    checkInDate: string;
    checkOutDate: string;
    selectDates: string;
    selectRoom: string;
    chooseRoom: string;
    guestDetails: string;
    fullName: string;
    email: string;
    phone: string;
    numberOfGuests: string;
    selectGuests: string;
    guest: string;
    guests: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    priceSummary: string;
    nights: string;
    night: string;
    subtotal: string;
    directDiscount: string;
    total: string;
    submitBooking: string;
    submitting: string;
    bookingSuccess: string;
    bookingSuccessMessage: string;
    bookingError: string;
    selectDatesFirst: string;
    selectRoomFirst: string;
    maxGuestsExceeded: string;
  };
  
  // Payment
  payment: {
    title: string;
    subtitle: string;
    advancePayment: string;
    advancePaymentDescription: string;
    payNow: string;
    payOnArrival: string;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    processing: string;
    paymentSuccess: string;
    paymentSuccessMessage: string;
    paymentError: string;
    tryAgain: string;
    securePayment: string;
    testModeNotice: string;
    totalDue: string;
    remainingOnArrival: string;
    paid: string;
    pending: string;
    failed: string;
    refunded: string;
    paymentStatus: string;
    transactionId: string;
    cardEnding: string;
    skipPayment: string;
    skipPaymentNote: string;
  };
  
  // Contact
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    address: string;
    phone: string;
    email: string;
    checkInTime: string;
    checkOutTime: string;
    followUs: string;
    sendMessage: string;
    yourName: string;
    yourEmail: string;
    message: string;
    send: string;
  };
  
  // Footer
  footer: {
    quickLinks: string;
    contactUs: string;
    allRightsReserved: string;
  };
  
  // Dashboard
  dashboard: {
    title: string;
    welcome: string;
    overview: string;
    calendar: string;
    blockedDates: string;
    calendarSync: string;
    calendarSyncDescription: string;
    viewWebsite: string;
    logout: string;
    
    // Stats
    bookingsThisMonth: string;
    revenueThisMonth: string;
    occupancyRate: string;
    pendingReview: string;
    vsLastMonth: string;
    awaitingConfirmation: string;
    allCaughtUp: string;
    
    // Bookings table
    bookings: string;
    allBookings: string;
    pending: string;
    confirmed: string;
    cancelled: string;
    completed: string;
    guest: string;
    room: string;
    checkInDate: string;
    checkOutDate: string;
    guestsCount: string;
    totalPrice: string;
    status: string;
    created: string;
    actions: string;
    noBookings: string;
    viewDetails: string;
    confirmBooking: string;
    cancelBooking: string;
    
    // Blocked dates
    blockedDatesTitle: string;
    blockedDatesSubtitle: string;
    addBlockedDate: string;
    blockDate: string;
    blockDateDescription: string;
    blockReasonPlaceholder: string;
    date: string;
    reason: string;
    reasonPlaceholder: string;
    applyTo: string;
    applyToRoom: string;
    allRooms: string;
    remove: string;
    noBlockedDates: string;
    upcomingBlocked: string;
    pastBlocked: string;
    allBlockedDates: string;
    selectDate: string;
    pickADate: string;
    removeBlockedDate: string;
    removeBlockedDateDescription: string;
    
    // Calendar sync
    calendarSyncTitle: string;
    calendarSyncSubtitle: string;
    exportCalendar: string;
    exportCalendarDesc: string;
    exportDescription: string;
    howToConnect: string;
    copyUrl: string;
    gotoCalendarSettings: string;
    findImportSync: string;
    pasteUrlSave: string;
    multipleRoomTypes: string;
    exportRoomHint: string;
    exportExample: string;
    importCalendars: string;
    importCalendarsDesc: string;
    importDescription: string;
    addCalendar: string;
    addExternalCalendar: string;
    calendarName: string;
    calendarUrl: string;
    icalUrl: string;
    enterIcalUrl: string;
    findInExportSettings: string;
    syncNow: string;
    syncing: string;
    lastSynced: string;
    never: string;
    syncComplete: string;
    syncError: string;
    removeCalendar: string;
    removeCalendarDescription: string;
    noExternalCalendars: string;
    addCalendarsToSync: string;
    howSyncWorks: string;
    howItWorks: string;
    export: string;
    import: string;
    twoWaySync: string;
    syncFrequency: string;
    syncExplanation: {
      export: string;
      import: string;
      twoWay: string;
      frequency: string;
    };
    
    // Login
    ownerDashboardLogin: string;
    propertyId: string;
    password: string;
    login: string;
    loggingIn: string;
    invalidPassword: string;
    demoCredentials: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    reset: string;
    confirm: string;
    yes: string;
    no: string;
    add: string;
    remove: string;
    upcoming: string;
    past: string;
    allRooms: string;
    reason: string;
  };
  
  // Dates
  dates: {
    today: string;
    tomorrow: string;
    yesterday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  
  // Email notifications
  email: {
    // Booking received (pending)
    bookingReceivedSubject: string;
    bookingReceivedTitle: string;
    bookingReceivedMessage: string;
    pendingStatus: string;
    bookingReference: string;
    bookingDetails: string;
    accommodation: string;
    checkIn: string;
    checkOut: string;
    checkInTime: string;
    checkOutTime: string;
    nights: string;
    guests: string;
    priceSummary: string;
    total: string;
    amountPaid: string;
    remainingAmount: string;
    nextSteps: string;
    nextStepsMessage: string;
    
    // Booking confirmed
    bookingConfirmedSubject: string;
    bookingConfirmedTitle: string;
    bookingConfirmedMessage: string;
    confirmedStatus: string;
    yourReservation: string;
    location: string;
    questionsContact: string;
    remainingPaymentNote: string;
    
    // Owner notification
    newBookingSubject: string;
    newBookingTitle: string;
    newBookingMessage: string;
    newBookingAlert: string;
    guestInfo: string;
    specialRequests: string;
    actionRequired: string;
    goToDashboard: string;
  };
  
  // WhatsApp notifications
  whatsapp?: {
    newBookingTitle: string;
    advancePaid: string;
    awaitingPayment: string;
    checkDashboard: string;
    paymentReceived: string;
    totalPrice: string;
    remainingOnArrival: string;
    guestArrivingTomorrow: string;
    checkIn: string;
    collectOnArrival: string;
    bookingConfirmed: string;
    guestNotified: string;
    bookingCancelled: string;
    refundRequired: string;
  };
  
  // Common words (used in WhatsApp messages)
  night?: string;
  nights?: string;
  guest?: string;
  guestPlural?: string;
}

export const translations: Record<Locale, Translations> = {
  // Croatian translations
  hr: {
    nav: {
      about: 'O nama',
      gallery: 'Galerija',
      rooms: 'Smještaj',
      bookNow: 'Rezerviraj',
      contact: 'Kontakt',
      bookDirect: 'Rezerviraj direktno',
      ownerLogin: 'Prijava vlasnika',
    },
    hero: {
      bookDirectSave: 'Rezerviraj direktno i uštedi',
      checkAvailability: 'Provjeri dostupnost',
      exploreRooms: 'Pogledaj smještaj',
      roomTypes: 'Tipova smještaja',
      checkIn: 'Prijava',
      checkOut: 'Odjava',
    },
    about: {
      welcomeTo: 'Dobrodošli u',
    },
    gallery: {
      title: 'Galerija fotografija',
      subtitle: 'Pogledajte naše prostore i okruženje',
      close: 'Zatvori',
      previous: 'Prethodna',
      next: 'Sljedeća',
    },
    rooms: {
      title: 'Naš smještaj',
      subtitle: 'Odaberite savršeni smještaj za vaš boravak',
      perNight: '/noć',
      upToGuests: 'Do {count} gostiju',
      selectRoom: 'Odaberi',
      amenities: 'Sadržaji',
      more: 'još',
    },
    booking: {
      title: 'Rezervacija',
      subtitle: 'Rezervirajte svoj boravak direktno i uštedite',
      checkInDate: 'Datum prijave',
      checkOutDate: 'Datum odjave',
      selectDates: 'Odaberite datume',
      selectRoom: 'Odabir smještaja',
      chooseRoom: 'Odaberite smještaj',
      guestDetails: 'Podaci o gostu',
      fullName: 'Ime i prezime',
      email: 'E-mail adresa',
      phone: 'Broj telefona',
      numberOfGuests: 'Broj gostiju',
      selectGuests: 'Odaberite broj gostiju',
      guest: 'gost',
      guests: 'gostiju',
      specialRequests: 'Posebni zahtjevi',
      specialRequestsPlaceholder: 'Napišite nam ako imate posebne zahtjeve ili želje...',
      priceSummary: 'Pregled cijene',
      nights: 'noći',
      night: 'noć',
      subtotal: 'Međuzbroj',
      directDiscount: 'Popust za direktnu rezervaciju',
      total: 'Ukupno',
      submitBooking: 'Pošalji rezervaciju',
      submitting: 'Slanje...',
      bookingSuccess: 'Rezervacija zaprimljena!',
      bookingSuccessMessage: 'Hvala vam na rezervaciji. Javit ćemo vam se uskoro s potvrdom.',
      bookingError: 'Greška pri slanju rezervacije. Molimo pokušajte ponovo.',
      selectDatesFirst: 'Molimo prvo odaberite datume',
      selectRoomFirst: 'Molimo odaberite smještaj',
      maxGuestsExceeded: 'Maksimalan broj gostiju za ovaj smještaj je {max}',
    },
    payment: {
      title: 'Plaćanje',
      subtitle: 'Sigurno platite predujam za vašu rezervaciju',
      advancePayment: 'Predujam',
      advancePaymentDescription: 'Osigurajte svoju rezervaciju plaćanjem predujma od {percent}%',
      payNow: 'Plati {amount}',
      payOnArrival: 'Preostali iznos plaćate pri dolasku',
      cardNumber: 'Broj kartice',
      cardHolder: 'Ime na kartici',
      expiryDate: 'Datum isteka',
      cvv: 'CVV',
      processing: 'Obrada plaćanja...',
      paymentSuccess: 'Plaćanje uspješno!',
      paymentSuccessMessage: 'Vaš predujam je zaprimljen. Poslali smo vam potvrdu na e-mail.',
      paymentError: 'Plaćanje nije uspjelo',
      tryAgain: 'Pokušajte ponovo',
      securePayment: 'Sigurno plaćanje',
      testModeNotice: 'Demo način - kartica neće biti naplaćena',
      totalDue: 'Ukupno za platiti',
      remainingOnArrival: 'Preostalo za platiti pri dolasku',
      paid: 'Plaćeno',
      pending: 'Čeka plaćanje',
      failed: 'Neuspjelo',
      refunded: 'Vraćeno',
      paymentStatus: 'Status plaćanja',
      transactionId: 'ID transakcije',
      cardEnding: 'Kartica završava na',
      skipPayment: 'Preskoči plaćanje',
      skipPaymentNote: 'Možete platiti cijeli iznos pri dolasku',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Javite nam se za sve informacije',
      getInTouch: 'Kontaktirajte nas',
      address: 'Adresa',
      phone: 'Telefon',
      email: 'E-mail',
      checkInTime: 'Vrijeme prijave',
      checkOutTime: 'Vrijeme odjave',
      followUs: 'Pratite nas',
      sendMessage: 'Pošaljite poruku',
      yourName: 'Vaše ime',
      yourEmail: 'Vaš e-mail',
      message: 'Poruka',
      send: 'Pošalji',
    },
    footer: {
      quickLinks: 'Brze poveznice',
      contactUs: 'Kontakt',
      allRightsReserved: 'Sva prava pridržana.',
    },
    dashboard: {
      title: 'Upravljačka ploča',
      welcome: 'Dobrodošli! Evo što se događa u',
      overview: 'Pregled',
      calendar: 'Kalendar',
      blockedDates: 'Blokirani datumi',
      calendarSync: 'Sinkronizacija',
      calendarSyncDescription: 'Sinhronizirajte dostupnost s Booking.com, Airbnb i drugim platformama',
      viewWebsite: 'Pogledaj web',
      logout: 'Odjava',
      
      bookingsThisMonth: 'Rezervacije ovaj mjesec',
      revenueThisMonth: 'Prihod ovaj mjesec',
      occupancyRate: 'Popunjenost',
      pendingReview: 'Na čekanju',
      vsLastMonth: 'u odnosu na prošli mjesec',
      awaitingConfirmation: 'Čeka potvrdu',
      allCaughtUp: 'Sve je obrađeno!',
      
      bookings: 'Rezervacije',
      allBookings: 'Sve rezervacije',
      pending: 'Na čekanju',
      confirmed: 'Potvrđeno',
      cancelled: 'Otkazano',
      completed: 'Završeno',
      guest: 'Gost',
      room: 'Smještaj',
      checkInDate: 'Prijava',
      checkOutDate: 'Odjava',
      guestsCount: 'Gosti',
      totalPrice: 'Ukupno',
      status: 'Status',
      created: 'Kreirano',
      actions: 'Akcije',
      noBookings: 'Nema rezervacija',
      viewDetails: 'Pregledaj',
      confirmBooking: 'Potvrdi',
      cancelBooking: 'Otkaži',
      
      blockedDatesTitle: 'Blokirani datumi',
      blockedDatesSubtitle: 'Blokirajte datume za održavanje ili osobnu upotrebu',
      addBlockedDate: 'Dodaj blokirani datum',
      blockDate: 'Blokiraj datum',
      blockDateDescription: 'Blokirajte datum za sve ili određeni smještaj',
      blockReasonPlaceholder: 'npr. Održavanje, Osobna upotreba',
      date: 'Datum',
      reason: 'Razlog',
      reasonPlaceholder: 'npr. Održavanje, Osobna upotreba',
      applyTo: 'Primijeni na',
      applyToRoom: 'Primijeni na',
      allRooms: 'Sav smještaj',
      remove: 'Ukloni',
      noBlockedDates: 'Nema blokiranih datuma',
      upcomingBlocked: 'nadolazećih blokiranih',
      pastBlocked: 'prošlih blokiranih',
      allBlockedDates: 'Svi blokirani datumi',
      selectDate: 'Odaberite datum',
      pickADate: 'Odaberite datum',
      removeBlockedDate: 'Ukloni blokirani datum',
      removeBlockedDateDescription: 'Datum će ponovno postati dostupan za rezervacije.',
      
      calendarSyncTitle: 'Sinkronizacija kalendara',
      calendarSyncSubtitle: 'Sinhronizirajte dostupnost s Booking.com, Airbnb i drugim platformama',
      exportCalendar: 'Izvoz kalendara',
      exportCalendarDesc: 'Dodajte ovaj URL na Booking.com, Airbnb ili VRBO',
      exportDescription: 'Dodajte ovaj URL na Booking.com, Airbnb ili VRBO kako biste podijelili svoju dostupnost.',
      howToConnect: 'Kako spojiti:',
      copyUrl: 'Kopiraj URL',
      gotoCalendarSettings: 'Idite na postavke kalendara Booking.com/Airbnb',
      findImportSync: 'Pronađite "Uvezi kalendar" ili "Sinkroniziraj kalendare"',
      pasteUrlSave: 'Zalijepite URL i spremite',
      multipleRoomTypes: 'Više tipova smještaja?',
      exportRoomHint: 'Možete izvesti kalendar za svaki smještaj dodavanjem ?room=ID u URL.',
      exportExample: 'Na primjer:',
      importCalendars: 'Uvoz vanjskih kalendara',
      importCalendarsDesc: 'Uvezite kalendare s Booking.com, Airbnb itd.',
      importDescription: 'Uvezite kalendare s Booking.com-a, Airbnb-a itd. kako biste blokirali te datume ovdje.',
      addCalendar: 'Dodaj kalendar',
      addExternalCalendar: 'Dodaj vanjski kalendar',
      calendarName: 'Naziv kalendara',
      calendarUrl: 'iCal URL',
      icalUrl: 'iCal URL',
      enterIcalUrl: 'Unesite iCal URL s Booking.com-a, Airbnb-a ili druge platforme',
      findInExportSettings: 'Pronađite ovo u postavkama izvoza kalendara platforme',
      syncNow: 'Sinhroniziraj',
      syncing: 'Sinhronizacija...',
      lastSynced: 'Zadnja sinkronizacija',
      never: 'Nikad',
      syncComplete: 'Sinkronizacija dovršena!',
      syncError: 'Greška pri sinkronizaciji',
      removeCalendar: 'Ukloni kalendar',
      removeCalendarDescription: 'Ovo će ukloniti kalendar i sve blokirane datume uvezene iz njega.',
      noExternalCalendars: 'Nema spojenih vanjskih kalendara',
      addCalendarsToSync: 'Dodajte kalendare s Booking.com-a ili Airbnb-a za sinkronizaciju dostupnosti.',
      howSyncWorks: 'Kako sinkronizacija funkcionira',
      howItWorks: 'Kako funkcionira',
      export: 'Izvoz',
      import: 'Uvoz',
      twoWaySync: 'Dvosmjerna sinkronizacija',
      syncFrequency: 'Učestalost sinkronizacije',
      syncExplanation: {
        export: 'Platforme uvoze vaš kalendar kako bi vidjele kada ste zauzeti.',
        import: 'Mi uvozimo njihove kalendare kako bismo blokirali datume rezervirane drugdje.',
        twoWay: 'Povežite oba smjera kako biste u potpunosti spriječili dvostruke rezervacije.',
        frequency: 'Većina platformi osvježava se svakih 1-6 sati.',
      },
      
      ownerDashboardLogin: 'Prijava u upravljačku ploču',
      propertyId: 'ID objekta',
      password: 'Lozinka',
      login: 'Prijava',
      loggingIn: 'Prijavljivanje...',
      invalidPassword: 'Pogrešna lozinka',
      demoCredentials: 'Demo podaci:',
    },
    common: {
      loading: 'Učitavanje...',
      error: 'Greška',
      success: 'Uspješno',
      cancel: 'Odustani',
      save: 'Spremi',
      delete: 'Obriši',
      edit: 'Uredi',
      close: 'Zatvori',
      back: 'Natrag',
      next: 'Dalje',
      previous: 'Prethodno',
      search: 'Pretraži',
      filter: 'Filtriraj',
      reset: 'Poništi',
      confirm: 'Potvrdi',
      yes: 'Da',
      no: 'Ne',
      add: 'Dodaj',
      remove: 'Ukloni',
      upcoming: 'Nadolazeće',
      past: 'Prošlo',
      allRooms: 'Sav smještaj',
      reason: 'Razlog',
    },
    dates: {
      today: 'Danas',
      tomorrow: 'Sutra',
      yesterday: 'Jučer',
      monday: 'Ponedjeljak',
      tuesday: 'Utorak',
      wednesday: 'Srijeda',
      thursday: 'Četvrtak',
      friday: 'Petak',
      saturday: 'Subota',
      sunday: 'Nedjelja',
      january: 'Siječanj',
      february: 'Veljača',
      march: 'Ožujak',
      april: 'Travanj',
      may: 'Svibanj',
      june: 'Lipanj',
      july: 'Srpanj',
      august: 'Kolovoz',
      september: 'Rujan',
      october: 'Listopad',
      november: 'Studeni',
      december: 'Prosinac',
    },
    email: {
      // Booking received (pending)
      bookingReceivedSubject: 'Rezervacija zaprimljena',
      bookingReceivedTitle: 'Hvala na vašoj rezervaciji!',
      bookingReceivedMessage: 'Zaprimili smo vaš zahtjev za rezervaciju. Naš tim će pregledati vašu rezervaciju i uskoro ćete primiti potvrdu.',
      pendingStatus: 'Na čekanju',
      bookingReference: 'Referenca rezervacije',
      bookingDetails: 'Detalji rezervacije',
      accommodation: 'Smještaj',
      checkIn: 'Prijava',
      checkOut: 'Odjava',
      checkInTime: 'Vrijeme prijave',
      checkOutTime: 'Vrijeme odjave',
      nights: 'Noćenja',
      guests: 'Gosti',
      priceSummary: 'Pregled cijene',
      total: 'Ukupno',
      amountPaid: 'Uplaćeni iznos',
      remainingAmount: 'Preostali iznos',
      nextSteps: 'Sljedeći koraci',
      nextStepsMessage: 'Pričekajte potvrdu rezervacije. Javit ćemo vam se putem e-maila čim vaša rezervacija bude potvrđena.',
      
      // Booking confirmed
      bookingConfirmedSubject: 'Rezervacija potvrđena',
      bookingConfirmedTitle: 'Vaša rezervacija je potvrđena!',
      bookingConfirmedMessage: 'Radujemo se vašem dolasku! U nastavku pronađite sve informacije potrebne za vaš boravak.',
      confirmedStatus: 'Potvrđeno',
      yourReservation: 'Vaša rezervacija',
      location: 'Lokacija',
      questionsContact: 'Imate pitanja? Kontaktirajte nas:',
      remainingPaymentNote: 'Preostali iznos od {amount} plaća se pri dolasku.',
      
      // Owner notification
      newBookingSubject: 'Nova rezervacija',
      newBookingTitle: 'Primili ste novu rezervaciju!',
      newBookingMessage: 'Nova rezervacija čeka vašu potvrdu. Pregledajte detalje i potvrdite ili odbijte rezervaciju.',
      newBookingAlert: 'Nova rezervacija',
      guestInfo: 'Podaci o gostu',
      specialRequests: 'Posebni zahtjevi',
      actionRequired: 'Potrebna akcija',
      goToDashboard: 'Idi na upravljačku ploču',
    },
    whatsapp: {
      newBookingTitle: 'Nova rezervacija!',
      advancePaid: 'Ara plaćena',
      awaitingPayment: 'Čeka plaćanje',
      checkDashboard: 'Provjerite upravljačku ploču za potvrdu.',
      paymentReceived: 'Plaćanje primljeno!',
      totalPrice: 'Ukupno',
      remainingOnArrival: 'Ostatak na dolasku',
      guestArrivingTomorrow: 'Gost dolazi sutra!',
      checkIn: 'Prijava',
      collectOnArrival: 'Za naplatiti',
      bookingConfirmed: 'Rezervacija potvrđena',
      guestNotified: 'Gost je obaviješten putem e-maila.',
      bookingCancelled: 'Rezervacija otkazana',
      refundRequired: 'Potreban povrat',
    },
    night: 'noć',
    nights: 'noći',
    guest: 'gost',
    guestPlural: 'gostiju',
  },
  
  // English translations
  en: {
    nav: {
      about: 'About',
      gallery: 'Gallery',
      rooms: 'Rooms',
      bookNow: 'Book Now',
      contact: 'Contact',
      bookDirect: 'Book Direct',
      ownerLogin: 'Owner Login',
    },
    hero: {
      bookDirectSave: 'Book Direct & Save',
      checkAvailability: 'Check Availability',
      exploreRooms: 'Explore Rooms',
      roomTypes: 'Room Types',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
    },
    about: {
      welcomeTo: 'Welcome to',
    },
    gallery: {
      title: 'Photo Gallery',
      subtitle: 'Explore our spaces and surroundings',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
    },
    rooms: {
      title: 'Our Rooms & Suites',
      subtitle: 'Choose from our carefully curated selection of accommodations',
      perNight: '/night',
      upToGuests: 'Up to {count} guests',
      selectRoom: 'Select Room',
      amenities: 'Amenities',
      more: 'more',
    },
    booking: {
      title: 'Book Your Stay',
      subtitle: 'Reserve directly and save on your booking',
      checkInDate: 'Check-in Date',
      checkOutDate: 'Check-out Date',
      selectDates: 'Select dates',
      selectRoom: 'Select Room',
      chooseRoom: 'Choose a room',
      guestDetails: 'Guest Details',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      numberOfGuests: 'Number of Guests',
      selectGuests: 'Select number of guests',
      guest: 'guest',
      guests: 'guests',
      specialRequests: 'Special Requests',
      specialRequestsPlaceholder: 'Let us know if you have any special requests...',
      priceSummary: 'Price Summary',
      nights: 'nights',
      night: 'night',
      subtotal: 'Subtotal',
      directDiscount: 'Direct booking discount',
      total: 'Total',
      submitBooking: 'Submit Booking Request',
      submitting: 'Submitting...',
      bookingSuccess: 'Booking Request Received!',
      bookingSuccessMessage: 'Thank you for your booking. We will contact you shortly with confirmation.',
      bookingError: 'Error submitting booking. Please try again.',
      selectDatesFirst: 'Please select dates first',
      selectRoomFirst: 'Please select a room',
      maxGuestsExceeded: 'Maximum guests for this room is {max}',
    },
    payment: {
      title: 'Payment',
      subtitle: 'Securely pay your advance to confirm your booking',
      advancePayment: 'Advance Payment',
      advancePaymentDescription: 'Secure your booking with a {percent}% advance payment',
      payNow: 'Pay {amount}',
      payOnArrival: 'Remaining balance due on arrival',
      cardNumber: 'Card Number',
      cardHolder: 'Cardholder Name',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      processing: 'Processing payment...',
      paymentSuccess: 'Payment Successful!',
      paymentSuccessMessage: 'Your advance payment has been received. A confirmation has been sent to your email.',
      paymentError: 'Payment Failed',
      tryAgain: 'Try Again',
      securePayment: 'Secure Payment',
      testModeNotice: 'Demo mode - your card will not be charged',
      totalDue: 'Total Due',
      remainingOnArrival: 'Remaining on arrival',
      paid: 'Paid',
      pending: 'Payment Pending',
      failed: 'Failed',
      refunded: 'Refunded',
      paymentStatus: 'Payment Status',
      transactionId: 'Transaction ID',
      cardEnding: 'Card ending in',
      skipPayment: 'Skip Payment',
      skipPaymentNote: 'You can pay the full amount on arrival',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us for any inquiries',
      getInTouch: 'Get in Touch',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      checkInTime: 'Check-in Time',
      checkOutTime: 'Check-out Time',
      followUs: 'Follow Us',
      sendMessage: 'Send a Message',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      message: 'Message',
      send: 'Send Message',
    },
    footer: {
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      allRightsReserved: 'All rights reserved.',
    },
    dashboard: {
      title: 'Dashboard',
      welcome: "Welcome back! Here's what's happening at",
      overview: 'Overview',
      calendar: 'Calendar',
      blockedDates: 'Blocked Dates',
      calendarSync: 'Calendar Sync',
      calendarSyncDescription: 'Sync availability with Booking.com, Airbnb, and other platforms',
      viewWebsite: 'View Website',
      logout: 'Logout',
      
      bookingsThisMonth: 'Bookings This Month',
      revenueThisMonth: 'Revenue This Month',
      occupancyRate: 'Occupancy Rate',
      pendingReview: 'Pending Review',
      vsLastMonth: 'vs last month',
      awaitingConfirmation: 'Awaiting confirmation',
      allCaughtUp: 'All caught up!',
      
      bookings: 'Bookings',
      allBookings: 'All Bookings',
      pending: 'Pending',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      completed: 'Completed',
      guest: 'Guest',
      room: 'Room',
      checkInDate: 'Check-in',
      checkOutDate: 'Check-out',
      guestsCount: 'Guests',
      totalPrice: 'Total',
      status: 'Status',
      created: 'Created',
      actions: 'Actions',
      noBookings: 'No bookings found',
      viewDetails: 'View',
      confirmBooking: 'Confirm',
      cancelBooking: 'Cancel',
      
      blockedDatesTitle: 'Blocked Dates',
      blockedDatesSubtitle: 'Block dates for maintenance or personal use',
      addBlockedDate: 'Add Blocked Date',
      blockDate: 'Block Date',
      blockDateDescription: 'Block a date for all or a specific room',
      blockReasonPlaceholder: 'e.g., Maintenance, Personal use',
      date: 'Date',
      reason: 'Reason',
      reasonPlaceholder: 'e.g., Maintenance, Personal use',
      applyTo: 'Apply to',
      applyToRoom: 'Apply to Room',
      allRooms: 'All Rooms',
      remove: 'Remove',
      noBlockedDates: 'No blocked dates',
      upcomingBlocked: 'upcoming blocked',
      pastBlocked: 'past blocked',
      allBlockedDates: 'All blocked dates',
      selectDate: 'Select Date',
      pickADate: 'Pick a date',
      removeBlockedDate: 'Remove Blocked Date',
      removeBlockedDateDescription: 'This date will become available for bookings again.',
      
      calendarSyncTitle: 'Calendar Sync',
      calendarSyncSubtitle: 'Sync availability with Booking.com, Airbnb, and other platforms',
      exportCalendar: 'Export Your Calendar',
      exportCalendarDesc: 'Add this URL to Booking.com, Airbnb, or VRBO',
      exportDescription: 'Add this URL to Booking.com, Airbnb, or VRBO to share your availability.',
      howToConnect: 'How to connect:',
      copyUrl: 'Copy URL',
      gotoCalendarSettings: 'Go to your Booking.com/Airbnb calendar settings',
      findImportSync: 'Find "Import calendar" or "Sync calendars"',
      pasteUrlSave: 'Paste this URL and save',
      multipleRoomTypes: 'Multiple room types?',
      exportRoomHint: 'You can export a calendar for each room by adding ?room=ID to the URL.',
      exportExample: 'For example:',
      importCalendars: 'Import External Calendars',
      importCalendarsDesc: 'Import calendars from Booking.com, Airbnb, etc.',
      importDescription: 'Import calendars from Booking.com, Airbnb, etc. to block those dates here.',
      addCalendar: 'Add Calendar',
      addExternalCalendar: 'Add External Calendar',
      calendarName: 'Calendar Name',
      calendarUrl: 'iCal URL',
      icalUrl: 'iCal URL',
      enterIcalUrl: 'Enter the iCal URL from Booking.com, Airbnb, or any other platform',
      findInExportSettings: 'Find this in the calendar export settings of the platform',
      syncNow: 'Sync Now',
      syncing: 'Syncing...',
      lastSynced: 'Last synced',
      never: 'Never',
      syncComplete: 'Sync Complete!',
      syncError: 'Sync Error',
      removeCalendar: 'Remove Calendar',
      removeCalendarDescription: 'This will remove the calendar and all blocked dates imported from it.',
      noExternalCalendars: 'No external calendars connected',
      addCalendarsToSync: 'Add calendars from Booking.com or Airbnb to sync availability.',
      howSyncWorks: 'How Calendar Sync Works',
      howItWorks: 'How it works',
      export: 'Export',
      import: 'Import',
      twoWaySync: 'Two-way Sync',
      syncFrequency: 'Sync Frequency',
      syncExplanation: {
        export: 'Platforms import your calendar to see when you\'re booked.',
        import: 'We import their calendars to block dates booked elsewhere.',
        twoWay: 'Connect both directions to fully prevent double bookings.',
        frequency: 'Most platforms refresh every 1-6 hours.',
      },
      
      ownerDashboardLogin: 'Owner Dashboard Login',
      propertyId: 'Property ID',
      password: 'Password',
      login: 'Login',
      loggingIn: 'Logging in...',
      invalidPassword: 'Invalid password',
      demoCredentials: 'Demo credentials:',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      reset: 'Reset',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      add: 'Add',
      remove: 'Remove',
      upcoming: 'Upcoming',
      past: 'Past',
      allRooms: 'All Rooms',
      reason: 'Reason',
    },
    dates: {
      today: 'Today',
      tomorrow: 'Tomorrow',
      yesterday: 'Yesterday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
    },
    email: {
      // Booking received (pending)
      bookingReceivedSubject: 'Booking Received',
      bookingReceivedTitle: 'Thank you for your booking!',
      bookingReceivedMessage: 'We have received your booking request. Our team will review your reservation and you will receive a confirmation shortly.',
      pendingStatus: 'Pending',
      bookingReference: 'Booking Reference',
      bookingDetails: 'Booking Details',
      accommodation: 'Accommodation',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      checkInTime: 'Check-in Time',
      checkOutTime: 'Check-out Time',
      nights: 'Nights',
      guests: 'Guests',
      priceSummary: 'Price Summary',
      total: 'Total',
      amountPaid: 'Amount Paid',
      remainingAmount: 'Remaining Amount',
      nextSteps: 'Next Steps',
      nextStepsMessage: 'Please wait for your booking confirmation. We will email you as soon as your reservation is confirmed.',
      
      // Booking confirmed
      bookingConfirmedSubject: 'Booking Confirmed',
      bookingConfirmedTitle: 'Your booking is confirmed!',
      bookingConfirmedMessage: 'We look forward to your arrival! Below you will find all the information needed for your stay.',
      confirmedStatus: 'Confirmed',
      yourReservation: 'Your Reservation',
      location: 'Location',
      questionsContact: 'Have questions? Contact us:',
      remainingPaymentNote: 'The remaining amount of {amount} is due upon arrival.',
      
      // Owner notification
      newBookingSubject: 'New Booking',
      newBookingTitle: 'You have received a new booking!',
      newBookingMessage: 'A new booking is waiting for your confirmation. Please review the details and confirm or decline the reservation.',
      newBookingAlert: 'New Booking',
      guestInfo: 'Guest Information',
      specialRequests: 'Special Requests',
      actionRequired: 'Action Required',
      goToDashboard: 'Go to Dashboard',
    },
    whatsapp: {
      newBookingTitle: 'New booking!',
      advancePaid: 'Advance paid',
      awaitingPayment: 'Awaiting payment',
      checkDashboard: 'Check your dashboard to confirm.',
      paymentReceived: 'Payment received!',
      totalPrice: 'Total',
      remainingOnArrival: 'Remaining on arrival',
      guestArrivingTomorrow: 'Guest arriving tomorrow!',
      checkIn: 'Check-in',
      collectOnArrival: 'To collect',
      bookingConfirmed: 'Booking confirmed',
      guestNotified: 'Guest has been notified via email.',
      bookingCancelled: 'Booking cancelled',
      refundRequired: 'Refund required',
    },
    night: 'night',
    nights: 'nights',
    guest: 'guest',
    guestPlural: 'guests',
  },

  // German translations
  de: {
    nav: {
      about: 'Über uns',
      gallery: 'Galerie',
      rooms: 'Zimmer',
      bookNow: 'Jetzt buchen',
      contact: 'Kontakt',
      bookDirect: 'Direkt buchen',
      ownerLogin: 'Eigentümer-Login',
    },
    hero: {
      bookDirectSave: 'Direkt buchen & sparen',
      checkAvailability: 'Verfügbarkeit prüfen',
      exploreRooms: 'Zimmer entdecken',
      roomTypes: 'Zimmertypen',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
    },
    about: {
      welcomeTo: 'Willkommen bei',
    },
    gallery: {
      title: 'Fotogalerie',
      subtitle: 'Entdecken Sie unsere Räume und Umgebung',
      close: 'Schließen',
      previous: 'Vorherige',
      next: 'Nächste',
    },
    rooms: {
      title: 'Unsere Zimmer & Suiten',
      subtitle: 'Wählen Sie aus unserer sorgfältig ausgewählten Unterkünfte',
      perNight: '/Nacht',
      upToGuests: 'Bis zu {count} Gäste',
      selectRoom: 'Auswählen',
      amenities: 'Ausstattung',
      more: 'mehr',
    },
    booking: {
      title: 'Ihren Aufenthalt buchen',
      subtitle: 'Buchen Sie direkt und sparen Sie',
      checkInDate: 'Anreisedatum',
      checkOutDate: 'Abreisedatum',
      selectDates: 'Daten auswählen',
      selectRoom: 'Zimmer auswählen',
      chooseRoom: 'Zimmer wählen',
      guestDetails: 'Gästedaten',
      fullName: 'Vollständiger Name',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      numberOfGuests: 'Anzahl der Gäste',
      selectGuests: 'Gästeanzahl auswählen',
      guest: 'Gast',
      guests: 'Gäste',
      specialRequests: 'Besondere Wünsche',
      specialRequestsPlaceholder: 'Teilen Sie uns Ihre besonderen Wünsche mit...',
      priceSummary: 'Preisübersicht',
      nights: 'Nächte',
      night: 'Nacht',
      subtotal: 'Zwischensumme',
      directDiscount: 'Direktbuchungsrabatt',
      total: 'Gesamt',
      submitBooking: 'Buchungsanfrage senden',
      submitting: 'Wird gesendet...',
      bookingSuccess: 'Buchungsanfrage erhalten!',
      bookingSuccessMessage: 'Vielen Dank für Ihre Buchung. Wir werden Sie in Kürze mit einer Bestätigung kontaktieren.',
      bookingError: 'Fehler beim Senden der Buchung. Bitte versuchen Sie es erneut.',
      selectDatesFirst: 'Bitte wählen Sie zuerst die Daten',
      selectRoomFirst: 'Bitte wählen Sie ein Zimmer',
      maxGuestsExceeded: 'Maximale Gästeanzahl für dieses Zimmer ist {max}',
    },
    payment: {
      title: 'Zahlung',
      subtitle: 'Bezahlen Sie Ihre Anzahlung sicher, um Ihre Buchung zu bestätigen',
      advancePayment: 'Anzahlung',
      advancePaymentDescription: 'Sichern Sie Ihre Buchung mit einer Anzahlung von {percent}%',
      payNow: '{amount} bezahlen',
      payOnArrival: 'Restbetrag bei Ankunft fällig',
      cardNumber: 'Kartennummer',
      cardHolder: 'Name des Karteninhabers',
      expiryDate: 'Ablaufdatum',
      cvv: 'CVV',
      processing: 'Zahlung wird verarbeitet...',
      paymentSuccess: 'Zahlung erfolgreich!',
      paymentSuccessMessage: 'Ihre Anzahlung wurde erhalten. Eine Bestätigung wurde an Ihre E-Mail gesendet.',
      paymentError: 'Zahlung fehlgeschlagen',
      tryAgain: 'Erneut versuchen',
      securePayment: 'Sichere Zahlung',
      testModeNotice: 'Demo-Modus - Ihre Karte wird nicht belastet',
      totalDue: 'Gesamtbetrag fällig',
      remainingOnArrival: 'Restbetrag bei Ankunft',
      paid: 'Bezahlt',
      pending: 'Zahlung ausstehend',
      failed: 'Fehlgeschlagen',
      refunded: 'Erstattet',
      paymentStatus: 'Zahlungsstatus',
      transactionId: 'Transaktions-ID',
      cardEnding: 'Karte endend auf',
      skipPayment: 'Zahlung überspringen',
      skipPaymentNote: 'Sie können den vollen Betrag bei Ankunft bezahlen',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Kontaktieren Sie uns für alle Anfragen',
      getInTouch: 'Kontaktaufnahme',
      address: 'Adresse',
      phone: 'Telefon',
      email: 'E-Mail',
      checkInTime: 'Check-in-Zeit',
      checkOutTime: 'Check-out-Zeit',
      followUs: 'Folgen Sie uns',
      sendMessage: 'Nachricht senden',
      yourName: 'Ihr Name',
      yourEmail: 'Ihre E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden',
    },
    footer: {
      quickLinks: 'Schnelllinks',
      contactUs: 'Kontakt',
      allRightsReserved: 'Alle Rechte vorbehalten.',
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Willkommen zurück! Hier ist, was bei',
      overview: 'Übersicht',
      calendar: 'Kalender',
      blockedDates: 'Gesperrte Termine',
      calendarSync: 'Kalender-Sync',
      calendarSyncDescription: 'Verfügbarkeit mit Booking.com, Airbnb und anderen Plattformen synchronisieren',
      viewWebsite: 'Website ansehen',
      logout: 'Abmelden',
      
      bookingsThisMonth: 'Buchungen diesen Monat',
      revenueThisMonth: 'Umsatz diesen Monat',
      occupancyRate: 'Auslastung',
      pendingReview: 'Ausstehende Prüfung',
      vsLastMonth: 'im Vergleich zum Vormonat',
      awaitingConfirmation: 'Wartet auf Bestätigung',
      allCaughtUp: 'Alles erledigt!',
      
      bookings: 'Buchungen',
      allBookings: 'Alle Buchungen',
      pending: 'Ausstehend',
      confirmed: 'Bestätigt',
      cancelled: 'Storniert',
      completed: 'Abgeschlossen',
      guest: 'Gast',
      room: 'Zimmer',
      checkInDate: 'Anreise',
      checkOutDate: 'Abreise',
      guestsCount: 'Gäste',
      totalPrice: 'Gesamt',
      status: 'Status',
      created: 'Erstellt',
      actions: 'Aktionen',
      noBookings: 'Keine Buchungen gefunden',
      viewDetails: 'Ansehen',
      confirmBooking: 'Bestätigen',
      cancelBooking: 'Stornieren',
      
      blockedDatesTitle: 'Gesperrte Termine',
      blockedDatesSubtitle: 'Termine für Wartung oder persönliche Nutzung sperren',
      addBlockedDate: 'Termin sperren',
      blockDate: 'Datum sperren',
      blockDateDescription: 'Sperren Sie ein Datum für alle oder ein bestimmtes Zimmer',
      blockReasonPlaceholder: 'z.B. Wartung, Persönliche Nutzung',
      date: 'Datum',
      reason: 'Grund',
      reasonPlaceholder: 'z.B. Wartung, Persönliche Nutzung',
      applyTo: 'Anwenden auf',
      applyToRoom: 'Anwenden auf Zimmer',
      allRooms: 'Alle Zimmer',
      remove: 'Entfernen',
      noBlockedDates: 'Keine gesperrten Termine',
      upcomingBlocked: 'kommende gesperrte',
      pastBlocked: 'vergangene gesperrte',
      allBlockedDates: 'Alle gesperrten Termine',
      selectDate: 'Datum auswählen',
      pickADate: 'Wählen Sie ein Datum',
      removeBlockedDate: 'Gesperrten Termin entfernen',
      removeBlockedDateDescription: 'Dieses Datum wird wieder für Buchungen verfügbar.',
      
      calendarSyncTitle: 'Kalender-Synchronisation',
      calendarSyncSubtitle: 'Verfügbarkeit mit Booking.com, Airbnb und anderen Plattformen synchronisieren',
      exportCalendar: 'Kalender exportieren',
      exportCalendarDesc: 'Diese URL zu Booking.com, Airbnb oder VRBO hinzufügen',
      exportDescription: 'Fügen Sie diese URL zu Booking.com, Airbnb oder VRBO hinzu, um Ihre Verfügbarkeit zu teilen.',
      howToConnect: 'Verbindung herstellen:',
      copyUrl: 'URL kopieren',
      gotoCalendarSettings: 'Gehen Sie zu Ihren Booking.com/Airbnb Kalendereinstellungen',
      findImportSync: 'Finden Sie "Kalender importieren" oder "Kalender synchronisieren"',
      pasteUrlSave: 'Fügen Sie diese URL ein und speichern Sie',
      multipleRoomTypes: 'Mehrere Zimmertypen?',
      exportRoomHint: 'Sie können einen Kalender für jedes Zimmer exportieren, indem Sie ?room=ID zur URL hinzufügen.',
      exportExample: 'Zum Beispiel:',
      importCalendars: 'Externe Kalender importieren',
      importCalendarsDesc: 'Kalender von Booking.com, Airbnb usw. importieren',
      importDescription: 'Importieren Sie Kalender von Booking.com, Airbnb usw., um diese Daten hier zu sperren.',
      addCalendar: 'Kalender hinzufügen',
      addExternalCalendar: 'Externen Kalender hinzufügen',
      calendarName: 'Kalendername',
      calendarUrl: 'iCal-URL',
      icalUrl: 'iCal-URL',
      enterIcalUrl: 'Geben Sie die iCal-URL von Booking.com, Airbnb oder einer anderen Plattform ein',
      findInExportSettings: 'Finden Sie dies in den Kalender-Exporteinstellungen der Plattform',
      syncNow: 'Jetzt synchronisieren',
      syncing: 'Synchronisierung...',
      lastSynced: 'Zuletzt synchronisiert',
      never: 'Nie',
      syncComplete: 'Synchronisierung abgeschlossen!',
      syncError: 'Synchronisierungsfehler',
      removeCalendar: 'Kalender entfernen',
      removeCalendarDescription: 'Dadurch werden der Kalender und alle importierten gesperrten Daten entfernt.',
      noExternalCalendars: 'Keine externen Kalender verbunden',
      addCalendarsToSync: 'Fügen Sie Kalender von Booking.com oder Airbnb hinzu, um die Verfügbarkeit zu synchronisieren.',
      howSyncWorks: 'Wie die Synchronisation funktioniert',
      howItWorks: 'Wie es funktioniert',
      export: 'Export',
      import: 'Import',
      twoWaySync: 'Bidirektionale Synchronisation',
      syncFrequency: 'Synchronisierungsfrequenz',
      syncExplanation: {
        export: 'Plattformen importieren Ihren Kalender, um zu sehen, wann Sie gebucht sind.',
        import: 'Wir importieren deren Kalender, um anderswo gebuchte Daten zu sperren.',
        twoWay: 'Verbinden Sie beide Richtungen, um Doppelbuchungen vollständig zu verhindern.',
        frequency: 'Die meisten Plattformen aktualisieren alle 1-6 Stunden.',
      },
      
      ownerDashboardLogin: 'Eigentümer-Dashboard-Login',
      propertyId: 'Objekt-ID',
      password: 'Passwort',
      login: 'Anmelden',
      loggingIn: 'Anmeldung...',
      invalidPassword: 'Ungültiges Passwort',
      demoCredentials: 'Demo-Zugangsdaten:',
    },
    common: {
      loading: 'Wird geladen...',
      error: 'Fehler',
      success: 'Erfolg',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      close: 'Schließen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      search: 'Suchen',
      filter: 'Filtern',
      reset: 'Zurücksetzen',
      confirm: 'Bestätigen',
      yes: 'Ja',
      no: 'Nein',
      add: 'Hinzufügen',
      remove: 'Entfernen',
      upcoming: 'Kommend',
      past: 'Vergangen',
      allRooms: 'Alle Zimmer',
      reason: 'Grund',
    },
    dates: {
      today: 'Heute',
      tomorrow: 'Morgen',
      yesterday: 'Gestern',
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag',
      friday: 'Freitag',
      saturday: 'Samstag',
      sunday: 'Sonntag',
      january: 'Januar',
      february: 'Februar',
      march: 'März',
      april: 'April',
      may: 'Mai',
      june: 'Juni',
      july: 'Juli',
      august: 'August',
      september: 'September',
      october: 'Oktober',
      november: 'November',
      december: 'Dezember',
    },
    email: {
      // Booking received (pending)
      bookingReceivedSubject: 'Buchung eingegangen',
      bookingReceivedTitle: 'Vielen Dank für Ihre Buchung!',
      bookingReceivedMessage: 'Wir haben Ihre Buchungsanfrage erhalten. Unser Team wird Ihre Reservierung prüfen und Sie erhalten in Kürze eine Bestätigung.',
      pendingStatus: 'Ausstehend',
      bookingReference: 'Buchungsreferenz',
      bookingDetails: 'Buchungsdetails',
      accommodation: 'Unterkunft',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      checkInTime: 'Check-in Zeit',
      checkOutTime: 'Check-out Zeit',
      nights: 'Nächte',
      guests: 'Gäste',
      priceSummary: 'Preisübersicht',
      total: 'Gesamt',
      amountPaid: 'Bezahlter Betrag',
      remainingAmount: 'Restbetrag',
      nextSteps: 'Nächste Schritte',
      nextStepsMessage: 'Bitte warten Sie auf Ihre Buchungsbestätigung. Wir werden Ihnen eine E-Mail senden, sobald Ihre Reservierung bestätigt ist.',
      
      // Booking confirmed
      bookingConfirmedSubject: 'Buchung bestätigt',
      bookingConfirmedTitle: 'Ihre Buchung ist bestätigt!',
      bookingConfirmedMessage: 'Wir freuen uns auf Ihre Ankunft! Nachfolgend finden Sie alle Informationen für Ihren Aufenthalt.',
      confirmedStatus: 'Bestätigt',
      yourReservation: 'Ihre Reservierung',
      location: 'Standort',
      questionsContact: 'Haben Sie Fragen? Kontaktieren Sie uns:',
      remainingPaymentNote: 'Der Restbetrag von {amount} ist bei Ankunft fällig.',
      
      // Owner notification
      newBookingSubject: 'Neue Buchung',
      newBookingTitle: 'Sie haben eine neue Buchung erhalten!',
      newBookingMessage: 'Eine neue Buchung wartet auf Ihre Bestätigung. Bitte prüfen Sie die Details und bestätigen oder lehnen Sie die Reservierung ab.',
      newBookingAlert: 'Neue Buchung',
      guestInfo: 'Gastinformationen',
      specialRequests: 'Besondere Wünsche',
      actionRequired: 'Aktion erforderlich',
      goToDashboard: 'Zum Dashboard',
    },
    whatsapp: {
      newBookingTitle: 'Neue Buchung!',
      advancePaid: 'Anzahlung bezahlt',
      awaitingPayment: 'Warte auf Zahlung',
      checkDashboard: 'Prüfen Sie Ihr Dashboard zur Bestätigung.',
      paymentReceived: 'Zahlung eingegangen!',
      totalPrice: 'Gesamt',
      remainingOnArrival: 'Rest bei Ankunft',
      guestArrivingTomorrow: 'Gast kommt morgen!',
      checkIn: 'Check-in',
      collectOnArrival: 'Zu kassieren',
      bookingConfirmed: 'Buchung bestätigt',
      guestNotified: 'Der Gast wurde per E-Mail benachrichtigt.',
      bookingCancelled: 'Buchung storniert',
      refundRequired: 'Rückerstattung erforderlich',
    },
    night: 'Nacht',
    nights: 'Nächte',
    guest: 'Gast',
    guestPlural: 'Gäste',
  },

  // Italian translations (abbreviated for brevity - same structure)
  it: {
    nav: { about: 'Chi siamo', gallery: 'Galleria', rooms: 'Camere', bookNow: 'Prenota ora', contact: 'Contatti', bookDirect: 'Prenota diretto', ownerLogin: 'Accesso proprietario' },
    hero: { bookDirectSave: 'Prenota diretto e risparmia', checkAvailability: 'Verifica disponibilità', exploreRooms: 'Esplora le camere', roomTypes: 'Tipi di camera', checkIn: 'Check-in', checkOut: 'Check-out' },
    about: { welcomeTo: 'Benvenuti a' },
    gallery: { title: 'Galleria fotografica', subtitle: 'Esplora i nostri spazi e dintorni', close: 'Chiudi', previous: 'Precedente', next: 'Successiva' },
    rooms: { title: 'Le nostre camere & suite', subtitle: 'Scegli tra la nostra selezione di alloggi', perNight: '/notte', upToGuests: 'Fino a {count} ospiti', selectRoom: 'Seleziona', amenities: 'Servizi', more: 'altro' },
    booking: { title: 'Prenota il tuo soggiorno', subtitle: 'Prenota direttamente e risparmia', checkInDate: 'Data check-in', checkOutDate: 'Data check-out', selectDates: 'Seleziona date', selectRoom: 'Seleziona camera', chooseRoom: 'Scegli una camera', guestDetails: 'Dati ospite', fullName: 'Nome completo', email: 'Indirizzo email', phone: 'Numero di telefono', numberOfGuests: 'Numero di ospiti', selectGuests: 'Seleziona numero ospiti', guest: 'ospite', guests: 'ospiti', specialRequests: 'Richieste speciali', specialRequestsPlaceholder: 'Facci sapere se hai richieste speciali...', priceSummary: 'Riepilogo prezzo', nights: 'notti', night: 'notte', subtotal: 'Subtotale', directDiscount: 'Sconto prenotazione diretta', total: 'Totale', submitBooking: 'Invia richiesta', submitting: 'Invio in corso...', bookingSuccess: 'Richiesta ricevuta!', bookingSuccessMessage: 'Grazie per la tua prenotazione.', bookingError: 'Errore durante l\'invio.', selectDatesFirst: 'Seleziona prima le date', selectRoomFirst: 'Seleziona una camera', maxGuestsExceeded: 'Massimo ospiti: {max}' },
    payment: { title: 'Pagamento', subtitle: 'Paga in modo sicuro l\'acconto per confermare', advancePayment: 'Acconto', advancePaymentDescription: 'Assicura la prenotazione con un acconto del {percent}%', payNow: 'Paga {amount}', payOnArrival: 'Saldo all\'arrivo', cardNumber: 'Numero carta', cardHolder: 'Nome titolare', expiryDate: 'Data scadenza', cvv: 'CVV', processing: 'Elaborazione pagamento...', paymentSuccess: 'Pagamento riuscito!', paymentSuccessMessage: 'Acconto ricevuto. Conferma inviata via email.', paymentError: 'Pagamento fallito', tryAgain: 'Riprova', securePayment: 'Pagamento sicuro', testModeNotice: 'Modalità demo - la carta non sarà addebitata', totalDue: 'Totale dovuto', remainingOnArrival: 'Restante all\'arrivo', paid: 'Pagato', pending: 'In attesa di pagamento', failed: 'Fallito', refunded: 'Rimborsato', paymentStatus: 'Stato pagamento', transactionId: 'ID transazione', cardEnding: 'Carta termina con', skipPayment: 'Salta pagamento', skipPaymentNote: 'Puoi pagare all\'arrivo' },
    contact: { title: 'Contattaci', subtitle: 'Contattaci per qualsiasi informazione', getInTouch: 'Mettiti in contatto', address: 'Indirizzo', phone: 'Telefono', email: 'Email', checkInTime: 'Orario check-in', checkOutTime: 'Orario check-out', followUs: 'Seguici', sendMessage: 'Invia un messaggio', yourName: 'Il tuo nome', yourEmail: 'La tua email', message: 'Messaggio', send: 'Invia messaggio' },
    footer: { quickLinks: 'Link rapidi', contactUs: 'Contatti', allRightsReserved: 'Tutti i diritti riservati.' },
    dashboard: { title: 'Dashboard', welcome: 'Bentornato! Ecco cosa sta succedendo a', overview: 'Panoramica', calendar: 'Calendario', blockedDates: 'Date bloccate', calendarSync: 'Sincronizzazione', calendarSyncDescription: 'Sincronizza disponibilità con Booking.com, Airbnb e altre piattaforme', viewWebsite: 'Vedi sito web', logout: 'Esci', bookingsThisMonth: 'Prenotazioni questo mese', revenueThisMonth: 'Entrate questo mese', occupancyRate: 'Tasso di occupazione', pendingReview: 'In attesa di revisione', vsLastMonth: 'rispetto al mese scorso', awaitingConfirmation: 'In attesa di conferma', allCaughtUp: 'Tutto in ordine!', bookings: 'Prenotazioni', allBookings: 'Tutte le prenotazioni', pending: 'In attesa', confirmed: 'Confermato', cancelled: 'Cancellato', completed: 'Completato', guest: 'Ospite', room: 'Camera', checkInDate: 'Check-in', checkOutDate: 'Check-out', guestsCount: 'Ospiti', totalPrice: 'Totale', status: 'Stato', created: 'Creato', actions: 'Azioni', noBookings: 'Nessuna prenotazione trovata', viewDetails: 'Visualizza', confirmBooking: 'Conferma', cancelBooking: 'Cancella', blockedDatesTitle: 'Date bloccate', blockedDatesSubtitle: 'Blocca date per manutenzione', addBlockedDate: 'Aggiungi data bloccata', blockDate: 'Blocca data', blockDateDescription: 'Blocca una data per tutte o una specifica camera', blockReasonPlaceholder: 'es. Manutenzione', date: 'Data', reason: 'Motivo', reasonPlaceholder: 'es. Manutenzione', applyTo: 'Applica a', applyToRoom: 'Applica a camera', allRooms: 'Tutte le camere', remove: 'Rimuovi', noBlockedDates: 'Nessuna data bloccata', upcomingBlocked: 'blocchi futuri', pastBlocked: 'blocchi passati', allBlockedDates: 'Tutte le date bloccate', selectDate: 'Seleziona data', pickADate: 'Scegli una data', removeBlockedDate: 'Rimuovi data bloccata', removeBlockedDateDescription: 'Questa data tornerà disponibile.', calendarSyncTitle: 'Sincronizzazione calendario', calendarSyncSubtitle: 'Sincronizza con Booking.com, Airbnb', exportCalendar: 'Esporta calendario', exportCalendarDesc: 'Aggiungi questo URL su Booking.com, Airbnb o VRBO', exportDescription: 'Aggiungi questo URL per condividere la disponibilità.', howToConnect: 'Come collegare:', copyUrl: 'Copia URL', gotoCalendarSettings: 'Vai alle impostazioni calendario', findImportSync: 'Trova "Importa calendario"', pasteUrlSave: 'Incolla URL e salva', multipleRoomTypes: 'Più tipi di camera?', exportRoomHint: 'Esporta calendario per camera con ?room=ID', exportExample: 'Esempio:', importCalendars: 'Importa calendari esterni', importCalendarsDesc: 'Importa da Booking.com, Airbnb', importDescription: 'Importa calendari per bloccare date.', addCalendar: 'Aggiungi calendario', addExternalCalendar: 'Aggiungi calendario esterno', calendarName: 'Nome calendario', calendarUrl: 'URL iCal', icalUrl: 'URL iCal', enterIcalUrl: 'Inserisci URL iCal', findInExportSettings: 'Trova nelle impostazioni esportazione', syncNow: 'Sincronizza ora', syncing: 'Sincronizzazione...', lastSynced: 'Ultima sincronizzazione', never: 'Mai', syncComplete: 'Sincronizzazione completata!', syncError: 'Errore sincronizzazione', removeCalendar: 'Rimuovi calendario', removeCalendarDescription: 'Rimuove calendario e date importate.', noExternalCalendars: 'Nessun calendario esterno', addCalendarsToSync: 'Aggiungi calendari per sincronizzare.', howSyncWorks: 'Come funziona', howItWorks: 'Come funziona', export: 'Esporta', import: 'Importa', twoWaySync: 'Sincronizzazione bidirezionale', syncFrequency: 'Frequenza sincronizzazione', syncExplanation: { export: 'Le piattaforme importano il calendario.', import: 'Importiamo i loro calendari per bloccare date.', twoWay: 'Collega entrambe le direzioni.', frequency: 'Le piattaforme aggiornano ogni 1-6 ore.' }, ownerDashboardLogin: 'Accesso dashboard proprietario', propertyId: 'ID proprietà', password: 'Password', login: 'Accedi', loggingIn: 'Accesso in corso...', invalidPassword: 'Password non valida', demoCredentials: 'Credenziali demo:' },
    common: { loading: 'Caricamento...', error: 'Errore', success: 'Successo', cancel: 'Annulla', save: 'Salva', delete: 'Elimina', edit: 'Modifica', close: 'Chiudi', back: 'Indietro', next: 'Avanti', previous: 'Precedente', search: 'Cerca', filter: 'Filtra', reset: 'Resetta', confirm: 'Conferma', yes: 'Sì', no: 'No', add: 'Aggiungi', remove: 'Rimuovi', upcoming: 'Futuro', past: 'Passato', allRooms: 'Tutte le camere', reason: 'Motivo' },
    dates: { today: 'Oggi', tomorrow: 'Domani', yesterday: 'Ieri', monday: 'Lunedì', tuesday: 'Martedì', wednesday: 'Mercoledì', thursday: 'Giovedì', friday: 'Venerdì', saturday: 'Sabato', sunday: 'Domenica', january: 'Gennaio', february: 'Febbraio', march: 'Marzo', april: 'Aprile', may: 'Maggio', june: 'Giugno', july: 'Luglio', august: 'Agosto', september: 'Settembre', october: 'Ottobre', november: 'Novembre', december: 'Dicembre' },
    email: {
      bookingReceivedSubject: 'Prenotazione ricevuta',
      bookingReceivedTitle: 'Grazie per la tua prenotazione!',
      bookingReceivedMessage: 'Abbiamo ricevuto la tua richiesta di prenotazione. Il nostro team esaminerà la tua prenotazione e riceverai una conferma a breve.',
      pendingStatus: 'In attesa',
      bookingReference: 'Riferimento prenotazione',
      bookingDetails: 'Dettagli prenotazione',
      accommodation: 'Alloggio',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      checkInTime: 'Orario check-in',
      checkOutTime: 'Orario check-out',
      nights: 'Notti',
      guests: 'Ospiti',
      priceSummary: 'Riepilogo prezzo',
      total: 'Totale',
      amountPaid: 'Importo pagato',
      remainingAmount: 'Importo rimanente',
      nextSteps: 'Prossimi passi',
      nextStepsMessage: 'Attendi la conferma della prenotazione. Ti invieremo un\'email non appena la tua prenotazione sarà confermata.',
      bookingConfirmedSubject: 'Prenotazione confermata',
      bookingConfirmedTitle: 'La tua prenotazione è confermata!',
      bookingConfirmedMessage: 'Non vediamo l\'ora del tuo arrivo! Di seguito troverai tutte le informazioni per il tuo soggiorno.',
      confirmedStatus: 'Confermata',
      yourReservation: 'La tua prenotazione',
      location: 'Posizione',
      questionsContact: 'Hai domande? Contattaci:',
      remainingPaymentNote: 'L\'importo rimanente di {amount} è dovuto all\'arrivo.',
      newBookingSubject: 'Nuova prenotazione',
      newBookingTitle: 'Hai ricevuto una nuova prenotazione!',
      newBookingMessage: 'Una nuova prenotazione è in attesa della tua conferma. Esamina i dettagli e conferma o rifiuta la prenotazione.',
      newBookingAlert: 'Nuova prenotazione',
      guestInfo: 'Informazioni ospite',
      specialRequests: 'Richieste speciali',
      actionRequired: 'Azione richiesta',
      goToDashboard: 'Vai alla dashboard',
    },
    whatsapp: {
      newBookingTitle: 'Nuova prenotazione!',
      advancePaid: 'Acconto pagato',
      awaitingPayment: 'In attesa di pagamento',
      checkDashboard: 'Controlla la dashboard per confermare.',
      paymentReceived: 'Pagamento ricevuto!',
      totalPrice: 'Totale',
      remainingOnArrival: 'Resto all\'arrivo',
      guestArrivingTomorrow: 'Ospite in arrivo domani!',
      checkIn: 'Check-in',
      collectOnArrival: 'Da riscuotere',
      bookingConfirmed: 'Prenotazione confermata',
      guestNotified: 'L\'ospite è stato notificato via email.',
      bookingCancelled: 'Prenotazione cancellata',
      refundRequired: 'Rimborso richiesto',
    },
    night: 'notte',
    nights: 'notti',
    guest: 'ospite',
    guestPlural: 'ospiti',
  },
  
  // Slovenian translations (abbreviated for brevity - same structure)
  sl: {
    nav: { about: 'O nas', gallery: 'Galerija', rooms: 'Sobe', bookNow: 'Rezerviraj', contact: 'Kontakt', bookDirect: 'Rezerviraj direktno', ownerLogin: 'Prijava lastnika' },
    hero: { bookDirectSave: 'Rezerviraj direktno in prihrani', checkAvailability: 'Preveri razpoložljivost', exploreRooms: 'Raziskuj sobe', roomTypes: 'Tipov sob', checkIn: 'Prijava', checkOut: 'Odjava' },
    about: { welcomeTo: 'Dobrodošli v' },
    gallery: { title: 'Foto galerija', subtitle: 'Raziskujte naše prostore in okolico', close: 'Zapri', previous: 'Prejšnja', next: 'Naslednja' },
    rooms: { title: 'Naše sobe & apartmaji', subtitle: 'Izberite med našo skrbno izbrano ponudbo nastanitev', perNight: '/noč', upToGuests: 'Do {count} gostov', selectRoom: 'Izberi', amenities: 'Oprema', more: 'več' },
    booking: { title: 'Rezervirajte bivanje', subtitle: 'Rezervirajte direktno in prihranite', checkInDate: 'Datum prijave', checkOutDate: 'Datum odjave', selectDates: 'Izberite datume', selectRoom: 'Izbira sobe', chooseRoom: 'Izberite sobo', guestDetails: 'Podatki o gostu', fullName: 'Ime in priimek', email: 'E-poštni naslov', phone: 'Telefonska številka', numberOfGuests: 'Število gostov', selectGuests: 'Izberite število gostov', guest: 'gost', guests: 'gostov', specialRequests: 'Posebne želje', specialRequestsPlaceholder: 'Sporočite nam posebne želje...', priceSummary: 'Pregled cene', nights: 'noči', night: 'noč', subtotal: 'Vmesna vsota', directDiscount: 'Popust za direktno rezervacijo', total: 'Skupaj', submitBooking: 'Pošlji rezervacijo', submitting: 'Pošiljanje...', bookingSuccess: 'Rezervacija prejeta!', bookingSuccessMessage: 'Hvala za rezervacijo.', bookingError: 'Napaka pri pošiljanju.', selectDatesFirst: 'Najprej izberite datume', selectRoomFirst: 'Izberite sobo', maxGuestsExceeded: 'Maksimalno gostov: {max}' },
    payment: { title: 'Plačilo', subtitle: 'Varno plačajte are za potrditev rezervacije', advancePayment: 'Ara', advancePaymentDescription: 'Zagotovite rezervacijo z {percent}% aro', payNow: 'Plačaj {amount}', payOnArrival: 'Preostalo plačate ob prihodu', cardNumber: 'Številka kartice', cardHolder: 'Ime imetnika', expiryDate: 'Datum veljavnosti', cvv: 'CVV', processing: 'Obdelava plačila...', paymentSuccess: 'Plačilo uspešno!', paymentSuccessMessage: 'Ara je prejeta. Potrditev poslana na email.', paymentError: 'Plačilo ni uspelo', tryAgain: 'Poskusi znova', securePayment: 'Varno plačilo', testModeNotice: 'Demo način - kartica ne bo bremenjena', totalDue: 'Skupaj za plačilo', remainingOnArrival: 'Preostanek ob prihodu', paid: 'Plačano', pending: 'Čaka na plačilo', failed: 'Neuspelo', refunded: 'Vrnjeno', paymentStatus: 'Status plačila', transactionId: 'ID transakcije', cardEnding: 'Kartica končuje na', skipPayment: 'Preskoči plačilo', skipPaymentNote: 'Celoten znesek lahko plačate ob prihodu' },
    contact: { title: 'Kontakt', subtitle: 'Kontaktirajte nas za vse informacije', getInTouch: 'Stopite v stik', address: 'Naslov', phone: 'Telefon', email: 'E-pošta', checkInTime: 'Čas prijave', checkOutTime: 'Čas odjave', followUs: 'Sledite nam', sendMessage: 'Pošljite sporočilo', yourName: 'Vaše ime', yourEmail: 'Vaša e-pošta', message: 'Sporočilo', send: 'Pošlji' },
    footer: { quickLinks: 'Hitre povezave', contactUs: 'Kontakt', allRightsReserved: 'Vse pravice pridržane.' },
    dashboard: { title: 'Nadzorna plošča', welcome: 'Dobrodošli nazaj!', overview: 'Pregled', calendar: 'Koledar', blockedDates: 'Blokirani datumi', calendarSync: 'Sinhronizacija', calendarSyncDescription: 'Sinhronizirajte z Booking.com, Airbnb', viewWebsite: 'Oglej spletno stran', logout: 'Odjava', bookingsThisMonth: 'Rezervacije ta mesec', revenueThisMonth: 'Prihodek ta mesec', occupancyRate: 'Stopnja zasedenosti', pendingReview: 'Čaka na pregled', vsLastMonth: 'v primerjavi s prejšnjim mesecem', awaitingConfirmation: 'Čaka na potrditev', allCaughtUp: 'Vse je urejeno!', bookings: 'Rezervacije', allBookings: 'Vse rezervacije', pending: 'V čakanju', confirmed: 'Potrjeno', cancelled: 'Preklicano', completed: 'Zaključeno', guest: 'Gost', room: 'Soba', checkInDate: 'Prijava', checkOutDate: 'Odjava', guestsCount: 'Gosti', totalPrice: 'Skupaj', status: 'Status', created: 'Ustvarjeno', actions: 'Akcije', noBookings: 'Ni najdenih rezervacij', viewDetails: 'Ogled', confirmBooking: 'Potrdi', cancelBooking: 'Prekliči', blockedDatesTitle: 'Blokirani datumi', blockedDatesSubtitle: 'Blokirajte datume za vzdrževanje', addBlockedDate: 'Dodaj blokiran datum', blockDate: 'Blokiraj datum', blockDateDescription: 'Blokirajte datum za vse ali določeno sobo', blockReasonPlaceholder: 'npr. Vzdrževanje', date: 'Datum', reason: 'Razlog', reasonPlaceholder: 'npr. Vzdrževanje', applyTo: 'Uporabi za', applyToRoom: 'Uporabi za sobo', allRooms: 'Vse sobe', remove: 'Odstrani', noBlockedDates: 'Ni blokiranih datumov', upcomingBlocked: 'prihodnjih blokiranih', pastBlocked: 'preteklih blokiranih', allBlockedDates: 'Vsi blokirani datumi', selectDate: 'Izberite datum', pickADate: 'Izberite datum', removeBlockedDate: 'Odstrani blokiran datum', removeBlockedDateDescription: 'Datum bo spet na voljo.', calendarSyncTitle: 'Sinhronizacija koledarja', calendarSyncSubtitle: 'Sinhronizirajte z Booking.com, Airbnb', exportCalendar: 'Izvozi koledar', exportCalendarDesc: 'Dodajte ta URL na Booking.com, Airbnb', exportDescription: 'Dodajte ta URL za deljenje razpoložljivosti.', howToConnect: 'Kako povezati:', copyUrl: 'Kopiraj URL', gotoCalendarSettings: 'Pojdite na nastavitve koledarja', findImportSync: 'Poiščite "Uvozi koledar"', pasteUrlSave: 'Prilepite URL in shranite', multipleRoomTypes: 'Več tipov sob?', exportRoomHint: 'Izvozite koledar za vsako sobo z ?room=ID', exportExample: 'Primer:', importCalendars: 'Uvozi zunanje koledarje', importCalendarsDesc: 'Uvozite iz Booking.com, Airbnb', importDescription: 'Uvozite koledarje za blokiranje datumov.', addCalendar: 'Dodaj koledar', addExternalCalendar: 'Dodaj zunanji koledar', calendarName: 'Ime koledarja', calendarUrl: 'iCal URL', icalUrl: 'iCal URL', enterIcalUrl: 'Vnesite iCal URL', findInExportSettings: 'Najdete v nastavitvah izvoza', syncNow: 'Sinhroniziraj zdaj', syncing: 'Sinhronizacija...', lastSynced: 'Zadnja sinhronizacija', never: 'Nikoli', syncComplete: 'Sinhronizacija končana!', syncError: 'Napaka sinhronizacije', removeCalendar: 'Odstrani koledar', removeCalendarDescription: 'Odstrani koledar in uvožene datume.', noExternalCalendars: 'Ni povezanih zunanjih koledarjev', addCalendarsToSync: 'Dodajte koledarje za sinhronizacijo.', howSyncWorks: 'Kako deluje sinhronizacija', howItWorks: 'Kako deluje', export: 'Izvoz', import: 'Uvoz', twoWaySync: 'Dvosmerna sinhronizacija', syncFrequency: 'Pogostost sinhronizacije', syncExplanation: { export: 'Platforme uvozijo vaš koledar.', import: 'Uvažamo njihove koledarje za blokiranje.', twoWay: 'Povežite oba smeri.', frequency: 'Platforme osvežijo vsakih 1-6 ur.' }, ownerDashboardLogin: 'Prijava v nadzorno ploščo', propertyId: 'ID objekta', password: 'Geslo', login: 'Prijava', loggingIn: 'Prijavljanje...', invalidPassword: 'Neveljavno geslo', demoCredentials: 'Demo podatki:' },
    common: { loading: 'Nalaganje...', error: 'Napaka', success: 'Uspeh', cancel: 'Prekliči', save: 'Shrani', delete: 'Izbriši', edit: 'Uredi', close: 'Zapri', back: 'Nazaj', next: 'Naprej', previous: 'Prejšnje', search: 'Iskanje', filter: 'Filtriraj', reset: 'Ponastavi', confirm: 'Potrdi', yes: 'Da', no: 'Ne', add: 'Dodaj', remove: 'Odstrani', upcoming: 'Prihajajoče', past: 'Preteklo', allRooms: 'Vse sobe', reason: 'Razlog' },
    dates: { today: 'Danes', tomorrow: 'Jutri', yesterday: 'Včeraj', monday: 'Ponedeljek', tuesday: 'Torek', wednesday: 'Sreda', thursday: 'Četrtek', friday: 'Petek', saturday: 'Sobota', sunday: 'Nedelja', january: 'Januar', february: 'Februar', march: 'Marec', april: 'April', may: 'Maj', june: 'Junij', july: 'Julij', august: 'Avgust', september: 'September', october: 'Oktober', november: 'November', december: 'December' },
    email: {
      bookingReceivedSubject: 'Rezervacija prejeta',
      bookingReceivedTitle: 'Hvala za vašo rezervacijo!',
      bookingReceivedMessage: 'Prejeli smo vašo zahtevo za rezervacijo. Naša ekipa bo pregledala vašo rezervacijo in kmalu boste prejeli potrditev.',
      pendingStatus: 'V čakanju',
      bookingReference: 'Referenca rezervacije',
      bookingDetails: 'Podrobnosti rezervacije',
      accommodation: 'Nastanitev',
      checkIn: 'Prijava',
      checkOut: 'Odjava',
      checkInTime: 'Čas prijave',
      checkOutTime: 'Čas odjave',
      nights: 'Noči',
      guests: 'Gosti',
      priceSummary: 'Povzetek cene',
      total: 'Skupaj',
      amountPaid: 'Plačani znesek',
      remainingAmount: 'Preostali znesek',
      nextSteps: 'Naslednji koraki',
      nextStepsMessage: 'Počakajte na potrditev rezervacije. Poslali vam bomo e-pošto, ko bo vaša rezervacija potrjena.',
      bookingConfirmedSubject: 'Rezervacija potrjena',
      bookingConfirmedTitle: 'Vaša rezervacija je potrjena!',
      bookingConfirmedMessage: 'Veselimo se vašega prihoda! Spodaj najdete vse informacije za vaše bivanje.',
      confirmedStatus: 'Potrjeno',
      yourReservation: 'Vaša rezervacija',
      location: 'Lokacija',
      questionsContact: 'Imate vprašanja? Kontaktirajte nas:',
      remainingPaymentNote: 'Preostali znesek {amount} je treba plačati ob prihodu.',
      newBookingSubject: 'Nova rezervacija',
      newBookingTitle: 'Prejeli ste novo rezervacijo!',
      newBookingMessage: 'Nova rezervacija čaka na vašo potrditev. Preglejte podrobnosti in potrdite ali zavrnite rezervacijo.',
      newBookingAlert: 'Nova rezervacija',
      guestInfo: 'Podatki o gostu',
      specialRequests: 'Posebne želje',
      actionRequired: 'Zahtevana akcija',
      goToDashboard: 'Pojdi na nadzorno ploščo',
    },
    whatsapp: {
      newBookingTitle: 'Nova rezervacija!',
      advancePaid: 'Ara plačana',
      awaitingPayment: 'Čaka na plačilo',
      checkDashboard: 'Preverite nadzorno ploščo za potrditev.',
      paymentReceived: 'Plačilo prejeto!',
      totalPrice: 'Skupaj',
      remainingOnArrival: 'Preostanek ob prihodu',
      guestArrivingTomorrow: 'Gost prihaja jutri!',
      checkIn: 'Prijava',
      collectOnArrival: 'Za plačati',
      bookingConfirmed: 'Rezervacija potrjena',
      guestNotified: 'Gost je bil obveščen po e-pošti.',
      bookingCancelled: 'Rezervacija preklicana',
      refundRequired: 'Potrebno vračilo',
    },
    night: 'noč',
    nights: 'noči',
    guest: 'gost',
    guestPlural: 'gostov',
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
}
