import { Navbar } from "./Navbar";
import { LayoutProps } from "@global_interfaces/layout-props";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
