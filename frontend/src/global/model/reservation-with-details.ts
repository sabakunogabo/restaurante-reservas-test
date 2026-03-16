import { Customer } from "./customer";
import { Reservation } from "./reservation";
import { Table } from "./table";

export interface ReservationWithDetails extends Reservation {
  customer: Customer;
  table: Table;
}
