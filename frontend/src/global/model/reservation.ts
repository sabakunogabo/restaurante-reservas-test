export interface Reservation {
  id: number;
  customer_id: number;
  table_id: number;
  reservation_date: string;
  reservation_time: string;
  special_requests: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}
