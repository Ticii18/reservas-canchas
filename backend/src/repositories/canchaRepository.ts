import { AppDataSource } from "../config/db";
import { Cancha } from "../entities/Cancha";

export const canchaRepository = AppDataSource.getRepository(Cancha);
