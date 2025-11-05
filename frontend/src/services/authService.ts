import { api } from "./api";

export const authService = {

  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  },

  register: async (data: any) => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  
};

