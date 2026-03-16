export type FormReservationData = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  table_id: number;
  reservation_date: string;
  reservation_time: string;
  special_requests?: string;
};
