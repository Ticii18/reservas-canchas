import { Request, Response } from "express";
import { RoleService } from "../services/roleService";

const roleService = new RoleService();

export class roleController{
    static async getAllRoles(req: Request, res: Response) {
        const roles =  await roleService.getAllRoles();
        res.json(roles);
    }
}