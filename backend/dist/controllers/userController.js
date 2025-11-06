"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const userService = new userService_1.UserService();
class UserController {
    static async getAllUsers(req, res) {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    static async getUserById(req, res) {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    static async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.UserController = UserController;
