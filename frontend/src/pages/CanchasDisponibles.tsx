import React, { useEffect, useState } from "react";

// Interfaz de cancha
interface Cancha {
  id_cancha: number;
  estado: string; // "disponible" | "reservada" | "ocupada"
  nombre: string;
  precio_hora: number;
  tipo_pasto: string;
}

const LOCAL_STORAGE_KEY = "canchasReservadas";

const CanchasDisponibles: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar canchas del backend y del LocalStorage
  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/canchas");
        if (!response.ok) throw new Error("Error al traer las canchas");
        const data: Cancha[] = await response.json();

        // Revisar si hay reservas guardadas en LocalStorage
        const almacenadas = localStorage.getItem(LOCAL_STORAGE_KEY);
        let canchasConEstado: Cancha[] = data;

        if (almacenadas) {
          const reservasGuardadas: { [key: number]: string } = JSON.parse(almacenadas);
          canchasConEstado = data.map(c =>
            reservasGuardadas[c.id_cancha]
              ? { ...c, estado: reservasGuardadas[c.id_cancha] }
              : c
          );
        }

        setCanchas(canchasConEstado);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Ocurrió un error al cargar las canchas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCanchas();
  }, []);

  // Función para reservar cancha (solo frontend, persiste en LocalStorage)
  const handleReservar = (canchaId: number) => {
    const cancha = canchas.find(c => c.id_cancha === canchaId);
    if (!cancha || cancha.estado !== "disponible") return;

    const nuevasCanchas = canchas.map(c =>
      c.id_cancha === canchaId ? { ...c, estado: "reservada" } : c
    );

    setCanchas(nuevasCanchas);

    // Guardar en LocalStorage
    const almacenadas = localStorage.getItem(LOCAL_STORAGE_KEY);
    const reservasGuardadas: { [key: number]: string } = almacenadas
      ? JSON.parse(almacenadas)
      : {};
    reservasGuardadas[canchaId] = "reservada";
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservasGuardadas));

    // Mostrar mensaje temporal
    setMensaje(`✅ Cancha "${cancha.nombre}" reservada con éxito!`);
    setTimeout(() => setMensaje(""), 3000);
  };

  if (loading) return <p className="text-center mt-10">Cargando canchas...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Canchas</h1>

      {mensaje && (
        <div className="mb-4 text-center bg-green-200 text-green-800 font-semibold px-4 py-2 rounded">
          {mensaje}
        </div>
      )}

      {canchas.length === 0 ? (
        <p className="text-center text-gray-600">No hay canchas en el sistema.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canchas.map(c => (
            <div
              key={c.id_cancha}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-2">{c.nombre}</h2>
              <p className="mb-1">Precio por hora: ${c.precio_hora}</p>
              <p className="mb-1">Tipo de pasto: {c.tipo_pasto}</p>
              <p
                className={`font-semibold ${
                  c.estado === "disponible"
                    ? "text-green-600"
                    : c.estado === "reservada"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {c.estado.toUpperCase()}
              </p>

              {c.estado === "disponible" && (
                <button
                  onClick={() => handleReservar(c.id_cancha)}
                  className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Reservar Cancha
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CanchasDisponibles;
