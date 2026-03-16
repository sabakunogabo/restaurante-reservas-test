import { useEffect, useState } from "preact/hooks";
import useReservationStore from "../../store/reservation-store";
import { format } from "date-fns";
import { ReservationWithDetails } from "@global_model/reservation-with-details";
import { PropsReservationDetailModal } from "@global_interfaces/props-reservation-detail-modal";


export const ReservationDetailModal = ({
  reservationId,
  onClose,
}: PropsReservationDetailModal) => {
  const { fetchReservationById, loading } = useReservationStore();
  const [reservation, setReservation] = useState<ReservationWithDetails | null>(
    null,
  );

  useEffect(() => {
    if (reservationId) {
      fetchReservationById(reservationId).then(setReservation);
    }
  }, [reservationId]);

  if (!reservationId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Detalle de Reserva</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {loading && <p className="text-center">Cargando...</p>}

        {reservation && (
          <div className="space-y-3">
            <p>
              <strong>Cliente:</strong> {reservation.customer.name}
            </p>
            <p>
              <strong>Email:</strong> {reservation.customer.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {reservation.customer.phone}
            </p>
            <p>
              <strong>Mesa:</strong> #{reservation.table.number} (Cap.{" "}
              {reservation.table.capacity})
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {format(new Date(reservation.reservation_date), "dd/MM/yyyy")}
            </p>
            <p>
              <strong>Hora:</strong> {reservation.reservation_time}
            </p>
            {reservation.special_requests && (
              <p>
                <strong>Req. especiales:</strong> {reservation.special_requests}
              </p>
            )}
            <p>
              <strong>Estado:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  reservation.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100"
                }`}
              >
                {reservation.status}
              </span>
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
