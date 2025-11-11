import React, { useState, useContext } from "react";
import { crearReserva } from "../services/reservaService";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

interface ReservaFormProps {
  onReservaSuccess?: () => void;
}

interface FormData {
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

const ReservaForm: React.FC<ReservaFormProps> = ({ onReservaSuccess }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<FormData>({
    fecha: "",
    horaInicio: "",
    horaFin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validarFormulario = (): boolean => {
    if (!user || !user.id_usuario) {
      setError(" ¡Necesitas iniciar sesión para reservar tu cancha!");
      return false;
    }

    if (!formData.fecha) {
      setError(" Por favor selecciona una fecha");
      return false;
    }

    if (!formData.horaInicio) {
      setError(" Por favor indica la hora de inicio");
      return false;
    }

    if (!formData.horaFin) {
      setError(" Por favor indica la hora de finalización");
      return false;
    }

    if (formData.horaInicio >= formData.horaFin) {
      setError(" La hora de fin debe ser posterior a la hora de inicio");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const reservaData = {
      id_usuario: user!.id_usuario,
      fecha: formData.fecha,
      hora_inicio: formData.horaInicio,
      hora_fin: formData.horaFin,
      estado: "confirmada",
      id_cancha: id,
    };

    try {
      setLoading(true);
      setError("");
      
      await crearReserva(reservaData);
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({ fecha: "", horaInicio: "", horaFin: "" });
        setShowSuccess(false);
        if (onReservaSuccess) onReservaSuccess();
      }, 3000);
      
    } catch (err: any) {
      console.error("Error al crear reserva:", err);
      setError(err.message || " Ocurrió un error al crear la reserva. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl border-4 relative overflow-hidden">
      {/* Patrón de fondo de césped */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, #ffffffff 35px, #ffffffff 70px)',
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header con pelota arriba del título */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-black text-green-700 uppercase tracking-tight">
            Reservá tu Cancha
          </h2>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="bg-green-200 text-green-800 px-4 py-2 rounded-xl font-semibold mb-4 text-center">
            ¡Reserva confirmada!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Fecha */}
          <div className="hover:border-green-400 transition-all">
            <label htmlFor="fecha" className="flex items-center gap-2 text-lg font-bold text-black mb-3">
              Fecha del partido
            </label>
            <input
              id="fecha"
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border-2 border-green-300 rounded-lg p-4 text-lg font-semibold focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
              required
            />
          </div>

          {/* Campos de Hora */}
          <div className="hover:border-green-400 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-black">Horario del partido</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="horaInicio" className="block text-sm font-bold text-black mb-2">
                 Inicio
                </label>
                <input
                  id="horaInicio"
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  className="w-full border-2 border-green-300 rounded-lg p-3 text-lg font-semibold focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="horaFin" className="block text-sm font-bold text-black mb-2">
                  Fin
                </label>
                <input
                  id="horaFin"
                  type="time"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleChange}
                  className="w-full border-2 border-green-300 rounded-lg p-3 text-lg font-semibold focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="bg-red-100 border-3 border-red-500 text-red-800 px-5 py-4 rounded-xl text-base font-bold animate-shake shadow-lg">
              {error}
            </div>
          )}

          {/* Botón de Reserva más chico y menos negro */}
          <button
            type="submit"
            disabled={loading}
            className="text-black w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 uppercase tracking-wide border-2 border-green-600"
          >
            {loading ? "Reservando..." : "Reservar Cancha"}
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

export default ReservaForm;
