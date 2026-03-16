export interface ReservationUpdate {
  table_id?: number;
  reservation_date?: string;
  reservation_time?: string;
  special_requests?: string;
  duration_minutes?: number;
  status?: string;
}
