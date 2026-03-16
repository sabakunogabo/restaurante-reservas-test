import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FormReservationData } from "@global_types/form-reservation-data";
import { LoadingSpinner } from "@components/shared/loading-spinner";
import useReservationStore from "@store/reservation-store";

export const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormReservationData>();
  const { tables, fetchTables, createReservation, loading } =
    useReservationStore();

  useEffect(() => {
    fetchTables();
  }, []);

  const onSubmit = async (data: FormReservationData) => {
    try {
      const payload = {
        ...data,
        table_id: Number(data.table_id),
      };

      await createReservation(payload);
      toast.success("Reserva creada exitosamente");
      reset();
    } catch (error: any) {
      if (
        error.response?.status === 422 &&
        Array.isArray(error.response.data?.detail)
      ) {
        error.response.data.detail.forEach((err: any) => {
          const field = err.loc[err.loc.length - 1];

          if (field in data) {
            setError(field as keyof FormReservationData, {
              type: "server",
              message: err.msg,
            });
          }
        });
        toast.error("Por favor, corrige los errores en el formulario");
      } else {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Error al crear reserva";
        toast.error(message);
      }
    }
  };

  if (loading && tables.length === 0) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Reservar Mesa</h2>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre del cliente</label>
        <input
          {...register("customer_name", { required: "El nombre es requerido" })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.customer_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.customer_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          {...register("customer_email", {
            required: "El email es requerido",
            pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
          })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.customer_email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.customer_email.message}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Teléfono</label>
        <input
          {...register("customer_phone", {
            required: "El teléfono es requerido",
            minLength: {
              value: 7,
              message: "El teléfono debe tener al menos 7 caracteres",
            },
          })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.customer_phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.customer_phone.message}
          </p>
        )}
      </div>

      {/* Mesa */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Mesa</label>
        <select
          {...register("table_id", { required: "Selecciona una mesa" })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione una mesa</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              Mesa {table.number} - Capacidad {table.capacity}{" "}
              {table.location && `(${table.location})`}
            </option>
          ))}
        </select>
        {errors.table_id && (
          <p className="text-red-500 text-sm mt-1">{errors.table_id.message}</p>
        )}
      </div>

      {/* Fecha */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha</label>
        <input
          type="date"
          {...register("reservation_date", {
            required: "La fecha es requerida",
          })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.reservation_date && (
          <p className="text-red-500 text-sm mt-1">
            {errors.reservation_date.message}
          </p>
        )}
      </div>

      {/* Hora */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Hora</label>
        <input
          type="time"
          {...register("reservation_time", {
            required: "La hora es requerida",
          })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.reservation_time && (
          <p className="text-red-500 text-sm mt-1">
            {errors.reservation_time.message}
          </p>
        )}
      </div>

      {/* Requerimientos especiales */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Requerimientos especiales
        </label>
        <textarea
          {...register("special_requests")}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
      >
        {loading ? "Reservando..." : "Reservar"}
      </button>
    </form>
  );
};
