import { useNavigate } from "react-router-dom";

// Interfaz extendida con urlImg
export interface Cancha {
  id_cancha: number;
  estado: string;
  nombre: string;
  precio_hora: number;
  tipo_pasto: string;
  urlImg?: string; // ← nueva propiedad opcional para mostrar imagen
}

function CanchaCard({ cancha }: { cancha: Cancha }) {
  const navigate = useNavigate();

  const handleReserva = () => {
    navigate(`/reservar/${cancha.id_cancha}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden m-8 flex flex-col justify-between w-96 transform hover:scale-[1.03] transition-all duration-300 border-b-4 border-green-500 hover:border-green-700">
      
      {/* Imagen de la cancha */}
      <div className="relative h-56 w-full overflow-hidden">
        {cancha.urlImg ? (
          <img
            src={cancha.urlImg}
            alt={cancha.nombre}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="bg-green-100 flex items-center justify-center h-full text-gray-500 font-semibold text-lg">
            Sin imagen disponible
          </div>
        )}
      </div>

      {/* Contenido de texto */}
      <div className="flex flex-col justify-between p-8 flex-grow">
        {/* Nombre de la cancha */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-black text-green-800 tracking-tight">
            {cancha.nombre}
          </h2>
        </div>

        {/* Tipo de pasto */}
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
            cancha.tipo_pasto.toLowerCase().includes("sintético")
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          Pasto: {cancha.tipo_pasto}
        </span>

        {/* Precio */}
        <p className="text-4xl text-green-600 font-extrabold my-4 text-center">
          ${cancha.precio_hora}
          <span className="text-base font-normal text-gray-500 ml-1">
            /hora
          </span>
        </p>

        {/* Botón */}
        <button
          onClick={handleReserva}
          className="w-full py-3 mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-600 hover:shadow-xl transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          ¡Reservar Ahora!
        </button>
      </div>
    </div>
  );
}

export default CanchaCard;
