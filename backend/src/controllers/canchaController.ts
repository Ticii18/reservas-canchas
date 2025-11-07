import { Request, Response } from "express";
import { CanchaService } from "../services/canchaService";

const canchaService = new CanchaService()
export class CanchaController {
    static async getAllCancha(req: Request, res: Response) {
        const reservas = await canchaService.getAllCanchas();
        res.json(reservas);
    }

    static async createCancha(req: Request, res: Response) {
        try {
              const newCancha = await canchaService.createCancha(req.body);
            res.status(201).json(newCancha);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCancha(req: Request, res: Response){
        try {
            const {id} = req.params
            const result = await canchaService.deleteCancha(id)
            if (!result.affected) return res.status(409).json("no se borró nada.")
            res.status(201).json("se borró una cancha.")
        } catch (error:any) {
            res.status(400).json({message: error.message || "desconocido"})
        }
    }
} 
