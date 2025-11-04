function CanchaCard({ cancha }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img
        src={cancha.imagen || '/default.jpg'}
        alt={cancha.nombre}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-xl font-semibold">{cancha.nombre}</h2>
      <p className="text-gray-600">{cancha.ubicacion}</p>
      <p className="text-green-600 font-bold mt-2">${cancha.precio}/hora</p>
      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Reservar
      </button>
    </div>
  );
}

export default CanchaCard;
