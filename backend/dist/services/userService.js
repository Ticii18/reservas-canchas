"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    async getAllUsers() {
        return await userRepository_1.userRepository.find();
    }
    async getUserById(id_usuario) {
        return userRepository_1.userRepository.findOneBy({ id_usuario });
    }
    async getUserByEmail(email) {
        return userRepository_1.userRepository.findOneBy({ email });
    }
    async createUser(data) {
        if (!data.nombre || !data.email) {
            throw new Error("Nombr y email son necesarios");
        }
        const user = userRepository_1.userRepository.create(data);
        return userRepository_1.userRepository.save(user);
    }
}
exports.UserService = UserService;
