import React, { useEffect, useState, useContext } from "react";
import { obtenerReservasUsuario } from "../services/reservaService";
import { AuthContext } from "../context/AuthContext";
import ReservaForm from "../components/ReservaForm";

const MisReservas = () => {
  const { user } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      if (user) {
        const data = await obtenerReservasUsuario(user.id);
        setReservas(data);
      }
    };
    fetchReservas();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-6">Iniciá sesión para ver tus reservas.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#003667] mb-4 text-center">Mis Reservas</h2>
      <ReservaForm />

      <div className="mt-6">
        {reservas.length === 0 ? (
          <p className="text-center">No tenés reservas aún.</p>
        ) : (
          <ul className="space-y-4">
            {reservas.map((reserva: any) => (
              <li
                key={reserva.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <p><strong>Cancha:</strong> {reserva.cancha?.nombre || reserva.canchaId}</p>
                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                <p><strong>Horario:</strong> {reserva.horaInicio} - {reserva.horaFin}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MisReservas;
