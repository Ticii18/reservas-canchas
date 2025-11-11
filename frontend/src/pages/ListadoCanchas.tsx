// ListadoCanchas.jsx
import React, { useEffect, useState } from 'react';
import canchaService from '../services/canchaService';
import CanchaCard, { Cancha } from '../components/CanchaCard'; // Importamos Cancha

const ListadoCanchas: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);

  useEffect(() => {
    // Asegúrate de que getCanchas() devuelve un array de objetos Cancha
    canchaService.getCanchas().then(setCanchas).catch(() => alert('Error al cargar canchas'));
  }, []);

  return (
    <div className="p-4 w-full"> 
      <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">Canchas disponibles para tu reserva</h1>
      
      {/* 🎯 SOLUCIÓN CLAVE: Contenedor con ancho máximo y Flexbox que permite el salto de línea */}
      <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-screen-2xl">
        {canchas.map((c: Cancha) => (
            // Nota: Aquí se usa el ID correcto de la cancha si ya lo tienes definido.
            <CanchaCard key={c.id_cancha} cancha={c} />
        ))}
      </div>
    </div>
  );
};

export default ListadoCanchas;