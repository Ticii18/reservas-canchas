import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/User";


export class UserService {

    async getAllUsers(): Promise<User[]> {
        return await userRepository.find();
    }
    async getUserById(id_usuario: number): Promise<User | null> {
        return userRepository.findOneBy({ id_usuario });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return userRepository.findOneBy({ email });
    }
    async createUser(data: Partial<User>): Promise<User> {
        if (!data.nombre || !data.email) {
            throw new Error("Nombr y email son necesarios");
        }
        const user = userRepository.create(data);
        return userRepository.save(user);
    }
}