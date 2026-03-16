import { Customer } from "@global_model/customer";

export interface PropsCustomerList {
  customers: Customer[];
  loading: boolean;
}
