import { ConfirmDialog } from "@components/shared/confirm-dialog";
import { PropsDailyReservationsList } from "@global_interfaces/props-daily-reservations-list";
import useReservationStore from "@store/reservation-store";
import { useState } from "preact/hooks";
import toast from "react-hot-toast";

export const DailyReservationsList = ({
  reservations,
  onRefresh,
  onViewDetail,
  onEdit,
}: PropsDailyReservationsList) => {
  const [cancelId, setCancelId] = useState<number | null>(null);
  const { cancelReservation, loading } = useReservationStore();

  const handleCancel = async () => {
    if (!cancelId) return;
    try {
      await cancelReservation(cancelId);
      toast.success("Reserva cancelada");
      onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Error al cancelar");
    } finally {
      setCancelId(null);
    }
  };

  if (reservations.length === 0) {
    return <p className="text-gray-600">No hay reservas para esta fecha.</p>;
  }

  return (
    <>
      <div className="grid gap-4">
        {reservations.map((res) => (
          <div
            key={res.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div
              className="flex-1 cursor-pointer"
              onClick={() => onViewDetail(res.id)}
            >
              <p>
                <strong>Cliente:</strong> {res.customer?.name}
              </p>
              <p>
                <strong>Mesa:</strong> {res.table?.number} (
                {res.table?.capacity} personas)
              </p>
              <p>
                <strong>Hora:</strong> {res.reservation_time}
              </p>
              {res.special_requests && (
                <p>
                  <strong>Especial:</strong> {res.special_requests}
                </p>
              )}
            </div>
            <button
              onClick={() => onEdit(res)}
              className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => setCancelId(res.id)}
              disabled={loading}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 text-sm"
            >
              Cancelar
            </button>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={cancelId !== null}
        title="Cancelar reserva"
        message="¿Estás seguro de que deseas cancelar esta reserva?"
        onConfirm={handleCancel}
        onCancel={() => setCancelId(null)}
      />
    </>
  );
};
