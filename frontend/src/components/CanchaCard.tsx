import { useNavigate } from "react-router-dom";

// Definición de la interfaz (mantengo la tuya original)
export interface Cancha {
  id_cancha: number;
  estado: string;
  nombre: string;
  precio_hora: number;
  tipo_pasto: string;
}

function CanchaCard({ cancha }: { cancha: Cancha }) {
  const navigate = useNavigate();
  // console.log("Renderizando CanchaCard para:", cancha);

  const handleReserva = () => {
    navigate(`/reservar/${cancha.id_cancha}`);
  };

  return (
    // Estilos mejorados: Sombra más profunda, hover scale, borde inferior verde
    <div className="bg-white rounded-3xl shadow-xl p-20 m-10 flex flex-col justify-between h-full transform hover:scale-[1.03] transition-all duration-300 border-b-4 border-green-500 hover:border-green-700">
      <div>
        {/* Nombre de la cancha con ícono */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-black text-green-800 tracking-tight">{cancha.nombre}</h2>
        </div>

        {/* Tipo de pasto como un "badge" */}
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
            cancha.tipo_pasto.toLowerCase().includes('sintético') 
                ? 'bg-yellow-100 text-yellow-800' // Estilo para sintético
                : 'bg-green-100 text-green-800'  // Estilo para natural
        }`}>
            Pasto: {cancha.tipo_pasto}
        </span>
      </div>

      <div>
          {/* Precio más grande y centrado */}
          <p className="text-4xl text-green-600 font-extrabold my-4 text-center">
              ${cancha.precio_hora}
              <span className="text-base font-normal text-gray-500 ml-1">/hora</span>
          </p>

          {/* Botón de reservar con efecto flotante */}
          <button
            onClick={handleReserva}
            className=" text-black w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-600 hover:shadow-xl transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            ¡Reservar Ahora!
          </button>
      </div>
    </div>
  );
}

export default CanchaCard;