import { ReservationWithDetails } from "@global_model/reservation-with-details";

export interface PropsDailyReservationsList {
  reservations: ReservationWithDetails[];
  onRefresh: () => void;
  onViewDetail: (id: number) => void;
  onEdit: (reservation: ReservationWithDetails) => void;
}
