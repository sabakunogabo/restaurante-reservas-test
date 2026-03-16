import { Layout } from "@components/layout/Layout";
import { Customers } from "@pages/customers";
import { DailyReservations } from "@pages/daily-reservations";
import { Home } from "@pages/Home";
import { Tables } from "@pages/tables";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<DailyReservations />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/table" element={<Tables />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
