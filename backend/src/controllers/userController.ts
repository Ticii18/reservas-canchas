import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        const users = await userService.getAllUsers();
        res.json(users);
    }

    static async getUserById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
