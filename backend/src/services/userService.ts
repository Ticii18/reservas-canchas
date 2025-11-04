import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/user";


export class UserService {

    async getAllUsers(): Promise<User[]> {
        return await userRepository.find();
    }
    async getUserById(id: number): Promise<User | null> {
        return userRepository.findOneBy({ id });
    }
    async createUser(data: Partial<User>): Promise<User> {
        if (!data.name || !data.email) {
            throw new Error("Name and email are required");
        }
        const user = userRepository.create(data);
        return userRepository.save(user);
    }
}