import { ReservationWithDetails } from "@global_model/reservation-with-details";

export interface PropsEditReservationModal {
  reservation: ReservationWithDetails | null;
  onClose: () => void;
  onUpdated: () => void;
}
