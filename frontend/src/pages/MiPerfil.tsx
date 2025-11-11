import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

const MiPerfil: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border-2 border-green-500 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center border-4 border-green-500">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">ACCESO RESTRINGIDO</h2>
          <p className="text-gray-400 font-medium">Inicia sesión para ver tu perfil</p>
        </div>
      </div>
    );
  }

  // support several possible field names returned by the backend
  const nombre = (user as any).nombre || (user as any).name || (user as any).firstName || '';
  const apellido = (user as any).apellido || (user as any).lastName || (user as any).surname || '';
  const telefono = (user as any).telefono || (user as any).phone || (user as any).telefono_celular || '';
  const email = (user as any).email || (user as any).gmail || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl border-2 border-green-500 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 border-b-4 border-green-500">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center shadow-xl border-4 border-green-500">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                  MI PERFIL
                </h2>
                <p className="text-green-200 font-bold mt-1 uppercase text-sm tracking-wide">Información de la cuenta</p>
              </div>
            </div>
          </div>

          {/* Contenido del perfil */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Campo Nombre */}
              <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-green-500 hover:bg-gray-850 transition-all">
                <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">Nombre</p>
                <p className="text-2xl font-bold text-white">{nombre || 'No especificado'}</p>
              </div>

              {/* Campo Apellido */}
              <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-green-500 hover:bg-gray-850 transition-all">
                <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">Apellido</p>
                <p className="text-2xl font-bold text-white">{apellido || 'No especificado'}</p>
              </div>

              {/* Campo Teléfono */}
              <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-green-500 hover:bg-gray-850 transition-all">
                <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">Teléfono</p>
                <p className="text-2xl font-bold text-white">{telefono || 'No especificado'}</p>
              </div>

              {/* Campo Email */}
              <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-green-500 hover:bg-gray-850 transition-all">
                <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">Email</p>
                <p className="text-xl font-bold text-white break-all">{email || 'No especificado'}</p>
              </div>
            </div>

            {/* Botón de editar */}
            <div className="mt-8">
              <button className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 uppercase tracking-wide border-2 border-green-500">
                EDITAR PERFIL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;