import api from "./api";

// 🔹 Crear una nueva reserva
export const crearReserva = async (reservaData: {
  id_usuario: number;
  id_cancha: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado?: string;
}) => {
  const response = await api.post("/reservas", reservaData);
  return response.data;
};

// 🔹 Obtener todas las reservas de un usuario
export const obtenerReservasUsuario = async (usuarioId: number) => {
  const response = await api.get(`/reservas/usuario/${usuarioId}`);
  return response.data;
};
