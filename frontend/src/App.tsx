import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthContext } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import ListadoCanchas from './pages/ListadoCanchas';
import MiPerfil from './pages/MiPerfil';
import MisReservas from './pages/MisReservas';
import AdminPanel from './pages/AdminPanel';
import ReservaForm from "./components/ReservaForm";


function App() {
  const { user } = useContext(AuthContext);

  // helper to detect admin role (supports different user shapes)
  const isAdmin = !!(
    user && (
      user.role === 'admin' ||
      user.rol === 'admin' ||
      (Array.isArray((user as any).roles) && (user as any).roles.some((r: any) => r.nombre === 'admin' || r.name === 'admin'))
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show header/footer only when there's a logged user (login/register pages will not display nav/footer) */}
      {user && <Header />}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          {/* Redirect root: if logged in, go to role-appropriate page; otherwise go to /login */}
          <Route
            path="/"
            element={
              user ? (
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/canchas" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/canchas" element={<ListadoCanchas />} />
          <Route path="/perfil" element={<MiPerfil />} />
          <Route path="/reservas" element={<MisReservas />} />
          <Route path="/admin" element={<AdminPanel />} />
              <Route path="/reservar/:id" element={<ReservaForm />} />

        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
}

export default App;
