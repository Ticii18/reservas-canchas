import { AppDataSource } from "../config/db";
import { User } from "../entities/user";

export const userRepository = AppDataSource.getRepository(User);