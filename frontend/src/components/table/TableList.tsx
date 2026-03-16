import { PropsTableList } from "@global_interfaces/props-table-list";
import { Pencil, Trash } from "lucide-preact";

export const TableList = ({
  tables,
  loading,
  onEdit,
  onDelete,
}: PropsTableList) => {
  if (loading) return <p className="text-center">Cargando mesas...</p>;

  if (tables.length === 0) {
    return <p className="text-gray-600">No hay mesas registradas.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Número</th>
            <th className="px-4 py-2 text-left">Capacidad</th>
            <th className="px-4 py-2 text-left">Ubicación</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="px-4 py-2">{t.number}</td>
              <td className="px-4 py-2">{t.capacity}</td>
              <td className="px-4 py-2">{t.location || "-"}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${t.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {t.is_active ? "Activa" : "Inactiva"}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(t)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(t.id)}
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
