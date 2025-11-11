import React, { useState } from "react";

// Interfaz de Cancha
export interface Cancha {
  id_cancha: number;
  estado: string;
  nombre: string;
  precio_hora: number;
  tipo_pasto: string;
}

// Props opcionales para manejar la creación de la cancha
interface CrearCanchaFormProps {
  onCanchaCreada?: (cancha: Omit<Cancha, "id_cancha">) => void;
}

const CrearCanchaForm: React.FC<CrearCanchaFormProps> = ({ onCanchaCreada }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio_hora: "",
    tipo_pasto: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validarFormulario = (): boolean => {
    if (!formData.nombre.trim()) {
      setError("⚽ Por favor ingresa el nombre de la cancha");
      return false;
    }

    if (!formData.tipo_pasto) {
      setError("🌱 Por favor selecciona el tipo de pasto");
      return false;
    }

    if (!formData.precio_hora || Number(formData.precio_hora) <= 0) {
      setError("💰 El precio por hora debe ser mayor a 0");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      setLoading(true);
      setError("");

      // Aquí llamás a tu API para crear la cancha
      const response = await fetch("http://localhost:3000/api/canchas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          tipo_pasto: formData.tipo_pasto,
          precio_hora: Number(formData.precio_hora)
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cancha.");
      }

      const nuevaCancha = await response.json();

      setSuccess(true);
      setFormData({ nombre: "", precio_hora: "", tipo_pasto: "" });

      if (onCanchaCreada) onCanchaCreada(nuevaCancha);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "❌ Ocurrió un error al crear la cancha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl border-4 border-green-600 relative overflow-hidden">
      {/* Patrón de fondo de césped */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, #ffffffff 35px, #ffffffff 70px)',
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-black text-green-700 uppercase tracking-tight">
            Panel de Administrador
          </h2>
          <p className="text-sm text-green-600 font-semibold mt-2">Crear Nueva Cancha</p>
        </div>

        {/* Mensaje de éxito */}
        {success && (
          <div className="bg-green-200 text-green-800 px-4 py-3 rounded-xl font-semibold mb-4 text-center shadow-lg animate-bounce">
            ✅ ¡Cancha creada con éxito!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Nombre */}
          <div className="hover:border-green-400 transition-all">
            <label htmlFor="nombre" className="flex items-center gap-2 text-lg font-bold text-black mb-3">
               Nombre de la Cancha
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Cancha Principal"
              className="w-full border-2 border-green-300 rounded-lg p-4 text-lg font-semibold focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
              required
            />
          </div>

          {/* Campo Tipo de Pasto */}
          <div className="hover:border-green-400 transition-all">
            <label htmlFor="tipo_pasto" className="flex items-center gap-2 text-lg font-bold text-black mb-3">
               Tipo de Pasto
            </label>
            <select
              id="tipo_pasto"
              name="tipo_pasto"
              value={formData.tipo_pasto}
              onChange={handleChange}
              className="w-full border-2 border-green-300 rounded-lg p-4 text-lg font-semibold focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all bg-white"
              required
            >
              <option value="">Selecciona el tipo de pasto</option>
              <option value="sintetico">Sintético</option>
              <option value="natural">Natural</option>
            </select>
          </div>

          {/* Campo Precio */}
          <div className="hover:border-green-400 transition-all">
            <label htmlFor="precio_hora" className="flex items-center gap-2 text-lg font-bold text-black mb-3">
              Precio por Hora
            </label>
            <input
              id="precio_hora"
              type="number"
              name="precio_hora"
              value={formData.precio_hora}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="0.01"
              className="w-full border-2 border-green-300 rounded-lg p-4 text-lg font-semibold focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
              required
            />
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="bg-red-100 border-3 border-red-500 text-red-800 px-5 py-4 rounded-xl text-base font-bold animate-shake shadow-lg">
              {error}
            </div>
          )}

          {/* Botón de Crear */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 uppercase tracking-wide border-2 border-green-600"
          >
            {loading ? " Creando..." : " Crear Cancha"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CrearCanchaForm;