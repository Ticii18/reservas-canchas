import express from "express";
import { UserController } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);

export default userRouter;