import  api  from "./api";

export const authService = {
  // login now stores token, fetches full user profile from backend and stores it
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    const token = res.data?.token;
    if (!token) throw new Error('Token no recibido desde el servidor');

    // save token for future authenticated requests if needed
    localStorage.setItem('token', token);

    // decode token payload (simple base64 decode) to obtain user id
    const parseJwt = (t: string) => {
      try {
        const payload = t.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decodeURIComponent(escape(decoded)));
      } catch (e) {
        return null;
      }
    };

    const payload = parseJwt(token) || {};
    const userId = payload.id || payload.userId || payload.id_usuario;

    let userData: any = null;
    if (userId) {
      const userRes = await api.get(`/users/${userId}`);
      userData = userRes.data;
    } else {
      // fallback: store minimal info from token
      userData = { email: payload.email };
    }

    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
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