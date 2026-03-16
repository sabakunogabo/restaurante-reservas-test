import api from "@api/client";
import { ENDPOINTS } from "@api/endpoints";
import { ReservationState } from "@global_interfaces/reservation-state";
import { create } from "zustand";

const useReservationStore = create<ReservationState>((set, get) => ({
  reservations: [],
  tables: [],
  customers: [],
  loading: false,
  error: null,

  fetchTables: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(ENDPOINTS.TABLES);
      set({ tables: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createReservation: async (reservationData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(ENDPOINTS.RESERVATIONS, reservationData);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  fetchDailyReservations: async (date) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(ENDPOINTS.DAILY_RESERVATIONS(date));
      set({ reservations: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  cancelReservation: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(ENDPOINTS.RESERVATION_BY_ID(id));
      set({ loading: false });
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  fetchReservationById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(ENDPOINTS.RESERVATION_BY_ID(id));
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createTable: async (tableData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(ENDPOINTS.TABLES, tableData);

      await get().fetchTables();
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  updateTable: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(ENDPOINTS.TABLE_BY_ID(id), data);
      await get().fetchTables();
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  deleteTable: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await api.delete(ENDPOINTS.TABLE_BY_ID(id));
      set({ loading: false });
    } catch (error: any) {
      const message = error.response?.data?.detail || error.message;
      set({ error: message, loading: false });

      throw new Error(message);
    }
  },

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(ENDPOINTS.CUSTOMERS);
      set({ customers: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createCustomer: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(ENDPOINTS.CUSTOMERS, data);
      await get().fetchCustomers();
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  updateCustomer: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(ENDPOINTS.CUSTOMER_BY_ID(id), data);
      await get().fetchCustomers();
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(ENDPOINTS.CUSTOMER_BY_ID(id));
      await get().fetchCustomers();
      set({ loading: false });
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },

  updateReservation: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(ENDPOINTS.RESERVATION_BY_ID(id), data);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const detail = error.response?.data?.detail || error.message;
      set({ error: detail, loading: false });
      throw error;
    }
  },
}));

export default useReservationStore;
