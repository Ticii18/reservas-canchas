import express from "express";
import { roleController } from "../controllers/roleController";

const roleRouter = express.Router();

roleRouter.get("/", roleController.getAllRoles);


export default roleRouter;