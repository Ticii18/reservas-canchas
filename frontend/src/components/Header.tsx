import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Reservas</Link>
        <nav className="space-x-4">
          <Link to="/canchas" className="hover:underline">Canchas</Link>
          {user ? (
            <>
              <Link to="/perfil" className="hover:underline">Mi Perfil</Link>
              <button onClick={logout} className="hover:underline">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Registro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
