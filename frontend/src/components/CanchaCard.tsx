// CanchaCard.jsx
import { useNavigate } from "react-router-dom";

export interface Cancha {
  id_cancha: number;
  estado: string;
  nombre: string;
  precio_hora: number;
  tipo_pasto: string;
}

function CanchaCard({ cancha }: { cancha: Cancha }) {
  const navigate = useNavigate();

  const handleReserva = () => {
    navigate(`/reservar/${cancha.id_cancha}`);
  };

  return (
    // Versión compacta: p-4, text-xl, text-3xl
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-full transform hover:scale-[1.03] transition-all duration-300 border-b-2 border-green-500 hover:border-green-700">
      <div>
        {/* Nombre de la cancha (text-xl) */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-green-800 tracking-tight">{cancha.nombre}</h2>
          <span className="text-lg text-green-500">⚽</span> 
        </div>

        {/* Tipo de pasto como un "badge" más pequeño (py-0.5, text-xs) */}
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-3 ${
            cancha.tipo_pasto?.toLowerCase().includes('sintético') 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
        }`}>
            Pasto: {cancha.tipo_pasto}
        </span>
      </div>

      <div>
          {/* Precio más pequeño (text-3xl) */}
          <p className="text-3xl text-green-600 font-extrabold my-3 text-center">
              ${cancha.precio_hora}
              <span className="text-sm font-normal text-gray-500 ml-1">/hora</span>
          </p>

          {/* Botón de reservar (py-2, text-base) */}
          <button
            onClick={handleReserva}
            className="w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-base rounded-lg shadow-md hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            ¡Reservar Ahora!
          </button>
      </div>
    </div>
  );
}

export default CanchaCard;