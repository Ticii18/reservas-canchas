import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

const MiPerfil: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Inicia sesión para ver tu perfil.</p>;

  // support several possible field names returned by the backend
  const nombre = (user as any).nombre || (user as any).name || (user as any).firstName || '';
  const apellido = (user as any).apellido || (user as any).lastName || (user as any).surname || '';
  const telefono = (user as any).telefono || (user as any).phone || (user as any).telefono_celular || '';
  const email = (user as any).email || (user as any).gmail || '';

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Apellido:</strong> {apellido}</p>
      <p><strong>Teléfono:</strong> {telefono}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
};

export default MiPerfil;
