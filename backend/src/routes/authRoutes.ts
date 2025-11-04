import express from "express";
import { register, login } from "../controllers/authController";

const authRouter = express.Router();

// Usamos los controladores (ya son handlers Express)
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
