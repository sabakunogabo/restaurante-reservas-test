import { PropsEditReservationModal } from "@global_interfaces/props-edit-reservation-modal-data";
import { FormEditReservationModalData } from "@global_types/form-edit-reservation-modal-data";
import useReservationStore from "@store/reservation-store";
import { useEffect } from "preact/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const EditReservationModal = ({
  reservation,
  onClose,
  onUpdated,
}: PropsEditReservationModal) => {
  const { tables, fetchTables, updateReservation, loading } =
    useReservationStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormEditReservationModalData>();

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    if (reservation) {
      reset({
        table_id: reservation.table_id,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        special_requests: reservation.special_requests || "",
      });
    }
  }, [reservation]);

  const onSubmit = async (data: FormData) => {
    if (!reservation) return;
    try {
      await updateReservation(reservation.id, data);
      toast.success("Reserva actualizada");
      onUpdated();
      onClose();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail) && detail.length > 0) {
          toast.error(detail[0].msg);
        } else {
          toast.error("Error de validación");
        }
      } else {
        toast.error(error.message || "Error al actualizar");
      }
    }
  };

  if (!reservation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Editar Reserva</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mesa</label>
            <select
              {...register("table_id", { required: "Seleccione una mesa" })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Seleccione...</option>
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  Mesa {t.number} - Cap. {t.capacity}{" "}
                  {t.location && `(${t.location})`}
                </option>
              ))}
            </select>
            {errors.table_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.table_id.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              {...register("reservation_date", { required: "Fecha requerida" })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Hora</label>
            <input
              type="time"
              {...register("reservation_time", { required: "Hora requerida" })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Requerimientos especiales
            </label>
            <textarea
              {...register("special_requests")}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
