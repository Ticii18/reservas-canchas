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
    <div>
      <h1 className="text-2xl font-bold mb-6">Canchas disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {canchas.map((c: any) => <CanchaCard key={c.id} cancha={c} />)}
      </div>
    </div>
  );
};

export default ListadoCanchas;
