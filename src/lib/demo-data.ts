import { Booking, BlockedDate } from '@/types';
import { property } from '@/config/property';

// Generate dates relative to today
const today = new Date();
const addDays = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const subtractDays = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const sampleBookings: Booking[] = [
  {
    id: 'booking-001',
    propertyId: property.id,
    roomTypeId: 'one-bedroom',
    guestName: 'Marko Horvat',
    guestEmail: 'marko.h@email.com',
    guestPhone: '+385 91 234 5678',
    checkIn: addDays(3),
    checkOut: addDays(7),
    guests: 2,
    specialRequests: 'Late check-in around 10pm, celebrating anniversary',
    totalPrice: 464,
    status: 'confirmed',
    createdAt: subtractDays(5),
  },
  {
    id: 'booking-002',
    propertyId: property.id,
    roomTypeId: 'penthouse',
    guestName: 'Emma Schmidt',
    guestEmail: 'emma.s@business.de',
    guestPhone: '+49 170 1234567',
    checkIn: addDays(10),
    checkOut: addDays(14),
    guests: 2,
    specialRequests: 'Airport transfer required, vegetarian meal options',
    totalPrice: 1076,
    status: 'pending',
    createdAt: subtractDays(2),
  },
  {
    id: 'booking-003',
    propertyId: property.id,
    roomTypeId: 'two-bedroom',
    guestName: 'The Johnson Family',
    guestEmail: 'johnson.family@email.com',
    guestPhone: '+1 555-0123',
    checkIn: subtractDays(2),
    checkOut: addDays(1),
    guests: 4,
    specialRequests: 'Baby crib needed, high floor preferred',
    totalPrice: 511,
    status: 'confirmed',
    createdAt: subtractDays(10),
  },
  {
    id: 'booking-004',
    propertyId: property.id,
    roomTypeId: 'studio-apartment',
    guestName: 'Ana Kovačević',
    guestEmail: 'ana.k@email.hr',
    guestPhone: '+385 98 765 4321',
    checkIn: addDays(1),
    checkOut: addDays(3),
    guests: 1,
    specialRequests: '',
    totalPrice: 160,
    status: 'pending',
    createdAt: subtractDays(1),
  },
  {
    id: 'booking-005',
    propertyId: property.id,
    roomTypeId: 'one-bedroom',
    guestName: 'Pierre Dubois',
    guestEmail: 'pierre.d@email.fr',
    guestPhone: '+33 6 12 34 56 78',
    checkIn: subtractDays(7),
    checkOut: subtractDays(4),
    guests: 2,
    specialRequests: 'Quiet apartment please',
    totalPrice: 348,
    status: 'completed',
    createdAt: subtractDays(14),
  },
  {
    id: 'booking-006',
    propertyId: property.id,
    roomTypeId: 'two-bedroom',
    guestName: 'Luka Babić',
    guestEmail: 'luka.b@email.com',
    guestPhone: '+385 92 111 2222',
    checkIn: addDays(5),
    checkOut: addDays(8),
    guests: 3,
    specialRequests: '',
    totalPrice: 511,
    status: 'cancelled',
    createdAt: subtractDays(3),
  },
  {
    id: 'booking-007',
    propertyId: property.id,
    roomTypeId: 'penthouse',
    guestName: 'Sarah O\'Brien',
    guestEmail: 's.obrien@email.ie',
    guestPhone: '+353 87 123 4567',
    checkIn: addDays(15),
    checkOut: addDays(18),
    guests: 2,
    specialRequests: 'Honeymoon - champagne on arrival',
    totalPrice: 807,
    status: 'pending',
    createdAt: subtractDays(2),
  },
  {
    id: 'booking-008',
    propertyId: property.id,
    roomTypeId: 'studio-apartment',
    guestName: 'Marco Rossi',
    guestEmail: 'marco.r@email.it',
    guestPhone: '+39 333 1234567',
    checkIn: addDays(2),
    checkOut: addDays(5),
    guests: 1,
    specialRequests: 'Early check-in if possible',
    totalPrice: 240,
    status: 'confirmed',
    createdAt: subtractDays(4),
  },
];

export const sampleBlockedDates: BlockedDate[] = [
  {
    id: 'block-001',
    propertyId: property.id,
    date: addDays(20),
    reason: 'Maintenance - HVAC service',
    roomTypeId: 'penthouse',
  },
  {
    id: 'block-002',
    propertyId: property.id,
    date: addDays(21),
    reason: 'Maintenance - HVAC service',
    roomTypeId: 'penthouse',
  },
  {
    id: 'block-003',
    propertyId: property.id,
    date: addDays(25),
    reason: 'Owner personal use',
  },
  {
    id: 'block-004',
    propertyId: property.id,
    date: addDays(26),
    reason: 'Owner personal use',
  },
];
