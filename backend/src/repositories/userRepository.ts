import { AppDataSource } from "../config/db";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);