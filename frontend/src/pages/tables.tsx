import { ConfirmDialog } from "@components/shared/confirm-dialog";
import { TableForm } from "@components/table/TableForm";
import { TableList } from "@components/table/TableList";
import useReservationStore from "@store/reservation-store";
import { useEffect, useState } from "preact/hooks";
import toast from "react-hot-toast";

export const Tables = () => {
  const { tables, fetchTables, deleteTable, loading } = useReservationStore();
  const [editingTable, setEditingTable] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteTable(deletingId);
      toast.success("Mesa eliminada correctamente");
      fetchTables();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gestión de Mesas</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <TableForm
            key={editingTable?.id || "new"}
            initialData={editingTable}
            onSuccess={() => setEditingTable(null)}
          />
        </div>
        <div>
          <TableList
            tables={tables}
            loading={loading}
            onEdit={setEditingTable}
            onDelete={setDeletingId}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={deletingId !== null}
        title="Eliminar mesa"
        message="¿Estás seguro de eliminar esta mesa? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
