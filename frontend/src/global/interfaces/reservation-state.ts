import { Customer } from "@global_model/customer";
import { CustomerCreate } from "@global_model/customer-create";
import { CustomerUpdate } from "@global_model/customer-update";
import { ReservationUpdate } from "@global_model/reservation-update";
import { ReservationWithDetails } from "@global_model/reservation-with-details";
import { Table } from "@global_model/table";
import { TableCreate } from "@global_model/table-create";
import { TableUpdate } from "@global_model/table-update";

export interface ReservationState {
  reservations: ReservationWithDetails[];
  tables: Table[];
  customers: Customer[];
  loading: boolean;
  error: string | null;

  fetchTables: () => Promise<void>;
  createReservation: (data: any) => Promise<any>;
  fetchDailyReservations: (date: string) => Promise<void>;
  cancelReservation: (id: number) => Promise<void>;
  fetchReservationById: (id: number) => Promise<ReservationWithDetails>;

  createTable: (data: TableCreate) => Promise<Table>;
  updateTable: (id: number, data: TableUpdate) => Promise<Table>;
  deleteTable: (id: number) => Promise<void>;

  fetchCustomers: () => Promise<void>;
  createCustomer: (data: CustomerCreate) => Promise<Customer>;
  updateCustomer: (id: number, data: CustomerUpdate) => Promise<Customer>;
  deleteCustomer: (id: number) => Promise<void>;

  updateReservation: (
    id: number,
    data: ReservationUpdate,
  ) => Promise<ReservationWithDetails>;
}
