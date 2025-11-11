import React, { useState, useContext } from "react";
import { crearReserva } from "../services/reservaService";
import { AuthContext } from "../context/AuthContext";

interface ReservaFormProps {
  cancha: {
    id_cancha: number;
    nombre: string;
    estado: "disponible" | "reservada" | "ocupada";
  };
  onReservaSuccess?: () => void;
}

interface FormData {
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

const ReservaForm: React.FC<ReservaFormProps> = ({ cancha, onReservaSuccess }) => {
  const { user } = useContext(AuthContext);

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
      setError("Necesitas iniciar sesión para reservar la cancha");
      return false;
    }

    if (cancha.estado !== "disponible") {
      setError("Esta cancha no está disponible para reservar");
      return false;
    }

    if (!formData.fecha || !formData.horaInicio || !formData.horaFin) {
      setError("Completa todos los campos");
      return false;
    }

    if (formData.horaInicio >= formData.horaFin) {
      setError("La hora de fin debe ser posterior a la hora de inicio");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const reservaData = {
      id_usuario: user!.id_usuario,
      id_cancha: cancha.id_cancha,
      fecha: formData.fecha,
      hora_inicio: formData.horaInicio,
      hora_fin: formData.horaFin,
      estado: "confirmada",
    };

    try {
      setLoading(true);
      await crearReserva(reservaData);
      setShowSuccess(true);

      setTimeout(() => {
        setFormData({ fecha: "", horaInicio: "", horaFin: "" });
        setShowSuccess(false);
        if (onReservaSuccess) onReservaSuccess();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{cancha.nombre}</h2>

      {showSuccess && <p className="text-green-600 font-semibold">Reserva confirmada!</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="horaInicio"
          value={formData.horaInicio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="horaFin"
          value={formData.horaFin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading || cancha.estado !== "disponible"}
          className="w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Reservando..." : "Reservar"}
        </button>
      </form>
    </div>
  );
};

export default ReservaForm;
