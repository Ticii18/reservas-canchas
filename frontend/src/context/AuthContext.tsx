import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

type User = { id?: number; nombre?: string; email?: string; [key: string]: any } | null;

type AuthContextType = {
  user: User;
  login: (credentials: any) => Promise<any>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (credentials: any) => {
    const loggedUser = await authService.login(credentials);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
