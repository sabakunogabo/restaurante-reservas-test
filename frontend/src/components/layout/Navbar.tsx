import { Link } from "react-router-dom";
import { Home, Calendar, Users, Table } from "lucide-preact";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" title="Inicio">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-800">Restaurante</span>
          </Link>

          {/* Iconos de navegación */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Reservar"
              title="Reservar"
            >
              <Home size={24} />
            </Link>
            <Link
              to="/daily"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Reservas del día"
              title="Reservas del día"
            >
              <Calendar size={24} />
            </Link>
            <Link
              to="/table"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Mesas"
              title="Mesas"
            >
              <Table size={24} />
            </Link>
            <Link
              to="/customers"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Clientes"
              title="Clientes"
            >
              <Users size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
