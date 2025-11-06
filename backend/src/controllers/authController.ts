import { Request, Response } from 'express';
import * as authService from '../services/authService'

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const token = await authService.login(email, password);
    
    res.json({ token });

  } catch (error: any) {
    // Error genérico para no dar pistas a atacantes
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};