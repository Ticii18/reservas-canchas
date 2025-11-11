import api from './api';

export const obtenerCanchas = async () => {
  const response = await api.get('/canchas');
  return response.data;
};
 
const getCanchas = async () => {
  const res = await api.get('/canchas');
  console.log("Canchas obtenidas:", res.data);
  return res.data;
};

const getCancha = async (id: any) => {
  const res = await api.get(`/canchas/${id}`);
  return res.data;
};

const reservarCancha = async (id: any, reservaData: any) => {
  const res = await api.post(`/canchas/${id}/reservar`, reservaData);
  return res.data;
};

export default {
  getCanchas,
  getCancha,
  reservarCancha,
};
