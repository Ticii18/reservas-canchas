import { AppDataSource } from "../config/db";
import { Reserva } from "../entities/Reserva";

export const reservaRepository = AppDataSource.getRepository(Reserva);