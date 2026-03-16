import { PropsCustomerList } from "@global_interfaces/props-customer-list";
import { Pencil, Trash } from "lucide-preact";
export const CustomerList = ({
  customers,
  loading,
  onEdit,
  onDelete,
}: PropsCustomerList) => {
  if (loading) return <p className="text-center">Cargando clientes...</p>;

  if (customers.length === 0) {
    return <p className="text-gray-600">No hay clientes registrados.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Registro</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.email}</td>
              <td className="px-4 py-2">{c.phone || "-"}</td>
              <td className="px-4 py-2">
                {new Date(c.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
