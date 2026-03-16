import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormCustomerData } from "@global_types/form-customer-data";
import { PropsCustomerForm } from "@global_interfaces/props-customer-form";
import { useEffect } from "preact/hooks";
import useReservationStore from "@store/reservation-store";

export const CustomerForm = ({ initialData, onSuccess }: PropsCustomerForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCustomerData>({
    defaultValues: initialData || { name: "", email: "", phone: "" },
  });
  const { createCustomer, updateCustomer, loading } = useReservationStore();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: "", email: "", phone: "" });
    }
  }, [initialData]);

  const onSubmit = async (data: FormData) => {
    try {
      if (initialData) {
        await updateCustomer(initialData.id, data);
        toast.success("Cliente actualizado");
      } else {
        await createCustomer(data);
        toast.success("Cliente creado");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Error al guardar");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-bold mb-4">
        {initialData ? "Editar Cliente" : "Crear Cliente"}
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre</label>
        <input
          {...register("name", { required: "Nombre requerido" })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email requerido",
            pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
          })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Teléfono</label>
        <input
          {...register("phone")}
          className="w-full px-3 py-2 border rounded-lg"
        />
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
