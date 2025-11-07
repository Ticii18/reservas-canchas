import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = !!(
    user && (
      user.role === 'admin' ||
      user.rol === 'admin' ||
      (Array.isArray((user as any).roles) && (user as any).roles.some((r: any) => r.nombre === 'admin' || r.name === 'admin'))
    )
  );

  return (
    <>
      <style>{`
        .header {
          background: linear-gradient(135deg, #1e7e34 0%, #28a745 100%);
          color: white;
          padding: 25px 0;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-logo {
          font-size: 26px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: opacity 0.3s ease;
        }

        .header-logo:hover {
          opacity: 0.9;
        }

        .header-logo-icon {
          width: 28px;
          height: 28px;
        }

        .header-nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .header-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s ease;
          padding: 8px 14px;
          border-radius: 6px;
        }

        .header-link:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .header-button {
          background: none;
          border: none;
          color: white;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 8px 14px;
          border-radius: 6px;
          font-family: inherit;
        }

        .header-button:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 20px;
          }

          .header-nav {
            gap: 12px;
          }

          .header-link,
          .header-button {
            font-size: 14px;
            padding: 6px 10px;
          }
        }
      `}</style>

      <header className="header">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <svg className="header-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2L9 8l3 2 3-2-3-6zM4 8l2 8 6 4 6-4 2-8H4z" fill="currentColor" stroke="none"/>
            </svg>
            Reservas
          </Link>
          <nav className="header-nav">
            <Link to="/canchas" className="header-link">Canchas</Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="header-link">Panel Admin</Link>
                )}
                <Link to="/perfil" className="header-link">Mi Perfil</Link>
                <button onClick={handleLogout} className="header-button">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-link">Login</Link>
                <Link to="/register" className="header-link">Registro</Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;