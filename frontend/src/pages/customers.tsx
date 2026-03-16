import { useEffect, useState } from "preact/hooks";
import useReservationStore from "../store/reservation-store";
import { CustomerForm } from "@components/customer/customer-form";
import { CustomerList } from "@components/customer/customer-list";
import { ConfirmDialog } from "@components/shared/confirm-dialog";
import toast from "react-hot-toast";

export const Customers = () => {
  const { customers, fetchCustomers, deleteCustomer, loading } =
    useReservationStore();
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteCustomer(deletingId);
      toast.success("Cliente eliminado");
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gestión de Clientes</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <CustomerForm
            key={editingCustomer?.id || "new"}
            initialData={editingCustomer}
            onSuccess={() => setEditingCustomer(null)}
          />
        </div>
        <div>
          <CustomerList
            customers={customers}
            loading={loading}
            onEdit={setEditingCustomer}
            onDelete={setDeletingId}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={deletingId !== null}
        title="Eliminar cliente"
        message="¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
