import { rolRepository } from "../repositories/userRepository";
import { Rol } from "../entities/Rol";

export class RoleService{
    async getAllRoles(): Promise<Rol[]> {
        return await rolRepository.find();
    }
}