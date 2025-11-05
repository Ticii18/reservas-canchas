import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { Rol } from "../entities/Rol";

export const userRepository = AppDataSource.getRepository(User);

export const rolRepository = AppDataSource.getRepository(Rol);