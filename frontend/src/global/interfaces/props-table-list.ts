import { Table } from "@global_model/table";

export interface PropsTableList {
  tables: Table[];
  loading: boolean;
  onEdit: (table: Table) => void;
  onDelete: (id: number) => void;
}
