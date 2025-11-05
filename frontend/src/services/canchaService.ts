import { api } from "./api";

const getCanchas = async () => {
  const res = await api.get('/canchas');
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
