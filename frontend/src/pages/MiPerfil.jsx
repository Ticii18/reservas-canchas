import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function MiPerfil() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Inicia sesión para ver tu perfil.</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default MiPerfil;
