// ListadoCanchas.jsx
import React, { useEffect, useState } from 'react';
import canchaService from '../services/canchaService';
import CanchaCard from '../components/CanchaCard';

type Cancha = any;

const ListadoCanchas: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);

  useEffect(() => {
    canchaService.getCanchas().then(setCanchas).catch(() => alert('Error al cargar canchas'));
  }, []);

  return (
    <div className="p-4 w-full"> 
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Canchas disponibles</h1>
      
      {/* 🌟 CAMBIO CLAVE: Usamos Flexbox con wrap en lugar de Grid 🌟 */}
      <div className="flex flex-wrap justify-center gap-4 mx-auto max-w-7xl">
        {canchas.map((c: any) => <CanchaCard key={c.id} cancha={c} />)}
      </div>
    </div>
  );
};

export default ListadoCanchas;