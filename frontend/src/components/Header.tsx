import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import pelota from "../assets/pelota.png";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = !(
    user &&
    (user.role === "Admin" ||
      user.rol === "Admin" ||
      (Array.isArray(user.roles) &&
        user.roles.some(
          (r) => r.nombre === "Admin" || r.name === "Admin"
        )))
  );

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold text-green-700 hover:text-green-800 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-md flex items-center justify-center relative overflow-hidden animate-bounce">
            <img
              src={pelota}
              alt="Pelota de fútbol"
              className="w-full h-full object-contain rounded-full transition-transform duration-500 hover:rotate-[360deg]"
            />
          </div>
          Reservas
        </Link>

        {/* NAVEGACIÓN */}
        <nav className="flex items-center gap-5">
          <Link
            to="/canchas"
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Todas las Canchas
          </Link>

          <Link
            to="/canchas-disponibles"
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Canchas Disponibles
          </Link>

          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  Panel Admin
                </Link>
              )}
              <Link
                to="/perfil"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
