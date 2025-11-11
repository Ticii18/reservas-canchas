import api from './api';

export const obtenerCanchas = async () => {
  const response = await api.get('/canchas');
  return response.data;
};
 
export const getCanchas = async () => {
  const res = await api.get('/canchas');
  console.log("Canchas obtenidas:", res.data);
  return res.data;
};

export const getCancha = async (id: any) => {
  const res = await api.get(`/canchas/${id}`);
  return res.data;
};

export const reservarCancha = async (id: any, reservaData: any) => {
  const res = await api.post(`/canchas/${id}/reservar`, reservaData);
  return res.data;
};

// Nueva función para actualizar cancha (estado, nombre, etc.)
export const actualizarCancha = async (id: any, datos: any) => {
  const res = await api.patch(`/canchas/${id}`, datos);
  return res.data;
};

export default {
  getCanchas,
  getCancha,
  reservarCancha,
  actualizarCancha,
};
