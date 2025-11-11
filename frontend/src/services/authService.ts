import api from "./api";

export const authService = {
  login: async (credentials: any) => {
    const res = await api.post("/auth/login", credentials);
    const token = res.data?.token;
    if (!token) throw new Error("Token no recibido desde el servidor");

    localStorage.setItem("token", token);

    const parseJwt = (t: string) => {
      try {
        const payload = t.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decoded);
      } catch (e) {
        return {};
      }
    };

    const payload = parseJwt(token) || {};
    const userId = payload.id || payload.userId || payload.id_usuario;

    let userData: any = null;

    if (userId) {
      const userRes = await api.get(`/users/${userId}`);
      userData = userRes.data;

      // Aseguramos que siempre tenga role
      if (!userData.role) {
        if (userData.roles && Array.isArray(userData.roles)) {
          userData.role = userData.roles.some((r: any) => r.name === "Admin") ? "Admin" : "Usuario";
        } else {
          userData.role = "Usuario";
        }
      }
    } else {
      userData = { email: payload.email, role: "Usuario" };
    }

    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  },

  register: async (data: any) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
