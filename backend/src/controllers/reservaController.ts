import { Request, Response } from "express";
import { ReservaService } from "../services/reservaService";

const reservaService = new ReservaService();
export class ReservaController {
  static async getAllReservas(req: Request, res: Response) {
    const reservas = await reservaService.getAllReservas();
    res.json(reservas);
  }

  static async createReserva(req: Request, res: Response) {
    try {
      const newReserva = await reservaService.createReserva(req.body);
      res.status(201).json(newReserva);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteReserva(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("No hay id.")
      const result = await reservaService.deleteReserva(parseInt(id));
      if (!result.affected) return res.status(409).json("no se borró nada.");
      res.status(201).json("se borró una reserva.");
    } catch (error: any) {
      res.status(400).json({ message: error.message || "desconocido" });
    }
  }
}
