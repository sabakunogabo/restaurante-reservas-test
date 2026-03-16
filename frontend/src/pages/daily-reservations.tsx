import { useState } from "preact/hooks";
import { format } from "date-fns";
import { DailyReservationsList } from "@components/reservation/daily-reservations-list";
import useReservationStore from "@store/reservation-store";
import { ReservationDetailModal } from "@components/reservation/reservation-detail-modal";
import { EditReservationModal } from "@components/reservation/EditReservationModal";
import { ReservationWithDetails } from "@global_model/reservation-with-details";

export const DailyReservations = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);
  const [editingReservation, setEditingReservation] =
    useState<ReservationWithDetails | null>(null);

  const { reservations, fetchDailyReservations, loading } =
    useReservationStore();

  const handleSearch = () => {
    fetchDailyReservations(selectedDate);
  };

  const handleRefresh = () => {
    fetchDailyReservations(selectedDate);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reservas del día</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.currentTarget.value)}
          className="px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && (
        <DailyReservationsList
          reservations={reservations}
          onRefresh={handleRefresh}
          onViewDetail={setSelectedReservationId}
          onEdit={setEditingReservation}
        />
      )}

      <ReservationDetailModal
        reservationId={selectedReservationId}
        onClose={() => setSelectedReservationId(null)}
      />
      <EditReservationModal
        reservation={editingReservation}
        onClose={() => setEditingReservation(null)}
        onUpdated={handleRefresh}
      />
    </div>
  );
};
