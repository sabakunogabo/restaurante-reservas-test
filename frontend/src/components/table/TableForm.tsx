import { PropsTableForm } from "@global_interfaces/props-table-form";
import { FormTableData } from "@global_types/form-table-data";
import useReservationStore from "@store/reservation-store";
import { useEffect } from "preact/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const TableForm = ({ initialData, onSuccess }: PropsTableForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTableData>({
    defaultValues: initialData || {
      number: 0,
      capacity: 2,
      location: "",
      is_active: true,
    },
  });
  const { createTable, updateTable, loading } = useReservationStore();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ number: 0, capacity: 2, location: "", is_active: true });
    }
  }, [initialData]);

  const onSubmit = async (data: FormData) => {
    try {
      if (initialData) {
        await updateTable(initialData.id, data);
        toast.success("Mesa actualizada");
      } else {
        await createTable(data);
        toast.success("Mesa creada");
      }
      onSuccess();
    } catch (error: any) {
      const message = error.response?.data?.detail || "Error al crear mesa";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold mb-4">
        {initialData ? "Editar Mesa" : "Crear Mesa"}
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Número</label>
        <input
          type="number"
          {...register("number", { required: "Número requerido", min: 1 })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.number && (
          <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Capacidad</label>
        <input
          type="number"
          {...register("capacity", { required: "Capacidad requerida", min: 1 })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Ubicación</label>
        <input
          {...register("location")}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input type="checkbox" {...register("is_active")} className="mr-2" />
        <label>Activa</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};
