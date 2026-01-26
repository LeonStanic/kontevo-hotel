/**
 * Supabase Database Types
 * 
 * These types match the database schema in supabase-schema.sql
 */

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid_advance' | 'paid_full' | 'refunded';

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          property_id: string;
          room_type_id: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          check_in: string;
          check_out: string;
          guests: number;
          special_requests: string | null;
          total_price: number;
          status: BookingStatus;
          payment_status: PaymentStatus;
          payment_intent_id: string | null;
          amount_paid: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          room_type_id: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          check_in: string;
          check_out: string;
          guests: number;
          special_requests?: string | null;
          total_price: number;
          status?: BookingStatus;
          payment_status?: PaymentStatus;
          payment_intent_id?: string | null;
          amount_paid?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          room_type_id?: string;
          guest_name?: string;
          guest_email?: string;
          guest_phone?: string;
          check_in?: string;
          check_out?: string;
          guests?: number;
          special_requests?: string | null;
          total_price?: number;
          status?: BookingStatus;
          payment_status?: PaymentStatus;
          payment_intent_id?: string | null;
          amount_paid?: number;
          updated_at?: string;
        };
      };
      blocked_dates: {
        Row: {
          id: string;
          property_id: string;
          date: string;
          reason: string;
          room_type_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          date: string;
          reason: string;
          room_type_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          date?: string;
          reason?: string;
          room_type_id?: string | null;
        };
      };
      external_calendars: {
        Row: {
          id: string;
          property_id: string;
          name: string;
          url: string;
          room_type_id: string | null;
          last_synced: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          name: string;
          url: string;
          room_type_id?: string | null;
          last_synced?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          name?: string;
          url?: string;
          room_type_id?: string | null;
          last_synced?: string | null;
          is_active?: boolean;
        };
      };
    };
  };
}
