export const ENDPOINTS = {
  TABLES: "/tables",
  TABLE_BY_ID: (id: number) => `/tables/${id}`,
  RESERVATIONS: "/reservations",
  RESERVATION_BY_ID: (id: number) => `/reservations/${id}`,
  DAILY_RESERVATIONS: (date: string) => `/reservations/daily/${date}`,
  CUSTOMERS: "/customers",
  CUSTOMER_BY_ID: (id: number) => `/customers/${id}`,
};
